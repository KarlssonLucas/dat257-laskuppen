const { request, response } = require("express");
const fetch = require("node-fetch");
const { client, isAdmin, hasSession, errorMsg } = require("./utils")


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

// Delete a faq
const faqDel = (request, response) => {
  if (!isAdmin(request, response)) {
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
  if (!isAdmin(request, response)) {
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

//Add a new faq
const faqAdd = (request, response) => {
  if (!isAdmin(request, response)) {
    return;
  }

  client.query("INSERT INTO FrequentlyAskedQuestions (question, answer) VALUES('','')", (error, results) => {
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
  faqAdd
}
