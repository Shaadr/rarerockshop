// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("accountCtrl", function($scope, user, accountService, $state) {
  // VARIABLES
  // ============================================================

  $scope.user = user
  console.log(user);

  $scope.updateUsername = function (id, username) {
    console.log(username, id);
    accountService.updateUsername(id, username)
    .then(function(response) {
      console.log(response.data);
      $state.go('login');
    });
  }

  $scope.updatePwd = function (id, password) {
    console.log(password, id);
    accountService.updatePwd(id, password)
    .then(function(response) {
      $state.go('login');
    });
  }

  // FUNCTIONS
  // ============================================================
});
