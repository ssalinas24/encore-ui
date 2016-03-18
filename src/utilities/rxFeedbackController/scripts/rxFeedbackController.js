angular.module('encore.ui.utilities')
/**
 * @ngdoc controller
 * @name utilities.controller:rxFeedbackController
 * @scope
 * @description
 * Allows the customization of the feedback modal via `$scope` and `$modalInstance`.
 */
.controller('rxFeedbackController', function ($scope, $modalInstance, $rootScope, $injector) {
    // define a controller for the modal to use
    $scope.submit = function () {
        $modalInstance.close($scope);
    };

    $scope.cancel = $modalInstance.dismiss;

    // cancel out of the modal if the route is changed
    $rootScope.$on('$routeChangeSuccess', $modalInstance.dismiss);

    // Allow external overrides of the form
    if ($injector.has('FeedbackService')) {
        $injector.get('FeedbackService').initialize($scope, $modalInstance);
    }
});
