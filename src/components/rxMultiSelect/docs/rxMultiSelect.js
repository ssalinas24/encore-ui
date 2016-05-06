angular.module('demoApp')
.controller('rxMultiSelectCtrl', function ($scope) {
    $scope.data = {
        classification: []
    };

    $scope.validEnabled = 'C';
    $scope.validDisabled = '';

    $scope.invalidEnabled = 'D';
    $scope.invalidDisabled = '';

});
