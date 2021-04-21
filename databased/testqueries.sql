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
