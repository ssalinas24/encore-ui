/**
 * @ngdoc overview
 * @name rxCollapse
 * @description
 * # rxCollapse Component
 *
 * [TBD]
 *
 * ## Directives
 * * {@link rxCollapse.directive:rxCollapse rxCollapse}
 */
angular.module('encore.ui.rxCollapse', [])
/**
 * @ngdoc directive
 * @name rxCollapse.directive:rxCollapse
 * @restrict E
 * @scope
 * @description
 * Hide and show an element with a transition.
 *
 * @param {String=} [title="See More/See Less"]
 * The title to display next to the toggle button. Default is "See More/See Less" toggle.
 * @param {String=} [expanded='true']
 * Initially expanded or collapsed. Default is expanded.
 *
 * @example
 * <pre>
 * <rx-collapse title="Filter results" expanded="true">Text Here</rx-collapse>
 * <rx-collapse expanded="true">Text Here</rx-collapse>
 * </pre>
 */
.directive('rxCollapse', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxCollapse.html',
        transclude: true,
        scope: {
            title: '@'
        },
        link: function (scope, element, attrs) {
            scope.isExpanded = (attrs.expanded === 'false') ? false : true;

            scope.toggleExpanded = function () {
                scope.isExpanded = !scope.isExpanded;
            };
        }
    };
});
