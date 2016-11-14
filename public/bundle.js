// INITILIZE APP
// ============================================================
angular.module('rrs', ['ui.router', 'angular.filter']).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    templateUrl: './app/views/home/home.html',
    controller: 'homeCtrl',
    url: '/'
  }).state('about', {
    templateUrl: './app/views/about/about.html',
    controller: 'aboutCtrl',
    url: '/about'
  }).state('admin', {
    templateUrl: './app/views/admin/admin.html',
    controller: 'adminCtrl',
    url: '/admin'
  }).state('cart', {
    templateUrl: './app/views/cart/cart.html',
    controller: 'cartCtrl',
    url: '/cart/:id',
    resolve: {
      cart: ["cartService", "$stateParams", function (cartService, $stateParams) {
        return cartService.getUserOrder();
      }],
      user: ["authService", "$state", function (authService, $state) {
        return authService.getCurrentUser().then(function (response) {
          if (!response.data) $state.go('login');
          return response.data;
        }).catch(function (err) {
          $state.go('login');
        });
      }]
      // orders: function (cartService, $stateParams) {
      //   return cartService.getOrders
      // }
    }
  }).state('collection', {
    templateUrl: './app/views/collection/collection.html',
    controller: 'collectionCtrl',
    url: '/collection',
    resolve: {
      products: ["shopService", function (shopService) {
        return shopService.getCollectionInventory().then(function (response) {
          return response.data;
        });
      }]
    }
  }).state('contact', {
    templateUrl: './app/views/contact/contact.html',
    controller: 'contactCtrl',
    url: '/contact/',
    resolve: {
      user: ["authService", "$state", function (authService, $state) {
        return authService.getCurrentUser().then(function (response) {
          if (!response.data) $state.go('login');
          return response.data;
        }).catch(function (err) {
          $state.go('login');
        });
      }]
    }
  }).state('lapidary', {
    templateUrl: './app/views/lapidary/lapidary.html',
    controller: 'lapidaryCtrl',
    url: '/lapidary'
  }).state('login', {
    templateUrl: './app/views/login/login.html',
    controller: 'loginCtrl',
    url: '/login'
  }).state('orderSuccess', {
    templateUrl: './app/views/orderSuccess/orderSuccess.html',
    controller: 'orderSuccessCtrl',
    url: '/ordersuccess'
  }).state('product', {
    templateUrl: './app/views/product/product.html',
    controller: 'productCtrl',
    url: '/product/:id',
    resolve: {
      product: ["shopService", "$stateParams", function (shopService, $stateParams) {
        return shopService.getInventoryById($stateParams.id).then(function (response) {
          return response.data;
        });
      }]
      // products: function (productService, $state) {
      //   return productService.getProducts()
      // }
    }
  }).state('shop', {
    templateUrl: './app/views/shop/shop.html',
    controller: 'shopCtrl',
    url: '/shop',
    resolve: {
      products: ["shopService", function (shopService) {
        return shopService.getShopInventory().then(function (response) {
          return response.data;
        });
      }]
    }
  }).state('account', {
    templateUrl: './app/views/account/account.html',
    controller: 'accountCtrl',
    url: '/account/:id/:orderid',
    resolve: {
      user: ["authService", "$state", function (authService, $state) {
        return authService.getCurrentUser().then(function (response) {
          if (!response.data) $state.go('login');
          return response.data;
        }).catch(function (err) {
          $state.go('login');
        });
      }]
      // orderHistory: function (cartService, $stateParams) {
      //   return cartService.getOrderHistory();
      // }
    }
  });
}]);
angular.module("rrs").directive('selectFix', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                if (value === null) {
                    value = '';
                }
                return value;
            });
        }
    };
});
// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("accountService", ["$http", function ($http) {
  // CRUD FUNCTIONS
  // ============================================================

  this.updateUsername = function (id, username) {
    return $http({
      method: 'PUT',
      url: '/account/update/' + id,
      data: { username: username }
    }).then(function (response) {
      alert('Username successfully updated. Please Re-Login');
      return response;
    });
  };

  this.updatePwd = function (id, password) {
    return $http({
      method: 'PUT',
      url: '/pwd/' + id,
      data: { password: password }
    }).then(function (response) {
      alert('Password successfully updated. Please Re-Login');
      return response;
    });
  };
  // this.deleteUser = function(id) {
  //   return $http({
  //     method: 'DELETE',
  //     url: '/user' + id
  //   }).then(function(response) {
  //     return response;
  //   });
  // };
  // OTHER FUNCTIONS
  // ============================================================
}]);
angular.module('rrs').service('authService', ["$http", function ($http) {

  this.login = function (user) {
    return $http({
      method: 'post',
      url: '/login',
      data: user
    }).then(function (response) {
      return response;
    });
  };

  this.logout = function () {
    return $http({
      method: 'get',
      url: '/logout'
    }).then(function (response) {
      return response;
    });
  };

  this.getCurrentUser = function () {
    return $http({
      method: 'GET',
      url: '/me'
    }).then(function (response) {
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

  this.editUser = function () {};
}]);
// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("cartService", ["$http", "$state", function ($http, $state) {
  // CRUD FUNCTIONS
  // ============================================================

  this.getUserOrder = function () {
    return $http({
      method: "GET",
      url: '/api/cart'
    }).then(function (response) {
      return response;
    }).catch(function (err) {
      console.log(err);
    });
  };

  this.addToCart = function (id, productid, qty) {
    return $http({
      method: "POST",
      url: '/api/add/item/cart/' + id,
      data: {
        id: productid,
        qty: qty
      }
    });
  };

  this.removeFromCart = function (id) {
    return $http({
      method: 'DELETE',
      url: '/api/delete/item/cart/' + id
    });
  };

  this.placeOrder = function (id, orderid) {
    return $http({
      method: "PUT",
      url: '/api/order/complete/' + orderid + "/" + id
    });
  };

  // OTHER FUNCTIONS
  // ============================================================
}]);
// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("collectionService", ["$http", function ($http) {
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
}]);
// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("contactService", ["$http", function ($http) {
  // CRUD FUNCTIONS
  // ============================================================

  this.sendMail = function (firstname, lastname, email, phone, message) {
    return $http({
      method: 'POST',
      url: '/contact-form',
      data: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        message: message
      }
    }).then(function (response) {
      return response;
    }).catch(function (err) {
      console.log('contactService err: ' + err);
    });
  };
  // OTHER FUNCTIONS
  // ============================================================
}]);
// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("ProductsService", ["$http", function ($http) {
  // CRUD FUNCTIONS
  // ============================================================
  this.getProducts = function () {
    return $http({
      method: "GET",
      url: "/api/products"
    });
  };
  // OTHER FUNCTIONS
  // ============================================================
}]);
// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("shopService", ["$http", function ($http) {

  this.getShopInventory = function () {
    return $http({
      method: 'GET',
      url: '/api/shop/inventory'
    });
  };

  this.getCollectionInventory = function () {
    return $http({
      method: 'GET',
      url: '/api/collection/inventory'
    });
  };

  this.getInventoryById = function (id) {
    return $http({
      method: 'GET',
      url: '/api/inventory/' + id
    });
  };
}]);
angular.module('rrs').directive('footerDirective', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/footer/footerTmpl.html'
  };
});
angular.module('rrs').directive('headerDirective', function () {
  return {
    restrict: 'EA',
    templateUrl: './app/directives/header/headerTmpl.html'
  };
});

// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("aboutCtrl", ["$scope", function ($scope) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
}]);
// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("accountCtrl", ["$scope", "user", "cartService", "accountService", "$state", function ($scope, user, cartService, accountService, $state) {
  // VARIABLES
  // ============================================================

  // $scope.order = orderHistory
  $scope.user = user;

  $scope.updateUsername = function (id, username) {
    accountService.updateUsername(id, username).then(function (response) {
      $state.go('login');
    });
  };

  $scope.updatePwd = function (id, password) {
    accountService.updatePwd(id, password).then(function (response) {
      $state.go('login');
    });
  };

  $scope.getCart = function () {
    cartService.getUserOrder().then(function (response) {
      $scope.order = response.data.order;
      $scope.products = response.data.products;
    });
  };

  $scope.getCart();

  //  $scope.getOrderHistory = function () {
  //
  //  }


  // FUNCTIONS
  // ============================================================
}]);
// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("adminCtrl", ["$scope", function ($scope) {
  // VARIABLES
  // ============================================================
  $scope.url = null;

  // FUNCTIONS
  // ============================================================
  $scope.getImageUrl = function (event) {
    var file = document.querySelector('input[type=file]').files[0];
  };
}]);
// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("cartCtrl", ["$scope", "cart", "user", "$state", "cartService", function ($scope, cart, user, $state, cartService) {
  // VARIABLES
  // ============================================================
  $scope.cart = cart.data.cart;
  $scope.products = cart.data.products;
  $scope.id = $state.params.id;
  $scope.user = user;
  $scope.tax = 0.067;
  $scope.shipping = 5;

  // FUNCTIONS
  // ============================================================
  $scope.subTotal = function () {
    $scope.sTotal = 0;
    for (var i = 0; i < $scope.products.length; i++) {
      $scope.sTotal += $scope.products[i].price;
    }
    return $scope.sTotal;
  }();

  $scope.grandTotal = function () {
    $scope.gTotal = 0;
    $scope.gTotal = $scope.sTotal + $scope.sTotal * $scope.tax + $scope.shipping;
    $scope.gTotal = +$scope.gTotal.toFixed(2);
    if ($scope.subTotal === 0) {
      $scope.shipping = 0;
      $scope.gTotal = 0;
      return $scope.gTotal;
    } else {
      return $scope.gTotal;
    }
  }();

  $scope.getOrder = function () {
    cartService.getUserOrder($scope.id).then(function (response) {
      $scope.cart = response.data.cart;
      $scope.products = response.data.products;
      $scope.sTotal = 0;
      for (var i = 0; i < $scope.products.length; i++) {
        $scope.sTotal += $scope.products[i].price;
      }
      $scope.gTotal = $scope.sTotal + $scope.sTotal * $scope.tax + $scope.shipping;
      $scope.gTotal = $scope.gTotal.toFixed(2);
      if ($scope.sTotal === 0) {
        $scope.shipping = 0;
        $scope.gTotal = 0;
        return $scope.gTotal;
      } else {
        return $scope.gTotal;
      }
    });
  };

  $scope.removeFromCart = function (id) {
    cartService.removeFromCart(id).then(function (response) {
      $scope.getOrder();
      alert('Item Successfully Removed');
    });
  };

  $scope.placeOrder = function (id, orderid) {
    // cartService.placeOrder(id, orderid)
    // 	.then(function(response) {
    // 		$state.go('orderSuccess');
    // 	});
  };
}]);
// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("collectionCtrl", ["$scope", "products", function ($scope, products) {
  // VARIABLES
  // ============================================================
  $scope.products = products;
  // FUNCTIONS
  // ============================================================
}]);
// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("contactCtrl", ["$scope", "user", "contactService", "$state", function ($scope, user, contactService, $state) {
  // VARIABLES
  // ============================================================
  $scope.users = user;

  $scope.sendMail = function (firstname, lastname, email, phone, message) {
    if (!phone || phone && /[-()]/.test(phone) && (phone.length === 12 || phone.length === 13 || phone.length === 14)) {
      console.log('made it out');
      contactService.sendMail(firstname, lastname, email, phone, message).then(function (response) {
        $scope.message = response.message;
        alert('Message Successfully Sent! Thank you!');
        $state.go('home');
      });
    } else {
      alert("Invalid Phone Number. Use Format: (888)888-8888 or 888-888-8888");
      return;
    }
  };

  // FUNCTIONS
  // ============================================================
}]);
// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("homeCtrl", ["$scope", function ($scope) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
}]);
// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("lapidaryCtrl", ["$scope", function ($scope) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
}]);
// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("loginCtrl", ["$scope", "authService", "$state", function ($scope, authService, $state) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================

  $scope.login = function (user) {
    authService.login(user).then(function (response) {
      if (!response.data) {
        alert('User does not exist');
        $scope.user.password = '';
      } else {
        $state.go('account', { id: response.data.id });
      }
    }).catch(function (err) {
      alert('Unable to login');
    });
  };

  $scope.register = function (user) {
    authService.registerUser(user).then(function (response) {
      if (!response.data) {
        alert('Unable to create user');
      } else {
        alert('User Created!');
        $scope.newUser = {};
      }
    }).catch(function (err) {
      alert('Unable to create User');
    });
  };
}]);
// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("orderSuccessCtrl", ["$scope", function ($scope) {
  // VARIABLES
  // ============================================================

  // FUNCTIONS
  // ============================================================
}]);
// INITILIZE CONTROLLER
// ============================================================
angular.module("rrs").controller("productCtrl", ["$scope", "product", "cartService", "$state", function ($scope, product, cartService, $state) {

  $scope.product = product;
  $scope.qty = 1;

  $scope.getCart = function () {
    cartService.getUserOrder().then(function (response) {

      if (response) {
        $scope.orderid = response.data.order.id;
      } else {
        $scope.orderid = null;
      }
    });
  };
  $scope.getCart();

  $scope.addToCart = function (id, productid, qty) {
    if (!$scope.orderid) {
      return alert('Please login before adding an item');
    }
    cartService.addToCart(id, productid, qty).then(function (response) {
      alert('Item Added to Cart');
    });
  };
}]);
angular.module("rrs").controller("shopCtrl", ["$scope", "products", function ($scope, products) {

    $scope.products = products;
    $scope.search = "";
}]);