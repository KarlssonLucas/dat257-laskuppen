INSERT INTO School VALUES(DEFAULT,'Chalmers'); -- schoolId = 1

INSERT INTO Classes VALUES
(DEFAULT,'IT',1),
(DEFAULT, 'TE2A', 1);

INSERT INTO Roles VALUES
(1,'Student'),
(2,'Teacher'), 
(3,'Admin');

INSERT INTO Users VALUES
(DEFAULT,'teacher@gmail.com','Linda','Efson','qwe123',1,3),
(DEFAULT,'jjaokk@gmail.com','Joakim','Ohlsson','qwe123',1,2),
(DEFAULT,'foo@gmail.com','Foo','Fooson','qwe123',1,1),
(DEFAULT,'bar@gmail.com','Bar','Barson','qwe123',1,1);

INSERT INTO NewReview (title,author,pages,apiLink,descr,thumbnail,writtenBy,worthReading,rating,summary) VALUES
('Nice book', '["Apa"]', 100, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 1, true, 10, 'brabok1'),
('Nice book', '["Apa"]', 100, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 2, true, 10, 'brabok1'),
('You liked nice book', '["Apa"]', 100, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 2, true, 10, 'brabok1'),
('Dont catch this ples', '["Apa"]', 100, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 3, true, 10, 'brabok1');

INSERT INTO ExtraPoints VALUES 
(2, 20, 'asdasd'),
(1, 10, 'asd');

