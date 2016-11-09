CREATE TABLE IF NOT EXISTS products_in_cart (
  id SERIAL PRIMARY KEY,
  productid integer,
  orderid integer,
  userid integer,
  cartid integer
);
