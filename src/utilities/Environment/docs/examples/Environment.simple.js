angular.module('demoApp')
.controller('EnvironmentSimpleCtrl', function ($scope, Environment) {
    var environment = Environment.get();
    $scope.url = environment.url;
    $scope.name = environment.name;
});
