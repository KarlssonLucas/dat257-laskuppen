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
  if(request.body.thumbnail.thumbnail){
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

const getReviews = (request, response) => {
  client.query("SELECT review.id AS rid, writtenby, bookid, accepted, published, rating, summary, title, author, pages FROM Review LEFT JOIN Book ON bookid=Book.id", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const acceptReview = (request, response) => {
  const id = parseInt(request.params.id)
  client.query("UPDATE Review SET accepted=true WHERE id=$1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(`Review updated with ID: ${id}`);
  });
};

const rejectReview = (request, response) => {
  const id = parseInt(request.params.id)
  console.log(id);
  client.query("UPDATE Review SET accepted=false WHERE id=$1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(`Review updated with ID: ${id}`);
  });
};

const publishReview = (request, response) => {
  const id = parseInt(request.params.id)
  client.query("UPDATE Review SET published=true WHERE id=$1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(`Review updated with ID: ${id}`);
  });
};

const unpublishReview = (request, response) => {
  const id = parseInt(request.params.id)
  client.query("UPDATE Review SET published=false WHERE id=$1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(`Review updated with ID: ${id}`);
  });
};

const mostReadBook = (request, response) => {
  client.query("SELECT book.id, title,author,pages,descr AS desc,thumbnail FROM Review LEFT JOIN Book ON Book.id = bookId WHERE review.timeofreview > (NOW() - INTERVAL '7 DAY') GROUP BY book.id ORDER BY (SUM(rating)/COUNT(*)) DESC LIMIT 20", (error, results) => {
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

const getRandomRecommendation = (request, response) => {
  const id = parseInt(request.params.id);

  client.query("WITH test1 AS(SELECT bookid, writtenby, rating, title from review LEFT JOIN Book on bookid=book.id where writtenby=$1), test2 AS(SELECT bookid, writtenby, rating, title from review left join book on bookid=book.id where writtenby != $1), test3 AS (SELECT test2.bookid, test2.writtenby, test2.rating, test2.title FROM test1 JOIN test2 ON test1.bookid = test2.bookid),test4 AS ((SELECT bookid FROM review WHERE writtenBy IN (SELECT writtenBy FROM test3) AND bookid NOT IN (SELECT bookid FROM test3 ORDER BY RATING DESC LIMIT 5)) UNION (SELECT bookid from recommendedBooks)) SELECT id, title, author, descr, pages, thumbnail FROM test4 JOIN book ON id = bookid ORDER BY RANDOM() LIMIT 1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const getUserPoints = (request, response) => {
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
  latestReview,
  getRandomRecommendation,
  getReviews,
  acceptReview,
  publishReview,
  rejectReview,
  unpublishReview
}
