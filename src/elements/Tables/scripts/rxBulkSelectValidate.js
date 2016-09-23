angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxBulkSelectValidate
 * @restrict A
 * @requires elements.directive:rxBulkSelect
 * @description
 *
 * A directive used to validate rxBulkSelect in a form. The directive should be placed
 * on the same element as rxBulkSelect. The form will be invalid when no items are selected
 * and valid when at least one item is selected.
 */
.directive('rxBulkSelectValidate', function () {
    return {
        require: ['^form', 'rxBulkSelect'],
        restrict: 'A',
        link: function (scope, elm, attrs, controllers) {
            var formCtrl = controllers[0];
            var bulkSelectCtrl = controllers[1];
            var setValidity = function () {
                var stats = bulkSelectCtrl.messageStats;
                formCtrl.$setValidity('selected', stats.numSelected > 0);
            };

            bulkSelectCtrl.registerForNumSelected(setValidity);
            formCtrl.$setValidity('selected', false);
        }
    };
});
