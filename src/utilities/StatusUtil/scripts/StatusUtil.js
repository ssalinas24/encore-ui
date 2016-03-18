angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:StatusUtil
 * @description
 * Manipulates required references to $scope input for proper notification functionality.
 *
 * @example
 * <pre>
 * $rootScope.$on('$routeChangeSuccess', function () {
 *     Status.setScope(); // no input results in $rootScope being used
 *     Status.setScope($rootScope); // forcibly set $rootScope as the scope to be used
 * });
 * </pre>
 */
.service('StatusUtil', function ($route, $rootScope, Status) {
    return {
        setupScope: function (scope) {
            Status.setScope(scope || $rootScope);
        }
    };
});
