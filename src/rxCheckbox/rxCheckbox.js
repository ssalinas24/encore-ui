/**
 * @ngdoc overview
 * @name rxCheckbox
 * @description
 * # rxCheckbox Component
 *
 * [TBD]
 *
 * ## Directives
 * * {@link rxCheckbox.directive:rxCheckbox rxCheckbox}
 */
angular.module('encore.ui.rxCheckbox', [])
/**
 * @name rxCheckbox.directive:rxCheckbox
 * @ngdoc directive
 * @restrict A
 * @scope
 * @description
 * Attribute directive that wraps a native checkbox element in markup required for styling purposes.
 *
 * @example
 * <pre>
 * <input rx-checkbox ng-model="demoValue" />
 * </pre>
 *
 * @param {Boolean=} [ng-disabled=false] Determines if the control is disabled.
 */
.directive('rxCheckbox', function () {
    return {
        restrict: 'A',
        scope: {
            ngDisabled: '=?'
        },
        compile: function (tElement, tAttrs) {
            // automatically set input type
            tElement.attr('type', 'checkbox');
            tAttrs.type = 'checkbox';

            return function (scope, element, attrs) {
                var disabledClass = 'rx-disabled';
                var wrapper = '<div class="rxCheckbox"></div>';
                var fakeCheckbox = '<div class="fake-checkbox">' +
                        '<div class="tick fa fa-check"></div>' +
                    '</div>';

                element.wrap(wrapper);
                element.after(fakeCheckbox);
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
});//rxCheckbox
