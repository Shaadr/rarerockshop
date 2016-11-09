select prod.*, pic.*
from products_in_cart pic
join products prod
on prod.id = pic.productid
where pic.orderid = $1;
