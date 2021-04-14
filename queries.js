const fetch = require("node-fetch");

if(!process.env.DATABASE_URL){
  require('dotenv').config();
}

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
      ssl: {
      rejectUnauthorized: false
    }
});

client.connect();

const bookssearch = async (request, response) => {
const id = request.params.bookname
const lala = await fetch("https://www.googleapis.com/books/v1/volumes?q="+id+"&key="+process.env.GOOGLEAPI_KEY+"&maxResults=40")
.then((resp) => resp.json());
response.status(200).json(lala.items.map((book) => {
    return {
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        pageCount: book.volumeInfo.pageCount,
        publishedDate: book.volumeInfo.publishedDate,
        description: book.volumeInfo.description,
        thumbnail: book.volumeInfo.imageLinks
    };
}));
}

const getUsers = (request, response) => {
  client.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const mostReadBook = (request, response) => {
  client.query("SELECT book.id, title FROM Review LEFT JOIN Book ON bookId = Book.id WHERE review.timeofreview > (NOW() - INTERVAL '7 DAY') AND review.worthReading = true GROUP BY book.id ORDER BY COUNT(*) DESC LIMIT 1", (error, results) => {
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
  const id = parseInt(request.params.id)

  client.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

function escape(input, match){
  if(match.includes(input.toLowerCase())){
    return true;
  }
  return false;
}

function error(text){
  return {error:text};
}

const toplist = (request, response) => {
   const filter = request.query.filter
   const order = request.query.order

   const match1 = ["name","points","classname","booksread"];
   const match2 = ["asc","desc"];
    
   if(escape(filter,match1) && escape(order,match2)){
   client.query('SELECT * FROM topliststudent ORDER BY ' + filter + ' ' + order,(error, results) => {
     if (error) {
       throw error
     }
     response.status(200).json(results.rows)
   })
  }
  else{
    response.status(400).json(error("Wrong parameters"))
  }
 }

module.exports = {
  getUsers,
  getUserById,
  deleteUser,
  bookssearch,
  mostReadBook,
  userReadMost,
  toplist
}
