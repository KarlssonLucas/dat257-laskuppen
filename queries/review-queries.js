const { request, response } = require("express");
const fetch = require("node-fetch");
const { client, hasSession, errorMsg, escape, getUserId } = require("./utils")

// search book that is in our DB, just need title to identify book.
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

// for search of books which are not in our own DB, if not author, pageCount, title 
// combo is unique/new it is already in our database and we return null. searchBookDb() search in our DB.
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

// used for "recommended" books to review, like when a whole class reviews the same book. 
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

module.exports = {
  latestReview,
  bookssearch,
  submitreview,
  searchBookDb
}
