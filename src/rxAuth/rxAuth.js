/**
 * @ngdoc overview
 * @name rxAuth
 * @description
 * # rxAuth Component
 *
 * [TBD]
 *
 * ## Services
 * * {@link rxAuth.service:Auth Auth}
 */
angular.module('encore.ui.rxAuth', [
    'encore.ui.rxIdentity',
    'encore.ui.rxSession',
    'encore.ui.rxPermission'
])
/**
 * @ngdoc service
 * @name rxAuth.service:Auth
 * @description
 * Service which provides an entire solution for authenticating, user session management
 * and permissions in the UI.  The Auth service is a wrapper for the Identity, Session and
 * Permission services.  These services were broken into smaller components to facilitate
 * customization and re-use.
 *
 * @requires rxIdentity.service:Identity
 * @requires rxSession.service:Session
 * @requires rxPermission.service:Permission
 *
 * @example
 * <pre>
 * Auth.loginWithJSON(json); // Returns a promise
 * Auth.login({username: '', password: '', successCallback, errorCallback}); // Returns a promise
 * Auth.getToken(); // Returns the stored token
 * Auth.storeToken(token); // Stores token
 * Auth.logout(); // Logs user off
 * Auth.isCurrent(); // Returns true/false if the token has expired.
 * Auth.isAuthenticated(); // Returns true/false if the user token is valid.
 * Auth.getRoles() // Returns an array of roles for a user
 * Auth.hasRole(role) // Returns true/false if user has specified role
 * </pre>
 */
.factory('Auth', function (Identity, Session, Permission) {
    var svc = {};

    _.assign(svc, Identity);
    _.assign(svc, Session);
    _.assign(svc, Permission);

    return svc;
});
