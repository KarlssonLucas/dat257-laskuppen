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

const submitreview = (request, response) => {
  let title = request.body.title;
  let pages = request.body.pages;
  let review = request.body.review;
  let author;

  if(Array.isArray(request.body.author)){
    author = JSON.stringify(request.body.author)
  }else{
    author = request.body.author;
  }
  let apilink = "google/asd";
  let descr = request.body.desc;
  let thumbnail;
  console.log(request.body.thumbnail)
  if(request.body.thumbnail.thumbnail){
    console.log("THUMB")

    thumbnail = request.body.thumbnail.thumbnail;
  }
  else{
    thumbnail = request.body.thumbnail;
  }
  let writtenBy = 1;
  let worthReading = request.body.recommended === "true";
  let rating = parseInt(request.body.grade);
  let summary = request.body.review;


  client.query(
    "INSERT INTO newreview VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
    [title, author, pages, apilink, descr, thumbnail, writtenBy, worthReading, rating, summary],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(results.rows);
    }
  );
  
  console.log("EPIC")
  // ADD REVIEW TO DATABASE
};

const latestReview = (request, response) => {
    client.query("select Book.id, title, author,pages,descr AS desc,thumbnail from review left join book on bookId = Book.id group by Book.id order by max(timeofreview) desc limit 20", (error, results) => {
    if (error) {
        throw error
    }
    response.status(200).json(results.rows)
    })
}
    

const bookssearch = async (request, response) => {

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
  client.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const mostReadBook = (request, response) => {
  client.query("SELECT book.id, title,author,pages,descr AS desc,thumbnail FROM Review LEFT JOIN Book ON Book.id = bookId WHERE review.timeofreview > (NOW() - INTERVAL '7 DAY') GROUP BY book.id ORDER BY (SUM(rating)*COUNT(*)) DESC LIMIT 1", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const userReadMost = (request, response) => {
  client.query("SELECT Users.id, firstName || ' ' || lastName AS name, SUM(COALESCE(pages,0)) as points FROM Review LEFT JOIN Users ON writtenBy = users.id LEFT JOIN Book ON Book.id = bookId WHERE accepted = true AND review.timeofreview > (NOW() - INTERVAL '7 DAY') GROUP BY users.id ORDER BY points DESC LIMIT 1", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  client.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserPoints = (request, response) => {
  console.log(request.params.id)
  const id = parseInt(request.params.id);

  client.query("SELECT * FROM allStudPoints WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const searchBookDb = (request, response) => {
  const id = '%' + request.params.bookname + '%';

  client.query("SELECT * FROM book WHERE lower(title) LIKE $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  client.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

function escape(input, match) {
  if (match.includes(input.toLowerCase())) {
    return true;
  }
  return false;
}

function error(text) {
  return { error: text };
}

const toplist = (request, response) => {
  const filter = request.query.filter
  const order = request.query.order


  const match1 = ["name", "points", "classname", "booksread"];
  const match2 = ["asc", "desc"];

  if (escape(filter, match1) && escape(order, match2)) {
    client.query('SELECT * FROM topliststudent ORDER BY ' + filter + ' ' + order, (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  else {
    response.status(400).json(error("Wrong parameters"))
  }
}

const getClassPoints =(request, response) => {
  client.query("select className, SUM(points) as points  from topliststudent GROUP by className order by points desc" ,(error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
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
  latestReview
}
