angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxSelect
 * @restrict A
 * @scope
 * @description
 *
 * This directive is to apply styling to native `<select>` elements
 *
 * ## Styling
 *
 * Directive results in a **block element** that takes up the *full width of its
 * container*. You can style the output against decendents of the **`.rxSelect`**
 * CSS class.
 *
 * ## Show/Hide
 * If you wish to show/hide your `rxSelect` element, we recommend placing it
 * within a `<div>` or `<span>` wrapper, and performing the show/hide logic on
 * the wrapper.
 *
 * <pre>
 * <span ng-show="isShown">
 *     <select rx-select ng-model="selDemo">
 *         <option value="1">First</option>
 *         <option value="2">Second</option>
 *         <option value="3">Third</option>
 *     </select>
 * </span>
 * </pre>
 *
 * It is highly recommended that you use `ng-show` and `ng-hide` for display logic.
 * Because of the way that `ng-if` and `ng-switch` directives behave with scope,
 * they may introduce unnecessary complexity in your code.
 *
 * @example
 * <pre>
 * <select rx-select ng-model="demoItem">
 *   <option value="1">First</option>
 *   <option value="2">Second</option>
 *   <option value="3">Third</option>
 * </select>
 * </pre>
 *
 * @param {Boolean=} [ngDisabled=false] Determines if control is disabled.
 */
.directive('rxSelect', function () {
    return {
        restrict: 'A',
        scope: {
            ngDisabled: '=?'
        },
        link: function (scope, element, attrs) {
            var disabledClass = 'rx-disabled';
            var wrapper = '<div class="rxSelect"></div>';
            var fakeSelect = '<div class="fake-select">' +
                    '<div class="select-trigger">' +
                        '<i class="fa fa-fw fa-caret-down"></i>' +
                    '</div>' +
                '</div>';

            element.wrap(wrapper);
            element.after(fakeSelect);
            // must be defined AFTER the element is wrapped
            var parent = element.parent();

            // apply/remove disabled class so we have the ability to
            // apply a CSS selector for purposes of style sibling elements
            if (_.has(attrs, 'disabled')) {
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
        }
    };
});
