// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("accountCtrl", function($scope, user, cartService, accountService, $state) {
  // VARIABLES
  // ============================================================

  // $scope.order = orderHistory
  $scope.user = user

  $scope.updateUsername = function (id, username) {
    accountService.updateUsername(id, username)
    .then(function(response) {
      $state.go('login');
    });
  }

  $scope.updatePwd = function (id, password) {
    accountService.updatePwd(id, password)
    .then(function(response) {
      $state.go('login');
    });
  }

  $scope.getCart = function () {
    cartService.getUserOrder().then(function(response) {
      $scope.order = response.data.order
      $scope.products = response.data.products
    });
  }

  $scope.getCart();

  //  $scope.getOrderHistory = function () {
   //
  //  }



  // FUNCTIONS
  // ============================================================
});
