const express = require('express')
const app = express()
const db = require('./queries')
const port = process.env.PORT || 3000

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create all API-requests
app.get('/api/users', db.getUsers)
app.get('/api/users/:id', db.getUserById)
app.delete('/api/users/:id', db.deleteUser)

// Load react frontend
app.use(express.static('client/build'));

// 404 Not found -> redirects to home page
app.get('/*', (request, response) => {
  response.redirect('/');
})

// Start server
app.listen(port,'localhost', () => {
  console.log(`App running on port ${port}.`)
})
