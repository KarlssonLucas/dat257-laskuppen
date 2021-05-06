## OBS! NEEDS AN UPDATE x)

School(<ins>id</ins>, name)

Roles(<ins>id</ins>, role)

Book(<ins>id</ins>, apiLink, title, author, pages 

Classes(<ins>id</ins>, className, schoolId)<br>
* schoolId -> School.id

Users(<ins>id</ins>, mail, firstName, lastName, password, classId, roleId
* classId -> Classes.id
* roleId -> Roles.id
* UNIQUE(mail)

ExtraPoints(userId, points, reason)
* userId -> Users.id

Review(<ins>id</ins>, bookId, writtenBy, worthReading, accepted, grade, summary)
* bookId -> Book.id 
* writtenBy -> Users.id
* UNIQUE (writtenBy, bookId) 

FrequentlyAskedQuestions(<ins>id</ins>, schoolId, question, answer)
* schoolId -> School.id
* question TEXT,
* answer TEXT

SchoolSettings(<ins>schoolId</ins>, weeklyBook)
* schoolId -> School.id
* weeklyBook -> Book.id
