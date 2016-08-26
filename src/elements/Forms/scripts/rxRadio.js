angular.module('encore.ui.elements')
/**
 * @name elements.directive:rxRadio
 * @ngdoc directive
 * @restrict A
 * @scope
 * @description
 * rxRadio is an attribute directive that wraps a native radio element in markup required for styling purposes.
 * To use the directive, you can replace `type="radio"` with `rx-radio`. The directive is smart enough to set
 * the correct input type.
 *
 * # Styling
 * Directive results in an inline-block element.
 * You can style the output against decendents of the **`.rxRadio`** CSS class.
 *
 * # Show/Hide
 * If you wish to show/hide your `rxRadio` element (and its label), we recommend placing the element (and its label)
 * inside of a `<div>` or `<span>` wrapper, and performing the show/hide logic on the wrapper.
 * <pre>
 * <span ng-show="isShown">
 *   <input rx-radio id="radDemo" ng-model="radDemo" />
 *   <label for="radDemo">Label for Demo Radio</label>
 * </span>
 * </pre>
 *
 * It is highly recommended that you use `ng-show` and `ng-hide` for display logic.
 * Because of the way that `ng-if` and `ng-switch` directives behave with scope, they may
 * introduce unnecessary complexity in your code.
 *
 * @example
 * <pre>
 * <input rx-radio id="radDemo" ng-model="radDemo" />
 * <label for="radDemo">Label for Demo Radio</label>
 * </pre>
 *
 * @param {Boolean=} [ng-disabled=false] Determines if control is disabled.
 */
.directive('rxRadio', function () {
    return {
        restrict: 'A',
        scope: {
            ngDisabled: '=?'
        },
        compile: function (tElement, tAttrs) {
            // automatically set input type
            tElement.attr('type', 'radio');
            tAttrs.type = 'radio';

            return function (scope, element, attrs) {
                var disabledClass = 'rx-disabled';
                var wrapper = '<div class="rxRadio"></div>';
                var fakeRadio = '<div class="fake-radio">' +
                        '<div class="tick"></div>' +
                    '</div>';

                element.wrap(wrapper);
                element.after(fakeRadio);
                // must be defined AFTER the element is wrapped
                var parent = element.parent();

                // apply/remove disabled attribute so we can
                // apply a CSS selector to style sibling elements
                if (attrs.disabled) {
                    parent.addClass(disabledClass);
                }
                if (_.has(attrs, 'ngDisabled')) {
                    scope.$watch('ngDisabled', function (newVal) {
                        if (newVal === true) {
                            parent.addClass(disabledClass);
                        } else {
                            parent.removeClass(disabledClass);
                        }
                    });
                }

                var removeParent = function () {
                    parent.remove();
                };

                // remove stylistic markup when element is destroyed
                element.on('$destroy', function () {
                    scope.$evalAsync(removeParent);
                });
            };
        }//compile
    };
});
