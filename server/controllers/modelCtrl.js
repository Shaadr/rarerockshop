var app = require('./../server')
var db = app.get('db')

module.exports = {
  read: function (req,res) {
    db.get_users(function(err,users) {
      res.status(200).json(users)

    })
  }
}
