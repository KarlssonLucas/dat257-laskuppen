

CREATE OR REPLACE FUNCTION insert_new_review() RETURNS trigger AS $$
    DECLARE book INT; -- bookId
    BEGIN

    -- Check if book exists in database
    IF NOT EXISTS  (SELECT * FROM Book WHERE title = NEW.title AND author = new.author AND pages = NEW.pages) THEN
        RAISE NOTICE 'NEW BOOK! %', NEW.title; -- Create new Book
        INSERT INTO Book (title,apiLink,author,pages,descr,thumbnail) 
        VALUES (NEW.title,NEW.apiLink,NEW.author,NEW.pages,NEW.descr,NEW.thumbnail);
    END IF;

    -- Get book id
    SELECT id INTO book FROM Book WHERE title = NEW.title AND author = new.author AND pages = NEW.pages;
 
    -- Check if user is making a duplicate review 
    IF EXISTS (SELECT * FROM Review WHERE bookId = book AND writtenBy = writtenBy) THEN
        INSERT INTO Errors (error,msg,userId) VALUES ('DUPLICATE REVIEW','Book: ' || book,NEW.writtenBy);
        RAISE NOTICE 'DUPLICATE REVIEW: % %', NEW.writtenBy , book;
        RETURN null; -- Return
    END IF;

    -- TODO:: CHECK SUMMARY LENGTH TO MATCH SCHOOL SETTING
    
    -- Create new review
    INSERT INTO Review (bookId,writtenBy,worthReading,rating,summary) 
    VALUES (book,NEW.writtenBy,NEW.worthReading,NEW.rating,NEW.summary);
        
    RETURN NEW; -- Success

    END;

$$ LANGUAGE plpgsql;


CREATE TRIGGER new_review_trigger INSTEAD OF INSERT ON NewReview
    FOR EACH ROW EXECUTE FUNCTION  insert_new_review();

