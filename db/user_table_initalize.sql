CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  name varchar(40),
  userName varchar(25) UNIQUE,
  email varchar(40) UNIQUE,
  password varchar(50),
  dateCreated varchar(10),
  phone varchar(10),
  isAdmin boolean,
);
