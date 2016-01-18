/**
 * @ngdoc overview
 * @name rxBulkSelect
 * @requires atoms.directive:rxCheckbox
 * @description
 * # rxBulkSelect Component
 *
 * A component used to perform an action on multiple items in a table.
 *
 * ## Directives
 * * {@link rxBulkSelect.directive:rxBatchActions rxBatchActions}
 * * {@link rxBulkSelect.directive:rxBulkSelect rxBulkSelect}
 * * {@link rxBulkSelect.directive:rxBulkSelectHeaderCheck rxBulkSelectHeaderCheck}
 * * {@link rxBulkSelect.directive:rxBulkSelectRow rxBulkSelectRow}
 * * {@link rxBulkSelect.directive:rxBulkSelectValidate rxBulkSelectValidate}
 *
 * ## Services
 * * {@link rxBulkSelect.service:rxBulkSelectUtils rxBulkSelectUtils}
 */
angular.module('encore.ui.rxBulkSelect', [
    'encore.ui.quarks',
    'encore.ui.atoms'
]);
