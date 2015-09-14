/**
 * @ngdoc overview
 * @name rxUnauthorizedInterceptor
 * @description
 * # rxUnauthorizedInterceptor Component
 *
 * [TBD]
 *
 * ## Services
 * * {@link rxUnauthorizedInterceptor.service:UnauthorizedInterceptor UnauthorizedInterceptor}
 */
angular.module('encore.ui.rxUnauthorizedInterceptor', ['encore.ui.rxSession'])
/**
 * @ngdoc service
 * @name rxUnauthorizedInterceptor.service:UnauthorizedInterceptor
 * @description
 * Simple injector which will intercept http responses. If a 401 is returned,
 * the ui redirects to /login.
 *
 * @requires $q
 * @requires @window
 * @requires rxSession.service:Session
 *
 * @example
 * <pre>
 * angular.module('encoreApp', ['encore.ui'])
 *     .config(function ($httpProvider) {
 *         $httpProvider.interceptors.push('UnauthorizedInterceptor');
 *     });
 * </pre>
 */
.factory('UnauthorizedInterceptor', function ($q, $window, Session) {
    var svc = {
        redirectPath: function () {
            // This brings in the entire relative URI (including the path
            // specified in a <base /> tag), along with query params as a
            // string.
            // e.g https://www.google.com/search?q=woody+wood+pecker
            // window.location.pathname = /search?q=woody+wood+pecker
            return $window.location.pathname;
        },
        redirect: function (loginPath) {
            loginPath = loginPath ? loginPath : '/login?redirect=';
            $window.location = loginPath + encodeURIComponent(svc.redirectPath());
        },
        responseError: function (response) {
            if (response.status === 401) {
                Session.logout(); // Logs out user by removing token
                svc.redirect();
            }

            return $q.reject(response);
        }
    };

    return svc;
});
