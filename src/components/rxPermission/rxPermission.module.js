/**
 * @ngdoc overview
 * @name rxPermission
 * @description
 * # rxPermission Component
 * The rxPermission component provides functionality to perform checks against existing user permissions in
 * EncoreUI.  It provides a {@link rxPermission.service:Permission Permission} service for working with roles, and
 * a {@link rxPermission.directive:rxPermission rxPermission} directive for excluding DOM content based on roles.
 *
 * ## Services
 * * {@link rxPermission.service:Permission Permission}
 *
 * ## Directives
 * * {@link rxPermission.directive:rxPermission rxPermission}
 */
angular.module('encore.ui.rxPermission', [
    'encore.ui.quarks',
]);
