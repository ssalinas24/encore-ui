angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxSortUtil
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
});
