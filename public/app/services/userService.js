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
