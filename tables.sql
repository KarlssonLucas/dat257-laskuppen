DROP TABLE IF EXISTS School CASCADE;
DROP TABLE IF EXISTS Classes CASCADE;
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Roles CASCADE;
DROP TABLE IF EXISTS ExtraPoints CASCADE;
DROP TABLE IF EXISTS Review CASCADE;
DROP TABLE IF EXISTS Book CASCADE;
DROP TABLE IF EXISTS FrequentlyAskedQuestions CASCADE;
DROP TABLE IF EXISTS SchoolSettings CASCADE;

CREATE TABLE School(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE Classes(
    id SERIAL PRIMARY KEY,
    className TEXT,
    schoolId INT,
    FOREIGN KEY(schoolId) REFERENCES School(id),
    UNIQUE (schoolId,className)
);

CREATE TABLE Roles(
    id INT PRIMARY KEY,
    role TEXT
);

CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    mail TEXT UNIQUE,
    firstName TEXT,
    lastName TEXT,
    password TEXT,
    classId INT REFERENCES Classes(id),
    roleId INT REFERENCES Roles(id)
);

CREATE TABLE ExtraPoints(
    userId INT REFERENCES Users(id),
    exPoints INT,
    reason TEXT
);

CREATE TABLE Book(
    id INT PRIMARY KEY,
    apiLink TEXT,
    title TEXT,
    author TEXT,
    pages INT,
    descr TEXT,
    thumbnail TEXT
);

CREATE TABLE Review(
    id INT PRIMARY KEY,
    bookId INT REFERENCES Book(id), 
    writtenBy INT REFERENCES Users(id),
    worthReading BOOLEAN DEFAULT FALSE,
    accepted BOOLEAN DEFAULT FALSE,
    published BOOLEAN DEFAULT FALSE,
    grade INT, --rename rating? (EnTeori)
    summary TEXT,
    timeOfReview DATE,
    UNIQUE (writtenBy,bookId) 
);

CREATE TABLE FrequentlyAskedQuestions(
    id INT PRIMARY KEY,
    schoolId INT REFERENCES School(id),
    question TEXT,
    answer TEXT
);

CREATE TABLE SchoolSettings(
    schoolId INT REFERENCES School(id) PRIMARY KEY,
    weeklyBook INT REFERENCES Book(id)
);
