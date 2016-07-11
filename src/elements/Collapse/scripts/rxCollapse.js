angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name rxCollapse.directive:rxCollapse
 * @restrict E
 * @scope
 * @description
 * `rxCollapse` directive hides and shows an element with a transition.  It can be configured to show as either expanded
 * or collapsed on page load.  A double chevron(**>>**) is used to toggle between show and hide contents, while keeping
 * the header and border visible.
 *
 * ## Hide/Show Content
 *
 * * This pattern was developed for areas displaying metadata that may be short on screen real estate, as a way to hide
 *  data on load that is not as important to the user in the context where they are presented.  `rxCollapse` toggles
 *  between the *optional* `title` parameter with "*See More*" or "*See Less*".
 * * This pattern is not very responsive-friendly, since as browser width decreases, columns will wrap. As columns wrap,
 *  the "*See More*" `rxCollapse` elements get lost in the new context, which is bad for user experience.
 * * To avoid the problem described above, "*See More*" `rxCollapse` elements should only be used at the end of the
 * final column present on the page, so that when the columns wrap via flexbox, "*See More*" is always last and doesn't
 * get lost in between metadata key/value pairs.
 *
 *
 * @param {String=} [title="See More/See Less"]
 * The title to display next to the toggle button. Default is "See More/See Less" toggle.
 * @param {Boolean=} [expanded='true']
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
