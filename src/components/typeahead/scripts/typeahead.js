angular.module('encore.ui.typeahead')
.config(function ($provide) {
    $provide.decorator('typeaheadDirective', function ($delegate, $filter) {
        var typeahead = $delegate[0];
        var link = typeahead.link;
        var lowercase = $filter('lowercase');

        typeahead.compile = function () {
            return function (scope, element, attrs, ctrls) {
                var ngModelCtrl = ctrls[0];
                link.apply(this, arguments);

                if (/allowEmpty/.test(attrs.typeahead)) {
                    var EMPTY_KEY = '$EMPTY$';

                    // Wrap the directive's $parser such that the $viewValue
                    // is not empty when the function runs.
                    ngModelCtrl.$parsers.unshift(function ($viewValue) {
                        var value = _.isEmpty($viewValue) ? EMPTY_KEY : $viewValue;
                        // The directive will check this equality before populating the menu.
                        ngModelCtrl.$viewValue = value;
                        return value;
                    });

                    ngModelCtrl.$parsers.push(function ($viewValue) {
                        return $viewValue === EMPTY_KEY ? '' : $viewValue;
                    });

                    element.on('click', function () {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue);
                        });
                    });

                    scope.allowEmpty = function (actual, expected) {
                        if (expected === EMPTY_KEY) {
                            return true;
                        }
                        return lowercase(actual).indexOf(lowercase(expected)) !== -1;
                    };
                }
            };
        };

        return $delegate;
    });
});
