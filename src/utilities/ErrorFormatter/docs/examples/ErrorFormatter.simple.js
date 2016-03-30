angular.module('demoApp')
.controller('ErrorFormatterSimpleCtrl', function ($scope, ErrorFormatter) {
    $scope.setErrorMsg = function (msg) {
        var error = { message: msg };
        $scope.errorMsg = ErrorFormatter.buildErrorMsg('Error: ${message}', error);
    };
});
