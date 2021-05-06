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

const getUserId = (request) => {
    return parseInt(request.session.userId);
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

//add bonus points to a review.
const bonusPoints = (request, response) => {
    if (!hasSession(request, response)) {
      return;
    }
  
    const id = request.query.id
    const points = request.query.points
  
    client.query('WITH asd AS (select COALESCE(expoints, 0) as epoints from extrapoints where userid=$1) insert into extrapoints values($1, $2) on conflict (userId) do update set expoints = $2 + (SELECT epoints FROM asd);', [id, points], (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      } else {
        response.status(200).json(results.rows)
      }
    })
  }

const acceptReview = (request, response) => {
    const id = parseInt(request.params.id)
    client.query("UPDATE Review SET accepted=true WHERE id=$1", [id], (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      }
      response.status(200).json(`Review updated with ID: ${id}`);
    });
  };
  
const rejectReview = (request, response) => {
    const id = parseInt(request.params.id)
    console.log(id);
    client.query("UPDATE Review SET accepted=false WHERE id=$1", [id], (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      }
      response.status(200).json(`Review updated with ID: ${id}`);
    });
  };
  
const publishReview = (request, response) => {
    const id = parseInt(request.params.id)
    client.query("UPDATE Review SET published=true WHERE id=$1", [id], (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      }
      response.status(200).json(`Review updated with ID: ${id}`);
    });
  };
  
const unpublishReview = (request, response) => {
    const id = parseInt(request.params.id)
    client.query("UPDATE Review SET published=false WHERE id=$1", [id], (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      }
      response.status(200).json(`Review updated with ID: ${id}`);
    });
  };

// all reviews.
const getReviews = (request, response) => {
    client.query("SELECT review.id AS rid, firstName || ' ' || lastName AS name, bookid, accepted, published, rating, summary, title, author, pages, Users.id AS uid FROM Review LEFT JOIN Book ON bookid=Book.id LEFT JOIN Users ON Users.id = writtenby", (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      }
      response.status(200).json(results.rows);
    });
  };

module.exports = {
    acceptReview,
    rejectReview,
    unpublishReview,
    publishReview,
    getReviews,
    bonusPoints
}
