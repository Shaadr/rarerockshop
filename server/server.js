// REQUIRE DEPENDENCIES
// ============================================================
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var session = require('express-session');
var massive = require('massive');

//config
var config = require('./config');

//express
var app = module.exports = express();


app.use(cors());
app.use(express.static(__dirname+'./../public'));
app.use(bodyParser.json());

//massive
var massiveUri = config.MASSIVE_URI;
var massiveServer = massive.connectSync({
  connectionString: massiveUri
})
app.set('db', massiveServer)// MUST come after app = express()
var db = app.get('db')

var dbSetup = require('./services/dbSetup');
dbSetup.run();

//controllers
var modelCtrl = require('./controllers/modelCtrl');
var userCtrl = require('./controllers/userCtrl');
var cartCtrl = require('./controllers/cartCtrl')

// SERVICES //
var passport = require('./services/passport');

// POLICIES //
var isAuthed = function(req, res, next) {
	if (!req.isAuthenticated()) {
    console.log('not authed');
    return res.sendStatus(401).send();
  }
  else {
	   next();
  }
};

var isAdmin = function (req, res, next) {
  if (req.user.isAdmin) {
		next();
	} else {
		return res.status(401)
		.send();
	}
}

//session and passport
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//passport endpoints
app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}));
app.get('/logout', function (req,res,next) {
  req.logout();
  return res.status(200)
  .send('logged out');
});

app.get('/api/inventory', function (req, res) {
  db.run("select * from products", function (err, response) {
    if (err) {
      res.send("Error: ", err);
    }
    res.send(response);
  });
});

app.get('/api/inventory/:id', function (req, res) {
  db.products.findOne({id: req.params.id}, function (err, response) {
    if (err) {
      res.send("Error: ", err);
    }
    res.send(response);
  });
});

app.put('/pwd/:id', userCtrl.updatePwd)
app.put('/account/update/:id', userCtrl.update)

app.post('/register', userCtrl.register);
app.post('/account', userCtrl.createUser)
app.get('/user', userCtrl.read);
app.get('/me', isAuthed, userCtrl.me);
app.get('/account', isAuthed, userCtrl.read)

//Products in cart
app.post('/api/add/item/cart/:cartid', cartCtrl.addToCart)
app.delete('/api/delete/item/cart/:productid', cartCtrl.deleteCartItem)
app.get('/api/cart', isAuthed, cartCtrl.getUserOrder)

//order
app.put('/api/order/complete/:orderid/:userid', cartCtrl.completeOrder, cartCtrl.createOrder)


// app.put('/model/:id', modelCtrl.update);
// app.delete('/model/:id', modelCtrl.delete);

var port = config.PORT
app.listen(port, function() {
  console.log('listening on port ', port);
});
