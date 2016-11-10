// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("cartService", function($http, $state) {
  // CRUD FUNCTIONS
  // ============================================================

  this.getUserOrder = function () {
    return $http ({
      method: "GET",
      url: '/api/cart'
    })
    .then(function(response) {
      return response
    })
    .catch(function(err) {
      console.log(err);
    });
  };

  this.addToCart = function (id, productid, qty) {
    return $http({
      method: "POST",
      url:'/api/add/item/cart/' + id,
      data: {
        id: productid,
        qty: qty
      }
    });
  };

  this.removeFromCart = function (id) {
    return $http({
      method: 'DELETE',
      url:'/api/delete/item/cart/' + id
    });
  };

  this.placeOrder = function (id, orderid) {
    return $http({
      method: "PUT",
      url: '/api/order/complete/' + orderid + "/" + id
    })
  }

  // OTHER FUNCTIONS
  // ============================================================

});
