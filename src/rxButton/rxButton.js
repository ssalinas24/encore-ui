/**
 * @ngdoc overview
 * @name rxButton
 * @description
 * # rxButton Component
 *
 * [TBD]
 *
 * ## Directives
 * * {@link rxButton.directive:rxButton rxButton}
 */
angular.module('encore.ui.rxButton', [])
/**
 * @ngdoc directive
 * @name rxButton.directive:rxButton
 * @restrict E
 * @scope
 * @description
 * Renders a button which will disable when clicked and show a loading message
 * and renable when operation is complete. If you set `classes` attributes `<rx-button>`,
 * those will get passed to the `<button>` instance as `class`
 *
 * @param {String} loadingMsg Text to be displayed when an operation is in progress.
 * @param {String} defaultMsg Text to be displayed by default an no operation is in progress.
 * @param {Boolean=} [toggle=false] When true, the button will display the loading text.
 * @param {Boolean=} [disable=false] When true, the button will be disabled.
 * @param {String=} [classes=""] The class names to be applied to the button.
 */
.directive('rxButton', function () {
    return {
        templateUrl: 'templates/rxButton.html',
        restrict: 'E',
        scope: {
            toggleMsg: '@',
            defaultMsg: '@',
            toggle: '=',
            disable: '=?',
            classes: '@?'
        },
    };
});
