DROP TABLE IF EXISTS School CASCADE;
DROP TABLE IF EXISTS Classes CASCADE;
DROP TABLE IF EXISTS lUser CASCADE;
DROP TABLE IF EXISTS Roles CASCADE;
DROP TABLE IF EXISTS ExtraPoints CASCADE;
DROP TABLE IF EXISTS Review CASCADE;
DROP TABLE IF EXISTS Book CASCADE;


CREATE TABLE School(
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE Classes(
    className TEXT,
    classId SERIAL UNIQUE,
    school INT,
    FOREIGN KEY(school) REFERENCES School(id),
    PRIMARY KEY(school,className)
);

CREATE TABLE Roles(
    role TEXT,
    id INT,
    PRIMARY KEY(id)
);

CREATE TABLE lUser(
    mail TEXT UNIQUE,
    id SERIAL PRIMARY KEY,
    name TEXT,
    password TEXT,
    class INT REFERENCES Classes(classId),
    role INT REFERENCES Roles(id)
);

CREATE TABLE ExtraPoints(
    luser INT REFERENCES lUser(id),
    points INT,
    reason TEXT,
    PRIMARY KEY(luser)
);

CREATE TABLE Review(
    book TEXT, 
    writtenBy INT REFERENCES lUser(id),
    worthReading BOOLEAN DEFAULT FALSE,
    accepted BOOLEAN DEFAULT FALSE,
    summary TEXT,
    PRIMARY KEY (writtenBy,book) 
);

CREATE TABLE Book(
    id TEXT PRIMARY KEY,
    apiLink TEXT,
    title TEXT,
    author TEXT,
    pages INT
);

