angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxProgressbar
 * @restrict E
 * @param {Expression} value
 * Numeric value used to calculate progress in relation to the max value.
 * @param {Expression=} [max=100] Maximum numeric value to calculate progress.
 * @description
 * Element used to provide feedback on the progress of a workflow or action.
 */
.directive('rxProgressbar', function (rxProgressbarUtil) {

    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'templates/rxProgressbar.html',
        scope: {
            value: '=',
            max: '=?'
        },
        link: function (scope) {
            scope.max = scope.max || 100;

            scope.$watch('value', function (newVal) {
                scope.percent = rxProgressbarUtil.calculatePercent(newVal, scope.max);
            });

            scope.$watch('max', function (newMax) {
                scope.percent = rxProgressbarUtil.calculatePercent(scope.value, newMax);
            });
        }
    };
});
