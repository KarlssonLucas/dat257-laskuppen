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

// get all FAQ:s
const faqGet = (request, response) => {
    if (!hasSession(request, response)) {
      return;
    }
    client.query("select * from FrequentlyAskedQuestions", (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      } else {
        response.status(200).json(results.rows);
      }
    });
  
  }
  
  const faqDel = (request, response) => {
    if (!hasSession(request, response)) {
      return;
    }
  
    let id = parseInt(request.params.id)
  
    client.query("delete from FrequentlyAskedQuestions where id = $1", [id], (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      } else {
        response.status(200).send(`Questions deleted with ID: ${id}`);
      }
    });
  
  }
  // update existing FAQ question and answer
  const faqPut = (request, response) => {
    if (!hasSession(request, response)) {
      return;
    }
    let id = parseInt(request.body.id);
    let question = request.body.question
    let answer = request.body.answer
  
    client.query("update FrequentlyAskedQuestions set question= $1, answer=$2 where id = $3", [question, answer, id], (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      } else {
        response.status(200).send(`Questions updated with ID: ${id}`);
      }
    });
  
  }
  
  const FAQAdd = (request, response) => {
    if (!hasSession(request, response)) {
      return;
    }
    let question = request.body.question
    let answer = request.body.answer
  
    client.query("INSERT INTO FrequentlyAskedQuestions (question, answer) VALUES($1,$2)", [question, answer], (error, results) => {
      if (error) {
        response.status(500).send(errorMsg("Internal server error"));
      } else {
        response.status(200).send(`Questions added`);
      }
    });
  }

module.exports = {
    faqGet,
    faqDel,
    faqPut,
    FAQAdd
}
