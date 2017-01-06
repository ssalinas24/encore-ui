angular.module('encore.ui.rxPermission')
/**
 * @ngdoc directive
 * @name rxPermission.directive:rxPermission
 * @restrict E
 * @scope
 * @description
 * Simple directive which will show or hide content based on whether or not the user has the specified role. See
 * the `rxPermission` component [demo](../#/components/rxPermission) for an example.
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
