angular.module('encore.ui.utilities')
/**
 * @ngdoc controller
 * @name utilities.controller:rxModalCtrl
 * @scope
 * @description
 * Provides a controller for `rxModalAction` to use.
 */
.controller('rxModalCtrl', function ($scope, $modalInstance, $rootScope) {
    // define a controller for the modal to use
    $scope.submit = function () {
        $modalInstance.close($scope);
    };

    $scope.cancel = $modalInstance.dismiss;

    // cancel out of the modal if the route is changed
    $rootScope.$on('$routeChangeSuccess', $modalInstance.dismiss);
});
