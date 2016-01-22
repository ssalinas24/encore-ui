/**
 * @ngdoc overview
 * @name rxTokenInterceptor
 * @description
 * # rxTokenInterceptor Component
 *
 * The rxTokenInterceptor component adds an authorization token to all http requests.
 * This allows access to system services for authenticated users.
 *
 *
 * ## Services
 * * {@link rxTokenInterceptor.service:TokenInterceptor TokenInterceptor}
 */
angular.module('encore.ui.rxTokenInterceptor', [
    'encore.ui.quarks'
]);
