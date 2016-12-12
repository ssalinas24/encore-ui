angular.module('demoApp')
.controller('EnvironmentSimpleCtrl', function ($scope, rxEnvironment) {
    var environment = rxEnvironment.get();
    $scope.url = environment.url;
    $scope.name = environment.name;
});
