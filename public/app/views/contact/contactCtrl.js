// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("contactCtrl", function($scope, user, contactService, $state) {
  // VARIABLES
  // ============================================================
  $scope.users = user;

  $scope.sendMail = function (firstname, lastname, email, phone, message) {
    contactService.sendMail(firstname, lastname, email, phone, message).then(function(response) {
      $scope.message = response.message
      alert('Message Successfully Sent! Thank you!')
      $state.go('home')
    });
  }

  // FUNCTIONS
  // ============================================================
});
