angular.module("rrs").directive('selectFix', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                if ( value === null ) {
                    value = '';
                }
                return value;
            });
        }
    };
});
