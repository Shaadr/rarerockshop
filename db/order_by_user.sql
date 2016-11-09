select *
from orders
where userid = $1 and complete = false;
