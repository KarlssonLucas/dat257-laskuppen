const { request, response } = require("express");
const fetch = require("node-fetch");

if (!process.env.DATABASE_URL) {
  require("dotenv").config();
}

const { Client } = require("pg");

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

// Checks if the current session has a user
const hasSession = (request, response) => {
  if (request.session.isLoggedIn && request.session.isLoggedIn == true) {
    return true;
  }
  else {
    console.log("NOT LOGGED IN")
    response.status(400).json(errorMsg("No session. Please log in."));
    return false;
  }
}

function escape(input, match) {

  if (match.includes(input.toLowerCase())) {
    return true;
  }
  return false;
}

function errorMsg(text) {
  return { error: text };
}

// most read/reviewed book the last 7 days.
const mostReadBook = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  client.query("SELECT book.id, title,author,pages,descr AS desc,thumbnail FROM Review LEFT JOIN Book ON Book.id = bookId WHERE review.timeofreview > (NOW() - INTERVAL '7 DAY') GROUP BY book.id ORDER BY (SUM(rating)/COUNT(*)) DESC LIMIT 20", (error, results) => {
    if (error) {
      response.status(500).send(errorMsg("Internal server error"));
    } else {
      response.status(200).json(results.rows)
    }
  })
}

// top list sorted on users and points.
const userReadMost = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  client.query("SELECT Users.id, firstName || ' ' || lastName AS name, SUM(COALESCE(pages,0)) as points FROM Review LEFT JOIN Users ON writtenBy = users.id LEFT JOIN Book ON Book.id = bookId WHERE accepted = true AND review.timeofreview > (NOW() - INTERVAL '7 DAY') GROUP BY users.id ORDER BY points DESC LIMIT 1", (error, results) => {
    if (error) {
      response.status(500).send(errorMsg("Internal server error"));
    } else {
      response.status(200).json(results.rows)
    }
  })
}

//Gets all the information by a user.
const getUserById = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  const id = parseInt(request.params.id);

  client.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      response.status(500).send(errorMsg("Internal server error"));
    } else {
      response.status(200).json(results.rows);
    }
  });
};

// Parse input to id integer
const getUserId = (request) => {
  return parseInt(request.session.userId);
}

// "Smart" algorithm to find recommended books tied to a user
const getRandomRecommendation = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  const id = getUserId(request);

  client.query("WITH test1 AS(SELECT bookid, writtenby, rating, title from review LEFT JOIN Book on bookid=book.id where writtenby=$1), test2 AS(SELECT bookid, writtenby, rating, title from review left join book on bookid=book.id where writtenby != $1), test3 AS (SELECT test2.bookid, test2.writtenby, test2.rating, test2.title FROM test1 JOIN test2 ON test1.bookid = test2.bookid),test4 AS ((SELECT bookid FROM review WHERE writtenBy IN (SELECT writtenBy FROM test3) AND bookid NOT IN (SELECT bookid FROM test3 ORDER BY RATING DESC LIMIT 5)) UNION (SELECT bookid from recommendedBooks)) SELECT id, title, author, descr, pages, thumbnail FROM test4 JOIN book ON id = bookid ORDER BY RANDOM() LIMIT 1", [id], (error, results) => {
    if (error) {
      response.status(500).send(errorMsg("Internal server error"));
    } else {
      response.status(200).json(results.rows);
    }
  });
};

// get points of specific user.
const getUserPoints = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  const id = getUserId(request);

  client.query("SELECT * FROM allStudPoints WHERE id = $1", [id], (error, results) => {
    if (error) {
      response.status(500).send(errorMsg("Internal server error"));
    } else {
      response.status(200).json(results.rows);
    }
  });
};

// toplist ordered by filter choice.
const toplist = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  const filter = request.query.filter
  const order = request.query.order


  const match1 = ["name", "points", "classname", "booksread"];
  const match2 = ["asc", "desc"];

  if (escape(filter, match1) && escape(order, match2)) {
    client.query('SELECT * FROM topliststudent ORDER BY ' + filter + ' ' + order, (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      } else {
        response.status(200).json(results.rows)
      }
    })
  }
  else {
    response.status(400).json(errorMsg("Wrong parameters"))
  }
}

// Sum of all the students in a class points
const getClassPoints = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  client.query("select className, SUM(points) as points  from topliststudent GROUP by className order by points desc", (error, results) => {
    if (error) {
      response.status(500).send(errorMsg("Internal server error"));
    } else {
      response.status(200).json(results.rows);
    }
  });

}

module.exports = {
    getClassPoints,
    mostReadBook,
    userReadMost,
    getUserPoints,
    getUserById,
    toplist,
    getRandomRecommendation
}
