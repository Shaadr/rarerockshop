// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("contactCtrl", function($scope, user, contactService, $state) {
  // VARIABLES
  // ============================================================
  $scope.users = user;


  $scope.sendMail = function (firstname, lastname, email, phone, message) {
    if(!phone || (phone && /[-()]/.test(phone) && (phone.length === 12 || phone.length === 13 || phone.length === 14))){
        console.log('made it out');
        contactService.sendMail(firstname, lastname, email, phone, message).then(function(response) {
          $scope.message = response.message
          alert('Message Successfully Sent! Thank you!')
          $state.go('home')
        });
    } else {
      alert("Invalid Phone Number. Use Format: (888)888-8888 or 888-888-8888")
      return
    }
  }

  // FUNCTIONS
  // ============================================================
});
