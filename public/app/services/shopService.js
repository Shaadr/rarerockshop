// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("shopService", function($http) {

  this.getInventory = function() {
    return $http({
      method: 'GET',
      url: '/api/inventory'
    });
  };

  this.getInventoryById = function(id) {
    return $http({
      method: 'GET',
      url: '/api/inventory/' + id
    });
  };

});
