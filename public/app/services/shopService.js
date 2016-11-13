// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("shopService", function($http) {

  this.getShopInventory = function() {
    return $http({
      method: 'GET',
      url: '/api/shop/inventory'
    });
  };

  this.getCollectionInventory = function() {
    return $http({
      method: 'GET',
      url: '/api/collection/inventory'
    });
  };

  this.getInventoryById = function(id) {
    return $http({
      method: 'GET',
      url: '/api/inventory/' + id
    });
  };

});
