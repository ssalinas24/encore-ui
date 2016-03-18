angular.module('encore.ui.rxEnvironment')
/**
 * @ngdoc directive
 * @name rxEnvironment.directive:rxEnvironment
 * @restrict A
 * @requires utilities.service:Environment
 * @description
 * Show or hide content based on environment name
 *
 * @example
 * <pre>
 * <div rx-if-environment="unified-preprod">Show if staging</div>
 * <div rx-if-environment="!unified-prod">Show if not prod</div>
 * </pre>
 */
.directive('rxIfEnvironment', function ($compile) {
    return {
        restrict: 'A',
        terminal: true,
        priority: 1000,
        compile: function () {
            return {
                pre: function preLink (scope, element, attrs) {
                    // add ng-show attr to element
                    element.attr('ng-show', '\'' + attrs.rxIfEnvironment + '\'| rxEnvironmentMatch');

                    //remove the attribute to avoid an indefinite loop
                    element.removeAttr('rx-if-environment');
                    element.removeAttr('data-rx-if-environment');

                    // build the new element
                    $compile(element)(scope);
                }
            };
        }
    };
});
