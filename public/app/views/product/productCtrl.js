// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("productCtrl", function($scope, product, cartService, $state) {

$scope.product = product;
console.log(product);
$scope.qty = 1;

$scope.getCart = function () {
  cartService.getUserOrder()
  .then(function(response) {
    console.log(response);

    if (response) {
      $scope.orderid = response.data.order.id
      console.log($scope.orderid);
    } else {
      $scope.orderid = null;
    }
  });
}
$scope.getCart();

$scope.addToCart = function (id, productid, qty) {
  if (!$scope.orderid) {
    return alert('Please login before adding an item');
  }
  cartService.addToCart(id, productid, qty)
  .then(function (response) {
    console.log(response.data)
  })
}

});
