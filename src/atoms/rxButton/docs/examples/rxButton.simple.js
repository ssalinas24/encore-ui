angular.module('demoApp')
.controller('rxButtonSimpleCtrl', function ($scope, $timeout) {
    $scope.isLoading = false;

    $scope.login = function () {
        $scope.isLoading = true;

        $timeout(function () {
            $scope.isLoading = false;
        }, 4000);
    };//login()
});
