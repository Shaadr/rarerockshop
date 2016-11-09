// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("cartCtrl", function($scope, cart, $state, cartService) {
  // VARIABLES
  // ============================================================
  $scope.cart = cart.data.cart
  $scope.products = cart.data.products
  $scope.id = $state.params.id;


  // FUNCTIONS
  // ============================================================


});
