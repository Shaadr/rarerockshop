CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  userid integer,
  productid integer,
  cartid integer,
  complete boolean
);
