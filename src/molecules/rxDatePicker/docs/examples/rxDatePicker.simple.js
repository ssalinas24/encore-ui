angular.module('demoApp')
.controller('rxDatePickerSimpleCtrl', function ($scope) {
    $scope.dateModel = new Date().toISOString().split('T')[0];
});
