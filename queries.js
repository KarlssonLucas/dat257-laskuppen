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
  let badInput = [];

  for (const [key, value] of Object.entries(request.body)) {
    if (value === null) {
      badInput[key] = value;
    }
  }
  console.log(badInput);
  console.log(Object.keys(badInput).length)
  console.log(request.body);


  // CHECK THAT CORRECT DATA IS SENT

  if (Object.keys(badInput).length > 0) {
    response.status(400).send(badInput);
  } else {
    let worthReading = request.body.recommended === "true";
    let grade = parseInt(request.body.grade);
    let summary = request.body.review;

    client.query(
      "INSERT INTO Review VALUES(1,1,1,$1,true,$2,$3)",
      [worthReading, grade, summary],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).send(results.rows);
      }
    );
  }
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
