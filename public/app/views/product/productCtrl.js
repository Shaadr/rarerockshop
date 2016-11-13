// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("productCtrl", function($scope, product, cartService, $state) {

$scope.product = product;
$scope.qty = 1;

$scope.getCart = function () {
  cartService.getUserOrder()
  .then(function(response) {

    if (response) {
      $scope.orderid = response.data.order.id
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
    alert('Item Added to Cart')
  })
}

});
