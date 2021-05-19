-- A users points from reading books
CREATE OR REPLACE VIEW studentsPoints AS
SELECT Users.id as uidd, SUM(COALESCE(pages,0)) as points, 
COUNT(Review.id) as booksRead
FROM Review 
LEFT JOIN Users ON writtenBy = users.id 
LEFT JOIN Book ON Book.id = bookId WHERE accepted = true 
GROUP BY users.id;

-- Toplist view
CREATE OR REPLACE VIEW toplistStudent AS 
SELECT firstName || ' ' || lastName as name, 
className, COALESCE(studentsPoints.points, 0)+COALESCE(exPoints,0) as points, COALESCE(booksRead, 0) as booksRead
FROM Users LEFT JOIN studentsPoints ON uidd = id 
LEFT JOIN ExtraPoints ON userId = id 
LEFT JOIN Classes ON Classes.id = classId
WHERE studentsPoints.points > 0 OR exPoints > 0;

-- All students with and without points and the books they've read
CREATE OR REPLACE VIEW allStudPoints AS 
SELECT Users.id, 
className, COALESCE(studentsPoints.points, 0)+COALESCE(exPoints,0) as points, COALESCE(booksRead, 0) as booksRead
FROM Users LEFT JOIN studentsPoints ON uidd = id 
LEFT JOIN ExtraPoints ON userId = id 
LEFT JOIN Classes ON Classes.id = classId;

-- Reviews that have been accepted
CREATE OR REPLACE VIEW acceptedReviews AS
SELECT title, firstName || ' ' || lastName as name, author, 
rating || '/' || '10' as grade, worthReading, summary, accepted, published
FROM Review LEFT JOIN Users on review.id = users.id
LEFT JOIN Book ON Book.id = bookId; --add where accepted = true for "läs recensioner"

-- Books that have been read
CREATE OR REPLACE VIEW booksRead AS
SELECT title, author, pages, ROUND(AVG(rating),3) as grade,
descr, thumbnail, book.id
FROM Review LEFT JOIN Book ON book.id = bookId
GROUP BY book.id;

-- Toplist over the most read books
CREATE OR REPLACE VIEW mostReadBooksToplist AS
SELECT Book.title, COUNT (Review.bookId) AS freq
FROM Book LEFT JOIN Review ON Review.bookId = Book.id
GROUP BY Book.title
ORDER BY freq DESC; -- filtrera genom att lägga till order by freq DESC/ASC i slutet om vi vill, ASC känns dock irrelevant.

-- Top rated books
CREATE OR REPLACE VIEW bestRatedBooksToplist AS
SELECT Book.title, COALESCE(AVG(rating), 0) AS averageRating
FROM Book LEFT JOIN Review ON Review.bookId = Book.id
GROUP BY Book.title
ORDER BY averageRating DESC;

-- View to add new reviews
CREATE OR REPLACE VIEW NewReview AS 
SELECT title,author,pages,apiLink,descr,thumbnail,writtenBy,worthReading,rating,summary
FROM Book RIGHT JOIN Review ON Book.id = Review.bookId;

CREATE OR REPLACE VIEW getReviews AS
SELECT review.id AS rid, firstName || ' ' || lastName AS name, users.classid, bookid, accepted, 
published, rating, summary, title, author, pages, Users.id AS uid 
FROM Review LEFT JOIN Book ON bookid=Book.id LEFT JOIN Users ON Users.id = writtenby;

CREATE OR REPLACE VIEW usersReviews AS
SELECT review.id AS rid, bookid, thumbnail, accepted, published, 
worthReading, rating, summary, title, author, pages, Users.id AS uid 
FROM Review LEFT JOIN Book ON bookid=Book.id LEFT JOIN Users ON Users.id = writtenby;

CREATE OR REPLACE VIEW latestReviews AS
SELECT Book.id, title, author, pages, descr AS desc, thumbnail 
FROM review LEFT JOIN book on bookId = Book.id GROUP BY Book.id ORDER BY max(timeofreview) DESC LIMIT 20;

CREATE OR REPLACE VIEW userReadMost AS
SELECT Users.id, firstName || ' ' || lastName AS name, SUM(COALESCE(pages,0)) as points 
FROM Review LEFT JOIN Users ON writtenBy = users.id LEFT JOIN Book ON Book.id = bookId 
WHERE accepted = true AND review.timeofreview > (NOW() - INTERVAL '7 DAY') 
GROUP BY users.id ORDER BY points DESC LIMIT 1;
