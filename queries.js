const { request } = require("express");
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

const bookssearch = async (request, response) => {
  const id = request.params.bookname;
  const lala = await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=" +
      id +
      "&key=" +
      process.env.GOOGLEAPI_KEY +
      "&maxResults=40"
  ).then((resp) => resp.json());
  response.status(200).json(
    lala.items.map((book) => {
      return {
        title: book.volumeInfo.title,
      };
    })
  );
};

const submitreview = (request, response) => {
    let title = request.body.title;
    let pages = request.body.pages;
    let review = request.body.review;
    let author = request.body.author;
    let apilink = "google/asd";
    let descr = "desc";
    let thumbnail = "img_src";
    let writtenBy = 1;
    let worthReading = request.body.recommended === "true";
    let rating = parseInt(request.body.grade);
    let summary = request.body.review;

    client.query(
      "INSERT INTO newreview VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [title,author,pages,apilink,descr,thumbnail,writtenBy,worthReading,rating,summary],
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

const getUsers = (request, response) => {
  client.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id);

  client.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
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

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  bookssearch,
  submitreview,
};
