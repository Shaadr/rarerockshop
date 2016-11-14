var app = require('./../server');
var db = app.get('db')
var config = require('./../config')
var nodemailer = require('nodemailer');
var emailTemplate = require('./../services/emailSetup');

var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.GMAILUSER,
    pass: config.GMAILPASS
  }
});

module.exports = {
  sendMessage: function (req, res, next) {
    var data = req.body;
    if(!data.phone){
      data.phone = "N/A"
    }

    var mailOptions = {
      from: data.email, // sender address
      to: config.GMAILADDRESS, // list of receivers
      subject: 'Hello from ' + data.firstname + ' ' + data.lastname, // Subject line
      // text: 'DO NOT RESPOND TO THIS EMAIL!  Phone: '+ data.phone  +' Message: ' + data.message  + ' From: ' + data.email, // plaintext body
      html: emailTemplate(data.firstname, data.lastname, data.phone, data.email, data.message)
      };

    transporter.sendMail(mailOptions, function(err, info){
      if (err){
        console.log(err);
        return res.status(500).send(err)
      }else{
        res.status(200)
        .send ('Message sent: ' + info.response)

      };
    });

    // res.send(data)

  }



}
