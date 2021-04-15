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

INSERT INTO Book VALUES
(1, 'asd','harry1','jkrow',150,'harry bla','asdasd.com/asdasd'),
(2, 'asd','harry2','jkrow',200,'harry bla bla','asdasd.com/asdasd'),
(3, 'asd','harry3','jkrow',250,'harry bla bla bla','asdasd.com/asdasd');

INSERT INTO Review VALUES
(1, 1, 1, true, true, true, 8, 'asd asd asd', NOW() - INTERVAL '10 DAY'),
(3, 3, 1, true, true, true, 10, 'asd asd asd', NOW() - INTERVAL '15 DAY'),
(4, 1, 2, true, true, true, 10, 'asd asd asd', NOW()),
(5, 2, 2, true, true, true, 10, 'asd asd asd', NOW()),
(6, 3, 2, true, true, true, 10, 'asd asd asd', NOW()),
(7, 1, 3, true, true, true, 10, 'asd asd asd', NOW()),
(8, 2, 3, true, true, true, 10, 'asd asd asd', NOW()),
(9, 1, 4, true, true, true, 10, 'asd asd asd', NOW()),
(10, 2, 4, true, true, true, 10, 'asd asd asd', NOW());

INSERT INTO ExtraPoints VALUES 
(2, 20, 'asdasd'),
(1, 10, 'asd');

