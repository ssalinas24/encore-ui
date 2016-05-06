angular.module('demoApp')
.controller('rxCheckboxShowHideCtrl', function ($scope) {
    $scope.amSure = false;
    $scope.amReallySure = false;

    $scope.$watch('amSure', function (newVal) {
        if (newVal === false) {
            $scope.amReallySure = false;
        }
    });
});
