// INITILIZE APP
// ============================================================
angular.module('rrs', ['ui.router'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');


  $stateProvider
    .state('home', {
      templateUrl: '/views/home.html',
      // controller: 'homeCtrl',
      url: '/'
    })
    .state('about', {
      templateUrl: '/views/about.html',
      // controller: 'aboutCtrl',
      url: '/about'
    })
    .state('admin', {
      templateUrl: '/views/admin.html',
      // controller: 'adminCtrl',
      url: '/admin/:id'
    })
    .state('cart', {
      templateUrl: '/views/cart.html',
      // controller: 'cartCtrl',
      url: '/cart'
    })
    .state('collection', {
      templateUrl: '/views/collection.html',
      // controller: 'collectionCtrl',
      url: '/collection'
    })
    .state('contact', {
      templateUrl: '/views/contact.html',
      // controller: 'contactCtrl',
      url: '/contact/'
    })
    .state('lapidary', {
      templateUrl: '/views/lapidary.html',
      // controller: 'lapidaryCtrl',
      url: '/lapidary'
    })
    .state('login', {
      templateUrl: '/views/login.html',
      // controller: 'loginCtrl',
      url: '/login'
    })
    .state('orderSuccess', {
      templateUrl: '/views/orderSuccess.html',
      // controller: 'orderSuccessCtrl',
      url: '/ordersuccess'
    })
    .state('product', {
      templateUrl: '/views/product.html',
      // controller: 'productCtrl',
      url: '/product'
    })
    .state('shop', {
      templateUrl: '/views/shop.html',
      // controller: 'shopCtrl',
      url: '/shop'
    })
    .state('account', {
      templateUrl: '/views/account.html',
      controller: 'accountCtrl',
      url: '/account'
    })
  }])

angular.module('rrs')
  .directive('footerDirective', function() {
    return {
      restrict: 'EA',
      templateUrl: './views/templates/footerTmpl.html',
      // link ,
    }
  })

angular.module('rrs')
  .directive('headerDirective', function() {
    return {
      restrict: 'EA',
      templateUrl: './views/templates/headerTmpl.html',
      // link ,
    }
  })

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("accountCtrl", ["$scope", function($scope) {
  // VARIABLES
  // ============================================================
  $scope.getUsers = function() {
      
  }
  // FUNCTIONS
  // ============================================================
}]);

// INITILIZE CONTROLLER
// ============================================================
angular.module('rrs').controller("mainCtrl", ["$scope", function($scope) {
  // VARIABLES
  // ============================================================

  $scope.test = "testCtrl";

  // FUNCTIONS
  // ============================================================
}]);

// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("mainService", ["$http", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.getCollection = function(id) {
    var query = "";
    if (id) query = '?_id=' + id;
    return $http({
      method: 'GET',
      url: '/collection' + query
    }).then(function(response) {
      if (response.data.length < 2) return response.data[0];
      return response.data;
    });
  };
  this.createCollection = function(collection) {
    return $http({
      method: 'POST',
      url: '/collection',
      data: collection
    }).then(function(response) {
      return response;
    });
  };
  this.editCollection = function(id, collection) {
    return $http({
      method: 'PUT',
      url: "/collection/" + id,
      data: collection
    }).then(function(response) {
      return response;
    });
  };
  this.deleteCollection = function(id) {
    return $http({
      method: 'DELETE',
      url: '/collection/' + id
    }).then(function(response) {
      return response;
    });
  };
  // OTHER FUNCTIONS
  // ============================================================

}]);
