angular.module('encore.ui.elements')
/**
 * @ngdoc directive
 * @name elements.directive:rxModalForm
 * @restrict E
 * @scope
 * @description
 * Responsible for creating the HTML necessary for modal form
 *
 * The `<rx-modal-form>` directive is helpful for providing a common format to
 * forms inside modals (hence the name).
 *
 * This directive also provides an 'autofocus' mechanism, which will move the
 * keyboard focus cursor to the first 'tabbable' input available in the form.
 *
 * @param {String} title Title of modal window
 * @param {String=} subtitle Subtitle of modal window
 * @param {Boolean=} isLoading True to show a spinner by default
 * @param {String=} [submitText='Submit'] 'Submit' button text to use.
 * @param {String=} [cancelText='Cancel'] 'Cancel' button text to use.
 * @param {String=} [returnText='Return'] 'Return' button text to use.
 * @param {String=} defaultFocus
 * The default focus element. May be 'submit' or 'cancel'. If not provided,
 * it'll default to the first 'tabbable' input available in the form.
 *
 * @example
 * <pre>
 * <rx-modal-form
 *     title="My Form"
 *     is-loading="true"
 *     submit-text="Yes!">
 * </rx-modal-form>
 * </pre>
 */
.directive('rxModalForm', function ($timeout, $compile, rxModalFooterTemplates) {
    return {
        transclude: true,
        templateUrl: 'templates/rxModalActionForm.html',
        restrict: 'E',
        scope: {
            title: '@',
            subtitle: '@?',
            isLoading: '=?',
            submitText: '@?',
            cancelText: '@?',
            returnText: '@?',
            defaultFocus: '@?'
        },
        link: function (scope, element) {
            // Copy the text variables onto the parent scope so they can be accessible by transcluded content.
            _.assign(scope.$parent, _.pick(scope, ['submitText', 'cancelText', 'returnText']));

            // Manually compile and insert the modal's footers into the DOM.
            $compile(rxModalFooterTemplates.flush())(scope.$parent, function (clone) {
                element.children('div.modal-footer').append(clone);
            });

            var focusSelectors = {
                'cancel': 'button.cancel',
                'submit': 'button.submit',
                'firstTabbable': 'input:not([type="hidden"]):not([disabled="disabled"]), textarea, select'
            };
            var setFocus = function (focus) {
                var formSelector, focusElement;

                if (focus === 'cancel' || focus === 'submit') {
                    formSelector = element[0].querySelector('.modal-footer');
                    focusElement = formSelector.querySelector(focusSelectors[focus]);
                } else {
                    focus = 'firstTabbable';
                    formSelector = element[0].querySelector('.modal-form');
                    // first check for an element with autofocus
                    focusElement = formSelector.querySelector('[autofocus]');
                    if (!focusElement) {
                        focusElement = formSelector.querySelector(focusSelectors[focus]);
                    }
                }
                if (focusElement) {
                    focusElement.focus();
                }
            };

            // Give content some time to load to set the focus
            $timeout(function () {
                setFocus(scope.defaultFocus);
            }, 400);

            // Remove the title attribute, as it will cause a popup to appear when hovering over page content
            // @see https://github.com/rackerlabs/encore-ui/issues/256
            element.removeAttr('title');
        }
    };
});
