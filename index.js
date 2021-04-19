const express = require('express')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 5000

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create all API-requests
app.get('/api/users', db.getUsers)
app.get('/api/users/:id', db.getUserById)
app.get('/api/users/:id/points', db.getUserPoints)
app.get('/api/books/:bookname', db.bookssearch)
app.post('/api/submitreview',db.submitreview);
app.get('/api/mostreadbook', db.mostReadBook)
app.get('/api/userreadmost', db.userReadMost)
app.get('/api/toplist', db.toplist)
app.delete('/api/users/:id', db.deleteUser)

// Load react frontend
app.use(express.static('client/build'));

// 404 Not found -> redirects to home page
app.get('/*', (request, response) => {
  response.redirect('/');
})

// Start server
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
