angular.module('encore.ui.utilities')
/**
 * @ngdoc directive
 * @name utilities.directive:rxAttributes
 * @restrict A
 * @description
 *
 * This directive allows you to add attributes based on a value in scope being defined or not.
 *
 * @param {Object} rxAttributes an attribute allows you to add custom attributes
 *
 * ## Example
 *
 * <pre>
 * <div rx-attributes="{'my-custom-attr': customAttrVal, 'ng-click': noFunc}"
 *      ng-controller="myCtrl">
 * </div>
 *</pre>
 *
 * <pre>
 * angular.module('demoApp')
 * .controller('myCtrl', function ($scope) {
 *     $scope.customAttrVal = 'some value';
 * });
 * </pre>
 *
 * Given this code, if the scope only had `$scope.customAttrVal` set, only
 * `my-custom-attr` would be added to the component. Since noFunc was never
 * defined, `ng-click` isn't added.
 *
 * The output of the above code is:
 *
 * <pre>
 * <div my-custom-attr="some value" ng-controller="myCtrl"></div>
 * </pre>
 *
 * ## Value Format
 *
 * The value of `rx-attributes` follows the same object convention as
 * `ng-class`, in that it takes in an object to parse through. The object
 * follows this pattern:
 *
 * <pre>
 * {
 *     'attribute-name': scopeValue,
 *     'another-attribute-name': anotherScopeValue,
 * }
 * </pre>
 *
 */
.directive('rxAttributes', function ($parse, $compile) {
    // @see http://stackoverflow.com/questions/19224028/add-directives-from-directive-in-angularjs
    return {
        restrict: 'A',
        terminal: true,
        priority: 1000,
        compile: function (el, attrs) {
            return {
                pre: function preLink (scope, element) {
                    // run the attributes against the scope
                    var attributes = $parse(attrs.rxAttributes)(scope);

                    _.forIn(attributes, function (val, attr) {
                        // if the value exists in the scope, add/set the attribute
                        // otherwise, the attribute isn't added to the element
                        if (!_.isUndefined(val)) {
                            element.attr(attr, val);
                        }
                    });

                    //remove the attribute to avoid an indefinite loop
                    element.removeAttr('rx-attributes');
                    element.removeAttr('data-rx-attributes');

                    // build the new element
                    $compile(element)(scope);
                }
            };
        }
    };
});
