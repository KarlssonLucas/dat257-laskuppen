<<<<<<< HEAD
CREATE OR REPLACE VIEW asd AS
    WITH test1 AS(
        SELECT bookid, writtenby, rating, title 
        from review LEFT JOIN Book on 
        bookid=book.id where writtenby=1),

        test2 AS(SELECT bookid, writtenby, 
        rating, title from review left join 
        book on bookid=book.id 
        where writtenby != 1)
        
    SELECT test2.bookid, test2.writtenby, test2.
    rating, test2.title FROM test1 JOIN test2 
    ON test1.bookid = test2.bookid;

SELECT * FROM review WHERE writtenBy IN (SELECT writtenBy FROM ASD) AND bookid NOT IN (SELECT bookid FROM asd ORDER BY RATING DESC LIMIT 5);
=======
WITH test1 AS(
    SELECT bookid, writtenby, rating, title 
    from review LEFT JOIN Book on 
    bookid=book.id where writtenby=1),

    test2 AS(
        SELECT bookid, writtenby, 
        rating, title from review left join 
        book on bookid=book.id 
        where writtenby != 1),

    test3 AS ( 
        SELECT test2.bookid, test2.writtenby, test2.
        rating, test2.title FROM test1 JOIN test2 
        ON test1.bookid = test2.bookid),

test4 AS((SELECT bookid FROM review WHERE writtenBy IN (SELECT writtenBy FROM test3) AND bookid NOT IN (SELECT bookid FROM test3 ORDER BY RATING DESC LIMIT 5))
UNION
(SELECT bookid from recommendedBooks))

select * from test4 JOIN book ON id = bookid ORDER BY RANDOM() LIMIT 1;
>>>>>>> latestReviewsFix
