// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("shopService", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.getShop = function(id) {
    var query = "";
    if (id) query = '?_id=' + id;
    return $http({
      method: 'GET',
      url: '/shop' + query
    }).then(function(response) {
      if (response.data.length < 2) return response.data[0];
      return response.data;
    });
  };
  this.createShop = function(shop) {
    return $http({
      method: 'POST',
      url: '/shop',
      data: shop
    }).then(function(response) {
      return response;
    });
  };
  this.editShop = function(id, shop) {
    return $http({
      method: 'PUT',
      url: "/shop/" + id,
      data: shop
    }).then(function(response) {
      return response;
    });
  };
  this.deleteShop = function(id) {
    return $http({
      method: 'DELETE',
      url: '/shop/' + id
    }).then(function(response) {
      return response;
    });
  };
  // OTHER FUNCTIONS
  // ============================================================
  
});
