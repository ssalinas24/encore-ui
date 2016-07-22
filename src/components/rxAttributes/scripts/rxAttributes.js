angular.module('encore.ui.rxAttributes')
/**
 * @ngdoc directive
 * @name rxAttributes.directive:rxAttributes
 * @restrict A
 * @description
 *
 * This drective allows you to add attributes based on a value in scope being defined or not.
 *
 * @param {Object} rxAttributes an attribute allows you to add custom attributes
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
