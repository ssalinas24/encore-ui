angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxBulkSelectRow
 * @restrict A
 * @scope
 * @requires elements.directive:rxBulkSelect
 * @description
 *
 * A directive you place on your `<td>` element which will contain the bulk-select
 * checkbox. This directive draws the checkbox itself. This directive takes
 * `row` as an attribute, pointing to the object representing this row.
 *
 * @param {Object} row The object representing this row, i.e. the left side of the ng-repeat
 *
 * @example
 * <pre>
 * <td rx-bulk-select-row row="server"></td>
 * </pre>
 */
.directive('rxBulkSelectRow', function () {
    return {
        restrict: 'A',
        scope: {
            row: '='
        },
        require: '^rxBulkSelect',
        template: '<input ng-change="onChange()" ng-model="row[key]"' +
                  ' rx-checkbox class="rx-bulk-select-row" />',
        link: function (scope, element, attrs, rxBulkSelectCtrl) {
            scope.key = rxBulkSelectCtrl.key();
            scope.onChange = function () {
                if (scope.row[scope.key]) {
                    rxBulkSelectCtrl.increment();
                } else {
                    rxBulkSelectCtrl.decrement();
                }
            };
        }
    };
});
