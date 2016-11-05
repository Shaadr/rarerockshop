// INITILIZE APP
// ============================================================
angular.module('rrs', ['ui.router', 'angular.filter'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');


  $stateProvider
    .state('home', {
      templateUrl: './app/views/home/home.html',
      controller: 'homeCtrl',
      url: '/'
    })
    .state('about', {
      templateUrl: './app/views/about/about.html',
      controller: 'aboutCtrl',
      url: '/about'
    })
    .state('admin', {
      templateUrl: './app/views/admin/admin.html',
      controller: 'adminCtrl',
      url: '/admin'
    })
    .state('cart', {
      templateUrl: './app/views/cart/cart.html',
      controller: 'cartCtrl',
      url: '/cart'
    })
    .state('collection', {
      templateUrl: './app/views/collection/collection.html',
      controller: 'collectionCtrl',
      url: '/collection',
      resolve: {
        products: function (shopService) {
          return shopService.getInventory().then(function(response) {
            return response.data;
          });
        }
      }
    })
    .state('contact', {
      templateUrl: './app/views/contact/contact.html',
      controller: 'contactCtrl',
      url: '/contact/'
    })
    .state('lapidary', {
      templateUrl: './app/views/lapidary/lapidary.html',
      controller: 'lapidaryCtrl',
      url: '/lapidary'
    })
    .state('login', {
      templateUrl: './app/views/login/login.html',
      controller: 'loginCtrl',
      url: '/login'
    })
    .state('orderSuccess', {
      templateUrl: './app/views/orderSuccess/orderSuccess.html',
      controller: 'orderSuccessCtrl',
      url: '/ordersuccess'
    })
    .state('product', {
      templateUrl: './app/views/product/product.html',
      controller: 'productCtrl',
      url: '/product/:id',
      resolve: {
        product: function (shopService, $stateParams) {
          console.log($stateParams);
          return shopService.getInventoryById($stateParams.id).then(function(response) {
            return response.data;
          });
        }
      }
    })
    .state('shop', {
      templateUrl: './app/views/shop/shop.html',
      controller: 'shopCtrl',
      url: '/shop',
      resolve: {
        products: function (shopService) {
          return shopService.getInventory().then(function(response) {
            return response.data;
          });
        }
      }
    })
    .state('account', {
      templateUrl: './app/views/account/account.html',
      controller: 'accountCtrl',
      url: '/account/:id',
      resolve: {
        user: function(authService, $state) {
          return authService.getCurrentUser()
            .then(function(response) {
              if (!response.data)
                $state.go('login');
              return response.data;
            })
            .catch(function(err) {
              $state.go('login');
            });
        }
      }
    });



  })
