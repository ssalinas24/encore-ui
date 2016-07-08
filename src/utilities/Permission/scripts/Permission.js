angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:Permission
 * @description
 * Simple service for accessing roles and permissions for a user.
 *
 * @requires utilities.service:Session
 *
 * @example
 * <pre>
 * Permission.getRoles() //returns an array of roles for a user
 * Permission.hasRole(role) //returns true/false if user has specified role
 * </pre>
 */
.factory('Permission', function (Session) {
    var permissionSvc = {};

    var cleanRoles = function (roles) {
        return roles.split(',').map(function (r) {
            return r.trim();
        });
    };

    var userRoles = function () {
        return _.pluck(permissionSvc.getRoles(), 'name');
    };

    /**
     * @description Takes a function and a list of roles, and returns the
     * result of calling that function with `roles`, and comparing to userRoles().
     *
     * @param {Function} fn Comparison function to use. _.any, _.all, etc.
     * @param {String[]} roles List of desired roles
     */
    var checkRoles = function (roles, fn) {
        // Some code expects to pass a comma-delimited string
        // here, so turn that into an array
        if (_.isString(roles)) {
            roles = cleanRoles(roles);
        }

        var allUserRoles = userRoles();
        return fn(roles, function (role) {
            return _.contains(allUserRoles, role);
        });
    };

    /**
     * @name  getRoles
     * @ngdoc method
     * @methodOf utilities.service:Permission
     * @description
     * Fetch all the roles tied to the user (in the exact format available in their Session token).
     *
     * @returns {Array} List of all roles associated to the user.
     */
    permissionSvc.getRoles = function () {
        var token = Session.getToken();
        return (token && token.access && token.access.user && token.access.user.roles) ?
            token.access.user.roles : [];
    };

    /**
     * @name  hasRole
     * @ngdoc method
     * @methodOf utilities.service:Permission
     * @description Check if user has at least _one_ of the given roles.
     * @param {String[]} roles List of roles to check against
     * @returns {Boolean} True if user has at least _one_ of the given roles; otherwise, False.
     */
    permissionSvc.hasRole = function (roles) {
        return checkRoles(roles, _.any);
    };

    /**
     * @name  hasAllRoles
     * @ngdoc method
     * @methodOf utilities.service:Permission
     * @description Checks if user has _every_ role in given list.
     * @param {String[]} roles List of roles to check against
     * @returns {Boolean} True if user has _every_ role in given list; otherwise, False.
     *
     */
    permissionSvc.hasAllRoles = function (roles) {
        return checkRoles(roles, _.all);
    };

    return permissionSvc;
});
