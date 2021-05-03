const express = require('express')
var session = require('express-session')

const app = express()
const db = require('./queries')
const port = process.env.PORT || 5000

// Data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60*60*1000 }}) // Inloggad max 1 timme?
  )


// Create all API-requests
app.post('/api/login', db.login)
app.get('/api/users', db.getUsers)
app.get('/api/recommendation', db.getRandomRecommendation)
app.get('/api/accrev/:id', db.acceptReview)
app.get('/api/rejrev/:id', db.rejectReview)
app.get('/api/unpubrev/:id', db.unpublishReview)
app.get('/api/pubrev/:id', db.publishReview)
app.get('/api/reviews', db.getReviews)
app.get('/api/latestreviews', db.latestReview)
app.get('/api/booksearch/:bookname', db.searchBookDb)
app.get('/api/users/:id', db.getUserById)
app.get('/api/userpoints', db.getUserPoints)
app.get('/api/books/:bookname', db.bookssearch)
app.post('/api/submitreview',db.submitreview);
app.get('/api/mostreadbook', db.mostReadBook)
app.get('/api/userreadmost', db.userReadMost)
app.get('/api/toplist', db.toplist)
app.get('/api/bonus', db.bonusPoints)
app.get('/api/classpoints', db.getClassPoints)
app.delete('/api/users/:id', db.deleteUser)
app.get('/api/session', db.getSession)
app.get('/api/logout', db.logout)
app.get('/api/faq',db.faqGet)
app.delete('/api/faq/:id',db.faqDel)
app.put('/api/faq',db.faqPut)
app.post('/api/faq',db.FAQAdd)
//DAvid fick feber här
app.get('/api/reviewedbooks/:filter', db.reviewedBooks)

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
