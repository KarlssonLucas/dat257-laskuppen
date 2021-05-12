INSERT INTO School VALUES(DEFAULT,'Chalmers'); -- schoolId = 1

INSERT INTO Classes VALUES
(DEFAULT,'IT'),
(DEFAULT, 'TE2A');

INSERT INTO Roles VALUES
(1,'Student'),
(2,'Teacher'), 
(3,'Admin');

INSERT INTO Users VALUES
(DEFAULT,'teacher@gmail.com','Linda','Efson','qwe123',1,3),
(DEFAULT,'jjaokk@gmail.com','Joakim','Ohlsson','qwe123',1,2),
(DEFAULT,'foo@gmail.com','Foo','Fooson','qwe123',2,1),
(DEFAULT,'bar@gmail.com','Bar','Barson','qwe123',1,1);

INSERT INTO NewReview (title,author,pages,apiLink,descr,thumbnail,writtenBy,worthReading,rating,summary) VALUES
('Nice book', '["Apa"]', 100, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 1, true, 5, 'brabok1'),
('Nice book', '["Apa"]', 100, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 2, true, 4, 'brabok1'),
('You liked nice book', '["Apa"]', 100, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 2, true, 6, 'brabok1'),
('Dont catch this ples', '["Apa"]', 100, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 3, true, 7, 'brabok1');

INSERT INTO ExtraPoints VALUES 
(2, 20),
(1, 10);

INSERT INTO RecommendedBooks VALUES
(1),
(3);

INSERT INTO FrequentlyAskedQuestions (question, answer) VALUES
('Vad ar en groda utan ben','Hopplos'),
('Vilket ar det storsta djuret i skogen','En orm'),
('Vad heter Mc Donalds nya fiskburgare','Mc Rill');

UPDATE Review SET accepted = true;
