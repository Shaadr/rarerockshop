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
      console.log(response);
      return response;
    });
  };

  this.editUser = function () {

  }

})
