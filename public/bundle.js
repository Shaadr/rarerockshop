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
      url: '/collection'
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

angular.module("rrs").directive('selectFix', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                if ( value === null ) {
                    value = '';
                }
                console.log(value);
                return value;
            });
        }
    };
});

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

// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("cartService", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.getCart = function(id) {
    var query = "";
    if (id) query = '?_id=' + id;
    return $http({
      method: 'GET',
      url: '/cart' + query
    }).then(function(response) {
      if (response.data.length < 2) return response.data[0];
      return response.data;
    });
  };
  this.createCart = function(cart) {
    return $http({
      method: 'POST',
      url: '/cart',
      data: cart
    }).then(function(response) {
      return response;
    });
  };
  this.editCart = function(id, cart) {
    return $http({
      method: 'PUT',
      url: "/cart/" + id,
      data: cart
    }).then(function(response) {
      return response;
    });
  };
  this.deleteCart = function(id) {
    return $http({
      method: 'DELETE',
      url: '/cart/' + id
    }).then(function(response) {
      return response;
    });
  };
  // OTHER FUNCTIONS
  // ============================================================

});

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

// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("userService", function($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.getUser = function(id) {
    var query = "";
    if (id) query = '?_id=' + id;
    return $http({
      method: 'GET',
      url: '/user' + query
    }).then(function(response) {
      if (response.data.length < 2) return response.data[0];
      return response.data;
    });
  };
  this.createUser = function(user) {
    return $http({
      method: 'POST',
      url: '/user',
      data: user
    }).then(function(response) {
      return response;
    });
  };
  this.editUser = function(id, user) {
    return $http({
      method: 'PUT',
      url: "/user/" + id,
      data: user
    }).then(function(response) {
      return response;
    });
  };
  this.deleteUser = function(id) {
    return $http({
      method: 'DELETE',
      url: '/user/' + id
    }).then(function(response) {
      return response;
    });
  };
  // OTHER FUNCTIONS
  // ============================================================
  
});

angular.module('rrs')
  .directive('headerDirective', function() {
    return {
      restrict: 'EA',
      templateUrl: './app/directives/header/headerTmpl.html',
      // link ,
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
angular.module("rrs").controller("cartCtrl", function($scope) {
  // VARIABLES
  // ============================================================

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

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("orderSuccessCtrl", function($scope) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
});

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("productCtrl", function($scope, product) {

$scope.product = product;

});

angular.module("rrs").controller("shopCtrl", function($scope, products) {

    $scope.products = products;

    $scope.search = "";

});
