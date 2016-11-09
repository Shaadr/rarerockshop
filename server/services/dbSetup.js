var app = require('./../server');
var db = app.get('db');

module.exports = {
	run: function() {
		console.log('Initializing database');

		db.user_table_initalize(function(err, table) {});
		db.product_table_initialize(function (err, table) {});
		db.products_in_cart_table_initialize(function (err, table) {});
		db.orders_table_initialize(function (err, table) {});
		
	}
};
