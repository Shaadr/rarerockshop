CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname varchar(40),
  lastname varchar(40),
  username varchar(40) UNIQUE,
  email varchar(240) UNIQUE,
  password varchar(240),
  datecreated varchar(240),
  phone varchar(10),
  isadmin boolean
);
