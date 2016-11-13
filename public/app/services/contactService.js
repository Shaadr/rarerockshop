// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("contactService", function($http) {
  // CRUD FUNCTIONS
  // ============================================================

    this.sendMail = function (firstname, lastname, email, phone, message) {
      return $http({
        method: 'POST',
        url: '/contact-form',
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone,
          message: message
        }
      }).then(function(response) {
        return response
      }).catch(function(err) {
        console.log('contactService err: ' + err);
      });
    }
  // OTHER FUNCTIONS
  // ============================================================

});
