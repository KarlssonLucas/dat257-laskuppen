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
('T1', '["Aaa"]', 100, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 1, true, 10, 'review1'),
('T6', '["Bbb"]', 105, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 2, true, 9, 'review2'),
('Asd', '["Cac"]', 1000, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 2, false, 8, 'review3'),
('Test bookkkk', '["Ccc"]', 1123, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 3, true, 7, 'review4'),
('Test book', '["Dfg"]', 120, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 1, true, 9, 'review5'),
('Test book', '["Dfg"]', 120, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 3, false, 5, 'review6'),
('Test book', '["Dfg"]', 120, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 2, true, 2, 'review7'),
('Bibeln', '["Eee"]', 555, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 2, true, 6, 'review8'),
('Book', '["Fff"]', 1234, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 3, true, 5, 'review9'),
('Ttt', '["Ggg"]', 2000, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 1, true, 4, 'review10'),
('Asdfg', '["Http"]', 186, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 2, false, 3, 'review11'),
('T01', '["Https"]', 777, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 2, false, 2, 'review12'),
('Title 123', '["Hhh"]', 666, 'google', 'desc', 'https://images-na.ssl-images-amazon.com/images/I/41joxA5gtjL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', 3, false, 1, 'review13');

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
