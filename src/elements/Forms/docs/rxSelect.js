angular.module('demoApp')
.controller('rxSelectCtrl', function ($scope) {
    $scope.validEnabled = 3;
    $scope.validNgDisabled = 'na';
    $scope.validDisabled = 'na';

    $scope.invalidEnabled = 4;
    $scope.invalidNgDisabled = 'na';
    $scope.invalidDisabled = 'na';

    $scope.htmlSelectAlternativeValue = 'second';
});
