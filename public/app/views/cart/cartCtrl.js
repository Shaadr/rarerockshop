// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("cartCtrl", function($scope, cart, user, $state, cartService) {
  // VARIABLES
  // ============================================================
  $scope.cart = cart.data.cart;
  $scope.products = cart.data.products;
  $scope.id = $state.params.id;
  $scope.user = user;
  $scope.tax = 0.067;
  $scope.shipping = 5;


  // FUNCTIONS
  // ============================================================
  $scope.subTotal = function () {
    $scope.sTotal = 0;
    for (var i=0; i < $scope.products.length; i++) {
      $scope.sTotal += $scope.products[i].price;
    }
    return $scope.sTotal;
  }()

  $scope.grandTotal = function () {
    console.log("inside gtotal");
    $scope.gTotal = 0;
    $scope.gTotal = $scope.sTotal + ($scope.sTotal * $scope.tax) + $scope.shipping
    $scope.gTotal = +$scope.gTotal.toFixed(2);
    if ($scope.subTotal === 0) {
      $scope.shipping = 0
      $scope.gTotal = 0
      return $scope.gTotal
    }else {
      return $scope.gTotal

    }
  }()

  $scope.getOrder = function () {
    cartService.getUserOrder($scope.id)
    .then(function(response) {
      $scope.cart = response.data.cart;
      $scope.products = response.data.products;
      $scope.sTotal = 0;
      for (var i=0; i < $scope.products.length; i++) {
        $scope.sTotal += $scope.products[i].price;
      }
      $scope.gTotal = $scope.sTotal + ($scope.sTotal * $scope.tax) + $scope.shipping
      $scope.gTotal = $scope.gTotal.toFixed(2);
      console.log($scope.gTotal);
      if ($scope.sTotal === 0) {
        $scope.shipping = 0
        $scope.gTotal = 0
        return $scope.gTotal
      }else {
        return $scope.gTotal
    }

      });
  }

  $scope.removeFromCart = function (id) {
    cartService.removeFromCart(id)
    .then(function(response) {
      $scope.getOrder();
    });
  };

  $scope.placeOrder = function(id, orderid) {
    console.log(id);
    console.log(orderid);
			// cartService.placeOrder(id, orderid)
			// 	.then(function(response) {
			// 		$state.go('orderSuccess');
			// 	});
		};

  });
