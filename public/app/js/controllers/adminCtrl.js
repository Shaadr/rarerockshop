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
