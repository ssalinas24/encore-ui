/**
 * @ngdoc overview
 * @name rxAttributes
 * @description
 * # rxAttributes Component
 *
 * [TBD]
 *
 * ## Directives
 * * {@link rxAttributes.directive:rxAttributes rxAttributes}
 */
angular.module('encore.ui.rxAttributes', [])
/**
 * @ngdoc directive
 * @name rxAttributes.directive:rxAttributes
 * @restrict E
 * @description [TBD]
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
