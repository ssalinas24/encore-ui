/**
 * @ngdoc overview
 * @name rxBreadcrumbs
 * @description
 * # rxBreadcrumbs Component
 *
 * [TBD]
 *
 * ## Directives
 * * {@link rxBreadcrumbs.directive:rxBreadcrumbs rxBreadcrumbs}
 *
 * ## Services
 * * {@link rxBreadcrumbs.service:rxBreadcrumbsSvc rxBreadcrumbsSvc}
 */
angular.module('encore.ui.rxBreadcrumbs', ['ngSanitize'])
/**
 * @ngdoc service
 * @name rxBreadcrumbs.service:rxBreadcrumbsSvc
 * @description [TBD]
 */
.factory('rxBreadcrumbsSvc', function () {
    // default will always be home
    var breadcrumbs = [{
        path: '/',
        name: 'Home'
    }];
    var breadcrumbsService = {};

    breadcrumbsService.set = function (items) {
        // reset to just homepage
        breadcrumbs = breadcrumbs.splice(0, 1);
        // add in new breadcrumbs
        breadcrumbs = breadcrumbs.concat(items);
    };

    breadcrumbsService.getAll = function (titleStatus) {
        // return a copy of the array (so it can't be modified)
        var copy = breadcrumbs.slice(0);

        // If a titleStatus tag was passed in for the page, check each of the
        // breadcrumbs to see if they're asking for that tag
        if (_.isString(titleStatus) && titleStatus) {
            _.each(copy, function (breadcrumb) {
                // only add the page status tag to the breadcrumb if it
                // doesn't already have its own status tag defined
                if (breadcrumb.usePageStatusTag && !breadcrumb.status) {
                    breadcrumb.status = titleStatus;
                }
            });
        }
        return copy;
    };

    breadcrumbsService.setHome = function (path, name) {
        breadcrumbs[0] = {
            path: path,
            name: name || breadcrumbs[0].name
        };
    };

    return breadcrumbsService;
})
/**
 * @ngdoc directive
 * @name rxBreadcrumbs.directive:rxBreadcrumbs
 * @restrict E
 * @scope
 * @description
 * Responsible for drawing the breadcrumbs for a page
 *
 * @param {String=} status The tag to apply to any breadcrumbs with usePageStatusTag:true
 *
 * @example
 * <pre>
 * <rx-app site-title="Custom Title"></rx-app>
 * </pre>
 */
.directive('rxBreadcrumbs', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxBreadcrumbs.html',
        controller: function ($scope, rxBreadcrumbsSvc) {
            $scope.breadcrumbs = rxBreadcrumbsSvc;
        },
        scope: {
            status: '@'
        }
    };
});
