/**
 * @ngdoc overview
 * @name rxSortableColumn
 * @description
 * # rxSortableColumn Component
 *
 * [TBD]
 *
 * ## Directives
 * * {@link rxSortableColumn.directive:rxSortableColumn rxSortableColumn}
 *
 * ## Filters
 * * {@link rxSortableColumn.filter:rxSortEmptyTop rxSortEmptyTop}
 *
 * ## Services
 * * {@link rxSortableColumn.service:rxSortUtil rxSortUtil}
 */
angular.module('encore.ui.rxSortableColumn', [])
/**
 * @ngdoc directive
 * @name rxSortableColumn.directive:rxSortableColumn
 * @restrict E
 * @description
 * Renders a clickable link in a table heading which will sort the table by
 * the referenced property in ascending or descending order.
 *
 * @param {String} displayText - The text to be displayed in the link
 * @param {Function} sortMethod - The sort function to be called when the link is clicked
 * @param {String} sortProperty - The property on the array to sort by when the link is clicked.
 * @param {Object} predicate - The current property the collection is sorted by.
 * @param {Boolean} reverse - Indicates whether the collection should sort the array in reverse order.
 */
.directive('rxSortableColumn', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxSortableColumn.html',
        transclude: true,
        scope: {
            sortMethod: '&',
            sortProperty: '@',
            predicate: '=',
            reverse: '='
        }
    };
})
/**
 * @ngdoc service
 * @name rxSortableColumn.service:rxSortUtil
 * @description
 * Service which provided utility methods for sorting collections.
 *
 * @example
 * <pre>
 * rxSortUtil.getDefault() // returns a sort object with name as the default.
 * rxSortUtil.sortCol($scope, 'name') // sorts the collection based on the predicate
 * </pre>
 */
.factory('rxSortUtil', function () {
    var util = {};

    util.getDefault = function (property, reversed) {
        return { predicate: property, reverse: reversed };
    };

    util.sortCol = function ($scope, predicate) {
        var reverse = ($scope.sort.predicate === predicate) ? !$scope.sort.reverse : false;
        $scope.sort = { reverse: reverse, predicate: predicate };

        // This execution should be moved outside of the scope for rxSortUtil
        // already rxSortUtil.sortCol has to be wrapped, and can be implemented there
        // rather than have rxSortUtil.sortCol check/expect for a pager to be present.
        if ($scope.pager) {
            $scope.pager.pageNumber = 0;
        }
    };

    return util;
})
/**
 * @ngdoc filter
 * @name rxSortableColumn.filter:rxSortEmptyTop
 * @description
 * Filter that moves rows with an empty predicate to the top of the column in ascending order,
 * and to the bottom in descending order.
 *
 * @example
 * <pre>
 * [{ name: { firstName: 'Adam' } }, { }] | rxSortEmptyTop 'name.firstName':false
 * Will sort as [{}, { name: { firstName: 'Adam' } }].
 *
 * [{ name: { firstName: 'Adam' } }, { name: { firstName: null } ] | rxSortEmptyTop 'name.firstName':true
 * Will sort as [{ name: { firstName: 'Adam' } }, {}]
 * </pre>
 */
.filter('rxSortEmptyTop', ['$filter', '$parse', function ($filter, $parse) {
    return function (array, key, reverse) {

        var predicateGetter = $parse(key);

        var sortFn = function (item) {
            return predicateGetter(item) || '';
        };

        return $filter('orderBy')(array, sortFn, reverse);
    };
}]);
