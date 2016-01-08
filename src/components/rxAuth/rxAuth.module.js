/**
 * @ngdoc overview
 * @name rxAuth
 * @description
 * # rxAuth Component
 *
 * The `rxAuth` component provides logic for authenticating, validating permissions, and managing sessions.
 *
 * ## Services
 * * {@link rxAuth.service:Auth Auth}
 */
angular.module('encore.ui.rxAuth', [
    'encore.ui.quarks',
    'encore.ui.rxSession',
    'encore.ui.rxPermission'
]);
