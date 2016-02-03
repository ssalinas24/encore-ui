/**
 * @ngdoc overview
 * @name rxUnauthorizedInterceptor
 * @description
 * # rxUnauthorizedInterceptor Component
 *
 * The rxUnauthorizedInterceptor component redirects users to the login page, 
 * when user authentication fails during a system service request.
 * 
 * ## Services
 * * {@link rxUnauthorizedInterceptor.service:UnauthorizedInterceptor UnauthorizedInterceptor}
 */
angular.module('encore.ui.rxUnauthorizedInterceptor', [
    'encore.ui.quarks'
]);
