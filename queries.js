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


const logout = (request, response) => {
  request.session.destroy();
  response.status(200).send(true);
}

const login = (request, response) => {

  const mail = request.body.mail;
  const password = request.body.password;

  client.query(
    "SELECT * FROM users where mail=$1 AND password=$2",
    [mail, password],
    (error, result) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      }
      else if (result.rows.length === 1) { // SUCCESS LOGIN

        request.session.isLoggedIn = true;
        request.session.userId = result.rows[0].id;
        request.session.role = result.rows[0].roleid;
        request.session.name = result.rows[0].firstname + " " + result.rows[0].lastname;
        console.log("SESSION SET")

        response.status(200).send(true);
      }
      else {
        console.log("SESSION DESTROY")
        request.session.destroy();
        response.status(400).send(errorMsg("Wrong credentials"));
      }
    }
  );
}

const getSession = (request, response) => {
  const session = {
    login: request.session.isLoggedIn === true,
    id: request.session.userId,
    role: request.session.role,
    name: request.session.name
  }
  response.status(200).send(session);
}


const submitreview = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }

  let id = getUserId(request);
  let title = request.body.title;
  let pages = request.body.pages;
  let review = request.body.review;
  let author;

  if (Array.isArray(request.body.author)) {
    author = JSON.stringify(request.body.author)
  } else {
    author = request.body.author;
  }
  let apilink = "google/asd";
  let descr = request.body.desc;
  let thumbnail;
  if (request.body.thumbnail.thumbnail) {
    thumbnail = request.body.thumbnail.thumbnail;
  }
  else {
    thumbnail = request.body.thumbnail;
  }
  let writtenBy = id;
  let worthReading = request.body.recommended === "true";
  let rating = parseInt(request.body.grade);
  let summary = review;

  client.query(
    "INSERT INTO newreview VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [title, author, pages, apilink, descr, thumbnail, writtenBy, worthReading, rating, summary],
    (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      }
      else {
        response.status(200).send(results.rows);
      }
    }
  );
};

const latestReview = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  client.query("select Book.id, title, author,pages,descr AS desc,thumbnail from review left join book on bookId = Book.id group by Book.id order by max(timeofreview) desc limit 20", (error, results) => {
    if (error) {
      response.status(500).send(errorMsg("Internal server error"));
    }
    else {
      response.status(200).json(results.rows)
    }
  })
}


const bookssearch = async (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  let id = request.params.bookname.replace(" ", "+")

  const books = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + id + "&key=" + process.env.GOOGLEAPI_KEY + "&maxResults=40")
    .then((resp) => resp.json());

  let result = books.items.map((book) => {
    if (!book.volumeInfo.authors || !book.volumeInfo.pageCount || !book.volumeInfo.title)
      return null;
    else
      return {
        id: book.id,
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors,
        pages: book.volumeInfo.pageCount,
        publishedDate: book.volumeInfo.publishedDate,
        desc: book.volumeInfo.description,
        thumbnail: book.volumeInfo.imageLinks
      };
  });

  let filteredResult = result.filter(function (element) {
    return element != null;
  });

  response.status(200).json(filteredResult);

}

const getUsers = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  if (!hasSession(request, response)) {
    return;
  }

  client.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      response.status(500).send(errorMsg("Internal server error"));
    } else {
      response.status(200).json(results.rows);
    }
  });
};

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


const getUserId = (request) => {
  return parseInt(request.session.userId);
}

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

const searchBookDb = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  const id = '%' + request.params.bookname + '%';

  client.query("SELECT * FROM book WHERE lower(title) LIKE $1", [id], (error, results) => {
    if (error) {
      response.status(500).send(errorMsg("Internal server error"));
    } else {
      response.status(200).json(results.rows);
    }
  });
};

const deleteUser = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  const id = parseInt(request.params.id);

  client.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      response.status(500).send(errorMsg("Internal server error"));
    } else {
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  });
};

function escape(input, match) {

  if (match.includes(input.toLowerCase())) {
    return true;
  }
  return false;
}

function errorMsg(text) {
  return { error: text };
}

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

const getClassPoints = (request, response) => {
  if (!hasSession(request, response)) {
    return;
  }
  client.query("select className, SUM(points) as points  from topliststudent GROUP by className order by points desc", (error, results) => {
    if (error) {
      response.status(500).send(errorMsg("Internal server error"));
    } else {
      response.status(200).send(`User deleted with ID: ${id}`);
    }
  });

}

module.exports = {
  getUsers,
  getUserPoints,
  getUserById,
  deleteUser,
  bookssearch,
  submitreview,
  getClassPoints,
  mostReadBook,
  userReadMost,
  toplist,
  searchBookDb,
  latestReview,
  getRandomRecommendation,
  login,
  getSession,
  logout
}
