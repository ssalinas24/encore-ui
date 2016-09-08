angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxToggleSwitch
 * @restrict E
 * @description
 *
 * Displays an on/off switch toggle
 *
 * The switch shows the states of 'ON' and 'OFF', which evaluate to `true` and
 * `false`, respectively.  The model values are configurable with the
 * `true-value` and `false-value` attributes.
 *
 * ** Note: If the value of the model is not defined at the time of
 * initialization, it will be automatically set to the false value. **
 *
 * The expression passed to the `post-hook` attribute will be evaluated every
 * time the switch is toggled (after the model property is written on the
 * scope).  It takes one argument, `value`, which is the new value of the model.
 * This can be used instead of a `$scope.$watch` on the `ng-model` property.
 * As shown in the {@link /encore-ui/#/elements/Forms demo}, the `disabled`
 * attribute can be used to prevent further toggles if the `post-hook` performs
 * an asynchronous operation.
 *
 * @param {String} ng-model The scope property to bind to
 * @param {Function} postHook A function to run when the switch is toggled
 * @param {Boolean=} ng-disabled Indicates if the input is disabled
 * @param {Expression=} [trueValue=true] The value of the scope property when the switch is on
 * @param {Expression=} [falseValue=false] The value of the scope property when the switch is off
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
            disabled: '=?', // **DEPRECATED** - remove in 3.0.0
            ngDisabled: '=?',
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

            scope.$watch(function () {
                return (scope.disabled || scope.ngDisabled);
            }, function (newVal) {
                // will be true, false, or undefined
                scope.isDisabled = newVal;
            });

            scope.update = function () {
                if (scope.isDisabled) {
                    return;
                }

                ngModelCtrl.$setViewValue(!ngModelCtrl.$viewValue);
                ngModelCtrl.$render();
                scope.postHook({ value: ngModelCtrl.$modelValue });
            };
        }
    };
});
