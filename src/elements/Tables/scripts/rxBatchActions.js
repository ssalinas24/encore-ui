angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxBatchActions
 * @restrict E
 * @scope
 * @requires elements.directive:rxBulkSelect
 * @description
 *
 * This directive is responsible for adding the batch action menu link
 * inside a table header. It can only be used when rxBulkSelect is also
 * present. It should be placed in a `<th>` element.
 *
 * It will also transclude `<li>` items, each representing a modal bulk
 * select action. You don't need to include the correctly styled `<ul>`, it
 * will do this for you.
 *
 * @example
 * <pre>
 * <th colspan="10">
 *     <rx-batch-actions>
 *         <li>
 *             <rx-modal-action
 *                 template-url="templates/suspend-modal.html"
 *                 controller="SuspendServersCtrl"
 *                 classes="msg-info">
 *                 <i class="fa fa-fw fa-power-off msg-info"></i>
 *                 Suspend Selected Servers
 *             </rx-modal-action>
 *         </li>
 *     </rx-batch-actions>
 * </th>
 * </pre>
 */
.directive('rxBatchActions', function (rxDOMHelper) {
    return {
        restrict: 'E',
        require: ['^rxBulkSelect', '?^rxFloatingHeader'],
        templateUrl: 'templates/rxBatchActions.html',
        transclude: true,
        link: function (scope, element, attrs, controllers) {

            var rxBulkSelectCtrl = controllers[0],
                rxFloatingHeaderCtrl = controllers[1];

            // We need to add the class onto the parent <tr>, so rxFloatingHeader can
            // easily identify this <tr>
            element.parent().parent().addClass('rx-table-filter-row');

            scope.displayed = false;

            scope.toggleBulkActions = function () {
                scope.displayed = !scope.displayed;
            };

            var numSelectedChange = function (numSelected) {
                scope.rowsSelected = numSelected > 0;
                if (numSelected === 0) {
                    scope.displayed = false;
                }
            };
            rxBulkSelectCtrl.registerForNumSelected(numSelectedChange);

            if (_.isObject(rxFloatingHeaderCtrl)) {
                // When rxBatchActions lives inside of an rxFloatingHeader enabled table,
                // the element will be cloned by rxFloatingHeader. The issue is that a normal
                // .clone() does not clone Angular bindings, and thus the cloned element doesn't
                // have `ng-show="displayed"` on it. We can manually add `ng-hide` on startup, to
                // ensure that class is present in the clone. After that, everything will work as expected.
                if (!scope.displayed) {
                    rxDOMHelper.find(element, '.batch-action-menu-container').addClass('ng-hide');
                }
                rxFloatingHeaderCtrl.update();
            }

        }
    };
});
