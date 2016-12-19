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
 *     rxStatus.setScope(); // no input results in $rootScope being used
 *     rxStatus.setScope($rootScope); // forcibly set $rootScope as the scope to be used
 * });
 * </pre>
 */
.service('StatusUtil', function ($route, $rootScope, rxStatus) {
    return {
        setupScope: function (scope) {
            rxStatus.setScope(scope || $rootScope);
        }
    };
});
