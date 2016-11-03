// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("cartService", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.getCart = function(id) {
    var query = "";
    if (id) query = '?_id=' + id;
    return $http({
      method: 'GET',
      url: '/cart' + query
    }).then(function(response) {
      if (response.data.length < 2) return response.data[0];
      return response.data;
    });
  };
  this.createCart = function(cart) {
    return $http({
      method: 'POST',
      url: '/cart',
      data: cart
    }).then(function(response) {
      return response;
    });
  };
  this.editCart = function(id, cart) {
    return $http({
      method: 'PUT',
      url: "/cart/" + id,
      data: cart
    }).then(function(response) {
      return response;
    });
  };
  this.deleteCart = function(id) {
    return $http({
      method: 'DELETE',
      url: '/cart/' + id
    }).then(function(response) {
      return response;
    });
  };
  // OTHER FUNCTIONS
  // ============================================================

});
