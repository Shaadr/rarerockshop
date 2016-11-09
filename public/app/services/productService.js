// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("ProductsService", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
    this.getProducts = function () {
      return $http ({
        method: "GET",
        url: "/api/products"
      });
    };
  // OTHER FUNCTIONS
  // ============================================================

});
