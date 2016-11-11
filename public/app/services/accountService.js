// INITILIZE SERVICE
// ============================================================
angular.module("rrs").service("accountService", function($http) {
  // CRUD FUNCTIONS
  // ============================================================

  this.updateUsername = function(id, username) {
    console.log("THERVICE" + username, id);
    return $http({
      method: 'PUT',
      url: '/account/update/'+ id,
      data: {username: username}
    }).then(function(response) {
      alert('Username successfully updated. Please Re-Login')
      return response;
    });
  };

  this.updatePwd= function(id, password) {
    console.log("THERVICE" + password, id);
    return $http({
      method: 'PUT',
      url: '/pwd/'+ id,
      data: {password: password}
    }).then(function(response) {
      alert('Password successfully updated. Please Re-Login')
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

});
