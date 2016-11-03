// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("ProductsService", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.getProducts = function(id) {
    var query = "";
    if (id) query = '?_id=' + id;
    return $http({
      method: 'GET',
      url: '/products' + query
    }).then(function(response) {
      if (response.data.length < 2) return response.data[0];
      return response.data;
    });
  };
  this.createProducts = function(products) {
    return $http({
      method: 'POST',
      url: '/products',
      data: products
    }).then(function(response) {
      return response;
    });
  };
  this.editProducts = function(id, products) {
    return $http({
      method: 'PUT',
      url: "/products/" + id,
      data: products
    }).then(function(response) {
      return response;
    });
  };
  this.deleteProducts = function(id) {
    return $http({
      method: 'DELETE',
      url: '/products/' + id
    }).then(function(response) {
      return response;
    });
  };
  // OTHER FUNCTIONS
  // ============================================================
    
});
