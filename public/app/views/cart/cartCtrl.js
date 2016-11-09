// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("cartCtrl", function($scope, cart, user, $state, cartService) {
  // VARIABLES
  // ============================================================
  $scope.cart = cart.data.cart
  $scope.products = cart.data.products
  $scope.id = $state.params.id;
  $scope.user = user;


  // FUNCTIONS
  // ============================================================

  // $scope.subTotal = function () {
  //   console.log('products: '+$scope.products);
  //   $scope.sTotal = 0;
  //   for (var i=0; i < $scope.products.length; i++) {
  //     $scope.sTotal += $scope.product[i].price
  //   }
  //   return $scope.sTotal;
  // }
});
