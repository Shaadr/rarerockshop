// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("collectionService", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.getInventory = function () {
    return $http({
      method: "GET",
      url: '/api/inventory'
    });
  };

  this.getInventoryById = function () {
    return $http({
      method: "GET",
      url: '/api/inventory/' + id
    });
  };

});
