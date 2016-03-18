angular.module('demoApp')
.controller('SessionSimpleCtrl', function ($scope, $window, Session) {
    $scope.isAuthenticated = function () {
        $window.alert(Session.isAuthenticated());
    };
});
