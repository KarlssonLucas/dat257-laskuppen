CREATE OR REPLACE VIEW studentsPoints AS
SELECT Users.id as uidd, SUM(COALESCE(pages,0)) as points, 
COUNT(Review.id) as booksRead
FROM Review 
LEFT JOIN Users ON writtenBy = users.id 
LEFT JOIN Book ON Book.id = bookId WHERE accepted = true 
GROUP BY users.id;

-- toplistan filtrera genom att lägga till order by i slutet
CREATE OR REPLACE VIEW toplistStudent AS 
SELECT firstName || ' ' || lastName as name, 
className, COALESCE(studentsPoints.points, 0)+COALESCE(exPoints,0) as points, COALESCE(booksRead, 0) as booksRead
FROM Users LEFT JOIN studentsPoints ON uidd = id 
LEFT JOIN ExtraPoints ON userId = id 
LEFT JOIN Classes ON Classes.id = classId
WHERE studentsPoints.points > 0 OR exPoints > 0;

CREATE OR REPLACE VIEW acceptedReviews AS
SELECT title, firstName || ' ' || lastName as name, author, 
rating || '/' || '10' as grade, worthReading, summary, accepted, published
FROM Review LEFT JOIN Users on review.id = users.id
LEFT JOIN Book ON Book.id = bookId; --add where accepted = true for "läs recensioner"

-- hitta böcker
CREATE OR REPLACE VIEW booksRead AS
SELECT title, author, pages, ROUND(AVG(rating)) || '/' || 10 as grade,
descr, thumbnail
FROM Review LEFT JOIN Book ON review.id = bookId
GROUP BY book.id;

-- topplista över mest lästa böckerna
CREATE OR REPLACE VIEW mostReadBooksToplist AS
SELECT Book.title, COUNT (Review.bookId) AS freq
FROM Book LEFT JOIN Review ON Review.bookId = Book.id
GROUP BY Book.title
ORDER BY freq DESC; -- filtrera genom att lägga till order by freq DESC/ASC i slutet om vi vill, ASC känns dock irrelevant.

--topplista över högst rankade böckerna
CREATE OR REPLACE VIEW bestRatedBooksToplist AS
SELECT Book.title, COALESCE(AVG(rating), 0) AS averageRating
FROM Book LEFT JOIN Review ON Review.bookId = Book.id
GROUP BY Book.title
ORDER BY averageRating DESC;

-- View till inserts för att skapa nya reviews
CREATE OR REPLACE VIEW NewReview AS 
SELECT title,author,pages,apiLink,descr,thumbnail,writtenBy,worthReading,rating,summary
FROM Book RIGHT JOIN Review ON Book.id = Review.bookId;
