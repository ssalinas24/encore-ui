angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxBulkSelectMessage
 * @restrict A
 * @scope
 * @requires elements.directive:rxBulkSelect
 * @description
 *
 * This directive is responsible for drawing the appearing/disappearing
 * "message" row in the table header. This row shows how many items have
 * been selected, and gives buttons for "Select All" and "Clear All"
 *
 * You should not use this directive directly. It will be drawn automatically
 * by rxBulkSelect.
 *
 * If the table also has rxFloatingHeader available, this directive will
 * communicate with the controller from rxFloatingHeader, to correctly
 * support the appearing/disappearing of this header row.
 *
 * @param {String} resourceName The singular form of the name of the resource, e.g. 'server'.
 *
 */
.directive('rxBulkSelectMessage', function () {
    return {
        restrict: 'A',
        require: ['^rxBulkSelect', '?^rxFloatingHeader'],
        scope: {
            resourceName: '@'
        },
        templateUrl: 'templates/rxBulkSelectMessage.html',
        link: function (scope, element, attr, controllers) {
            element.addClass('ng-hide');

            var rxBulkSelectCtrl = controllers[0],
                // Optional controller, so mock it out if it's not present
                // https://github.com/eslint/eslint/issues/5537
                // eslint-disable-next-line object-curly-spacing
                rxFloatingHeaderCtrl = controllers[1] || { update: function () {} };

            scope.selectAll = function () {
                rxBulkSelectCtrl.selectEverything();
            };

            scope.deselectAll = function () {
                rxBulkSelectCtrl.deselectEverything();
            };

            scope.numSelected = 0;
            scope.total = rxBulkSelectCtrl.messageStats.total;

            var numSelectedChange = function (numSelected, oldNumSelected) {
                scope.numSelected = numSelected;
                var multiple = numSelected > 1;
                scope.plural = multiple ? 's' : '';
                scope.isOrAre = multiple ? 'are' : 'is';

                // We could use `ng-show` directly on the directive, rather
                // than manually adding/removing the `.ng-hide` class here. The issue
                // that causes is that ng-show will run before rxFloatingHeader
                // runs its stuff, and it causes it to not see when `.ng-hide`
                // has been removed. That causes it to clone the message row
                // with `.ng-hide` on it, which results in jumpiness at the top
                // of the table
                if (numSelected === 0) {
                    element.addClass('ng-hide');
                    rxFloatingHeaderCtrl.update();
                } else if (numSelected > 0 && oldNumSelected === 0) {
                    // Only explicitly do this work if we're transitioning from
                    // numSelected=0 to numSelected>0
                    element.removeClass('ng-hide');
                    rxFloatingHeaderCtrl.update();
                }
            };
            rxBulkSelectCtrl.registerForNumSelected(numSelectedChange);

            rxBulkSelectCtrl.registerForTotal(function (newTotal) {
                scope.total = newTotal;
            });
            rxFloatingHeaderCtrl.update();
        }
    };
});
