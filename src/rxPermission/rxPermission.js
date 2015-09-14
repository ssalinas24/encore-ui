/**
 * @ngdoc overview
 * @name rxPermission
 * @description
 * # rxPermission Component
 *
 * [TBD]
 *
 * ## Services
 * * {@link rxPermission.service:Permission Permission}
 *
 * ## Directives
 * * {@link rxPermission.directive:rxPermission rxPermission}
 */
angular.module('encore.ui.rxPermission', ['encore.ui.rxSession'])
/**
 * @ngdoc service
 * @name rxPermission.service:Permission
 * @description
 * Simple service for accessing roles and permissions for a user.
 *
 * @requires rxSession.service:Session
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

    /*
     * @description Takes a function and a list of roles, and returns the
     * result of calling that function with `roles`, and comparing to userRoles()
     * @param {function} fn - Comparison function to use. _.any, _.all, etc.
     * @param {array} roles - List of desired roles
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

    /*
     * @description Returns a list of all roles associated to the user
     */
    permissionSvc.getRoles = function () {
        var token = Session.getToken();
        return (token && token.access && token.access.user && token.access.user.roles) ?
            token.access.user.roles : [];
    };

    /*
     * @description Returns whether or not the user has at least one of `roles`
     * @param {array} roles - List of roles to check against
     */
    permissionSvc.hasRole = function (roles) {
        return checkRoles(roles, _.any);
    };

    /*
     * @description Returns whether or not the user has _every_ role in `roles`
     * @param {array} roles - List of roles to check against
     */
    permissionSvc.hasAllRoles = function (roles) {
        return checkRoles(roles, _.all);
    };

    return permissionSvc;
})
/**
 * @ngdoc directive
 * @name rxPermission.directive:rxPermission
 * @restrict E
 * @scope
 * @description
 * Simple directive which will show or hide content if user specified role.
 *
 * @requires rxPermission.service:Permission
 *
 * @param {String} role - Name of required role.
 */
.directive('rxPermission', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            role: '@'
        },
        templateUrl: 'templates/rxPermission.html',
        controller: function ($scope, Permission) {
            $scope.hasRole = function (roles) {
                return Permission.hasRole(roles);
            };
        }
    };
});
