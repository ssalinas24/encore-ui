/**
 * @ngdoc overview
 * @name rxModalAction
 * @description
 * # rxModalAction Component
 *
 * The rxModalAction component provides a hook to open and perform operations on a modal window.
 *
 * This provides a hook into Angular-UI Bootstrap's modal directive. It's used as a link to open a modal window. The
 * content inside the window is blank, however you can tie this with `<rx-modal-form>` to build a modal form window
 * (including the modal title and submit/cancel buttons).
 *
 * **NOTE:** This module has a dependency on [Angular-UI Bootstrap](http://angular-ui.github.io/bootstrap/), so if
 * it is going to be used, Bootstrap needs to be included in your webpage.
 *
 * ## Directives
 * * {@link rxModalAction.directive:rxModalAction rxModalAction}
 * * {@link rxModalAction.directive:rxModalFooter rxModalFooter}
 * * {@link rxModalAction.directive:rxModalForm rxModalForm}
 */
angular.module('encore.ui.rxModalAction', [
    'ui.bootstrap'
])
.run(function ($compile, $templateCache) {
    $compile($templateCache.get('templates/rxModalFooters.html'));
});
