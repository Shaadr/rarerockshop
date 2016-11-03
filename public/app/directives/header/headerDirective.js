angular.module('rrs')
  .directive('headerDirective', function() {
    return {
      restrict: 'EA',
      templateUrl: './app/directives/header/headerTmpl.html',
      // link ,
    }
  })
