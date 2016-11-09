var app = require('./../server');
var db = app.get('db')

module.exports = {
  addToCart: function (req, res, next) {
    var product = req.body;

    db.product_cart_insert([req.params.cartid, product.id, product.qty], function (err, products) {
      if (err){
        return res.status(500)
        .send(err)
      }
      res.status(200)
      .send(products);
    });
  },

  deleteCartItem: function (req, res, next) {
    db.product_cart_remove([req.params.productid], function (err, product) {
      if (err){
        return res.status(500)
        .send(err)
      }
      res.status(200)
      .send('Item Removed Successfully');
    });
  },

  getUserOrder: function(req, res, next) {
    console.log(req.user);
		var completeOrder = {};
		db.order_by_user([req.user[0].id], function(err, cart) {
			console.log(err);
			if (err) {
				return res.status(500)
					.send(err);
			}

			completeOrder.order = cart[0];
			db.product_cart_find([completeOrder.order.id], function(err, products) {
				console.log(products);
				if (err) {
					return res.status(500)
						.send(err);
				}

				completeOrder.products = products;
				res.status(200)
					.send(completeOrder);
			});
		});
	}
};
