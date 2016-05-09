angular.module('demoApp')
.controller('rxDatePickerSimpleCtrl', function ($scope) {
    $scope.dateModel = moment(new Date()).format('YYYY-MM-DD');
});
