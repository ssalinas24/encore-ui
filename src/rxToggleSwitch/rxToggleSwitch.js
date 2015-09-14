/**
 * @ngdoc overview
 * @name rxToggleSwitch
 * @description
 * # rxToggleSwitch Component
 *
 * [TBD]
 *
 * ## Directives
 * {@link rxToggleSwitch.directive:rxToggleSwitch rxToggleSwitch}
 */
angular.module('encore.ui.rxToggleSwitch', [])
/**
 * @ngdoc directive
 * @name rxToggleSwitch.directive:rxToggleSwitch
 * @restrict E
 * @description
 * Displays an on/off switch toggle
 *
 * @param {String} [ng-model] The scope property to bind to
 * @param {Boolean} [disabled] Indicates if the input is disabled
 * @param {Function} [postHook] A function to run when the switch is toggled
 * @param {Expression} [trueValue=true] The value of the scope property when the switch is on
 * @param {Expression} [falseValue=false] The value of the scope property when the switch is off
 *
 * @example
 * <pre>
 * <rx-toggle-switch ng-model="foo"></rx-toggle-switch>
 * </pre>
 */
.directive('rxToggleSwitch', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxToggleSwitch.html',
        require: 'ngModel',
        scope: {
            model: '=ngModel',
            disabled: '=?',
            postHook: '&',
            trueValue: '@',
            falseValue: '@'
        },
        link: function (scope, element, attrs, ngModelCtrl) {
            var trueValue = _.isUndefined(scope.trueValue) ? true : scope.trueValue;
            var falseValue = _.isUndefined(scope.falseValue) ? false : scope.falseValue;

            if (_.isUndefined(scope.model) || scope.model !== trueValue) {
                scope.model = falseValue;
            }

            ngModelCtrl.$formatters.push(function (value) {
                return value === trueValue;
            });

            ngModelCtrl.$parsers.push(function (value) {
                return value ? trueValue : falseValue;
            });

            ngModelCtrl.$render = function () {
                scope.state = ngModelCtrl.$viewValue ? 'ON' : 'OFF';
            };

            scope.update = function () {
                if (scope.disabled) {
                    return;
                }

                ngModelCtrl.$setViewValue(!ngModelCtrl.$viewValue);
                ngModelCtrl.$render();
                scope.postHook({ value: ngModelCtrl.$modelValue });
            };
        }
    };
});
