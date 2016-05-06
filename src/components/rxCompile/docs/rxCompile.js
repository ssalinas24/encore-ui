angular.module('demoApp')
.controller('rxCompileCtrl', function ($scope) {
    $scope.world = 'wrrrld';
    $scope.myExpression = 'Hello {{world}}';
});
