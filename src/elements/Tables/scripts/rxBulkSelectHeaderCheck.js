angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxBulkSelectHeaderCheck
 * @restrict A
 * @scope
 * @requires elements.directive:rxBulkSelect
 * @description
 *
 * A directive you place on your `<th>` element representing the checkbox column.
 * This places a checkbox in the header, which will select all items on the current
 * page when clicked.
 *
 * @example
 * <pre>
 * <th rx-bulk-select-header-check></th>
 * </pre>
 */
.directive('rxBulkSelectHeaderCheck', function ($compile) {
    var selectAllCheckbox = '<input ng-model="allSelected" ng-change="selectAll()" rx-checkbox>';
    return {
        restrict: 'A',
        scope: true,
        require: '^rxBulkSelect',
        link: function (scope, element, attrs, rxBulkSelectCtrl) {
            scope.allSelected = false;
            scope.selectAll = function () {
                if (scope.allSelected) {
                    rxBulkSelectCtrl.selectAllVisibleRows();
                } else {
                    rxBulkSelectCtrl.deselectAllVisibleRows();
                }
            };
            element.append($compile(selectAllCheckbox)(scope).parent());

            var testAllSelected = function () {
                var stats = rxBulkSelectCtrl.messageStats;
                scope.allSelected = stats.numSelected === stats.total;
            };
            rxBulkSelectCtrl.registerForNumSelected(testAllSelected);
            rxBulkSelectCtrl.registerForTotal(testAllSelected);

            var uncheck = function () {
                scope.allSelected = false;
            };
            rxBulkSelectCtrl.registerHeader(uncheck);
        }
    };
});
