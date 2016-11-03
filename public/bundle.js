// INITILIZE APP
// ============================================================
angular.module('rrs', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');


  $stateProvider
    .state('home', {
      templateUrl: './app/views/home/home.html',
      // controller: 'homeCtrl',
      url: '/'
    })
    .state('about', {
      templateUrl: './app/views/about/about.html',
      // controller: 'aboutCtrl',
      url: '/about'
    })
    .state('admin', {
      templateUrl: './app/views/admin/admin.html',
      controller: 'adminCtrl',
      url: '/admin'
    })
    .state('cart', {
      templateUrl: './app/views/cart/cart.html',
      // controller: 'cartCtrl',
      url: '/cart'
    })
    .state('collection', {
      templateUrl: './app/views/collection/collection.html',
      // controller: 'collectionCtrl',
      url: '/collection'
    })
    .state('contact', {
      templateUrl: './app/views/contact/contact.html',
      // controller: 'contactCtrl',
      url: '/contact/'
    })
    .state('lapidary', {
      templateUrl: './app/views/lapidary/lapidary.html',
      // controller: 'lapidaryCtrl',
      url: '/lapidary'
    })
    .state('login', {
      templateUrl: './app/views/login/login.html',
      // controller: 'loginCtrl',
      url: '/login'
    })
    .state('orderSuccess', {
      templateUrl: './app/views/orderSuccess/orderSuccess.html',
      // controller: 'orderSuccessCtrl',
      url: '/ordersuccess'
    })
    .state('product', {
      templateUrl: './app/views/product/product.html',
      // controller: 'productCtrl',
      url: '/product'
    })
    .state('shop', {
      templateUrl: './app/views/shop/shop.html',
      // controller: 'shopCtrl',
      url: '/shop'
    })
    .state('account', {
      templateUrl: './app/views/account/account.html',
      controller: 'accountCtrl',
      url: '/account',
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

angular.module('rrs').service('authService', function ($http) {

  this.login = function (user) {
    return $http({
      method:'post',
      url:'/login',
      data: user
    }).then(function (response) {
      return response;
    });
  };

  this.logout = function () {
    return $http({
      method: 'get',
      url: '/logout',
    }).then(function (response) {
      return response;
    });
  };

  this.getCurrentUser = function() {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function(response) {
      return response;
    });
  };

  this.registerUser = function (user) {
    return $http({
      method: 'post',
      url: '/register',
      data: user
    }).then(function (response) {
      return response;
    });
  };

  this.editUser = function () {

  }

})

angular.module('rrs')
  .directive('footerDirective', function() {
    return {
      restrict: 'EA',
      templateUrl: './app/directives/footer/footerTmpl.html',
      // link ,
    }
  })

angular.module('rrs')
  .directive('headerDirective', function() {
    return {
      restrict: 'EA',
      templateUrl: './app/directives/header/headerTmpl.html',
      // link ,
    }
  })



// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("aboutCtrl", function($scope) {
  // VARIABLES
  // ============================================================
  
  // FUNCTIONS
  // ============================================================
});

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("accountCtrl", function($scope) {
  // VARIABLES
  // ============================================================
  $scope.getUsers = function() {
      
  }
  // FUNCTIONS
  // ============================================================
});

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("adminCtrl", function($scope) {
  // VARIABLES
  // ============================================================
  $scope.url = null;

  // FUNCTIONS
  // ============================================================
  $scope.getImageUrl = function (event) {
  var file = document.querySelector('input[type=file]').files[0];
    console.log(file);

  };
});

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("cartCtrl", function($scope) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
});

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("collectionCtrl", function($scope) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
});

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("contactCtrl", function($scope) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
});

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("homeCtrl", function($scope) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
});

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("lapidaryCtrl", function($scope) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
});

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("loginCtrl", function($scope, authService, $state) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================

    $scope.login = function (user) {
      authService.login(user).then(function (response) {
        if(!response.data) {
          alert('User does not exist');
          $scope.user.password = '';
        } else {
          $state.go('account');
        }
      }).catch(function (err) {
        alert('Unable to login');
      });
    };

    $scope.register = function (user) {
      authService.registerUser(user).then(function (response) {
        if(!response.data) {
          alert('Unable to create user');
        } else {
          alert('User Created!');
          $scope.newUser = {};
        }
      }).cath(function (err) {
        alert('Unable to create User')
      });
    };

});
