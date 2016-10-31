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
      // controller: 'accountCtrl',
      url: '/account'
    })
  }])

// INITILIZE CONTROLLER
// ============================================================
angular.module('rrs').controller("mainCtrl", ["$scope", function($scope) {
  // VARIABLES
  // ============================================================

  $scope.test = "testCtrl";

  // FUNCTIONS
  // ============================================================
}]);

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

