// REQUIRE DEPENDENCIES
// ============================================================
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var massive = require('massive');

var app = module.exports = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))
var massiveServer = massive.connectSync({
  connectionString: 'postgress://localhost/RRS'
})
app.set('db', massiveServer)// MUST come after app = express()
var db = app.get('db')
var modelCtrl = require('./controllers/modelCtrl');

app.get('/account', modelCtrl.read);
// app.post('/model', modelCtrl.create);
// app.put('/model/:id', modelCtrl.update);
// app.delete('/model/:id', modelCtrl.delete);

var port = 3002;


app.listen(port, function() {
  console.log('listening on port ', port);
});
