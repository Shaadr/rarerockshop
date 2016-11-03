CREATE TABLE IF NOT EXISTS Products (
  id SERIAL PRIMARY KEY,
  title varchar(50),
  price integer,
  weight integer,
  weightType varchar(10),
  measurements varchar(30),
  description text,
  category varchar(20),
  imageUrl text,
  isShop boolean,
  isCollection boolean
);
