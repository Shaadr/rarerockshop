// APP //
var app = require('./../server');
var db = app.get('db');


// BCRYPT
var bcrypt = require('bcryptjs');

// HASH PASSWORD //
function hashPassword(password) {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(password, salt);
	return hash;
}

module.exports = {
	createUser: function (req, res, next) {
		console.log(req.body);
		db.user_create([req.body.firstname, req.body.lastname, req.body.username, req.body.email, req.body.password, req.body.datecreated, req.body.phone, req.body.isadmin], function(err, user) {
			res.send(200).json(user)
		})

	},
	// REGISTER USER //
	register: function(req, res, next) {
		var user = req.body;

		// Hash the users password for security
		user.password = hashPassword(user.password);

		//normalize email
		user.email = user.email.toLowerCase();

		//get Date & time user was created
		user.datecreated = new Date().toLocaleString();

		user.isadmin = false;

		db.user_create([user.firstname, user.lastname, user.username, user.email, user.password, user.datecreated, user.phone, user.isadmin], function(err, user) {

			// If err, send err
			if (err){
				console.log(err);
				return res.status(500).send(err)
			}

			user = user[0];
				db.order_create([user.id], function(err, order) {
					if (err) {
						return res.status(500)
							.send(err);
					}
					res.status(200)
						.send('User and Order created successfully');
				});
		});
	},

	// READ USER //
	read: function(req, res, next) {
		User.find(req.query, function(err, result) {
			if (err) return res.status(500)
				.send(err);
			for (var i = 0; i < result.length; i++) {
				delete result[i].password;
			}
			res.status(200)
				.send(result);
		});
	},

	// RETURN CURRENT USER //
	me: function(req, res, next) {
		// If user isnt on the session, then return error status
		if (!req.user) return res.status(401)
			.send('current user not defined');
			console.log(req.user);

		// Remove password for security
		var user = req.user[0];
		delete user.password;

		// Return user
		return res.status(200)
			.json(user);
	},

	update: function(req, res, next) {
		User.findByIdAndUpdate(req.params._id, req.body, function(err, result) {
			if (err) next(err);
			res.status(200)
				.send('user updated');
		});
	}
};
