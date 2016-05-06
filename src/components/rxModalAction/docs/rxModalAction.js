angular.module('demoApp')
.controller('rxModalActionCtrl', function ($scope, rxNotify) {
    $scope.password = 'guest';

    $scope.populate = function (modalScope) {
        modalScope.user = 'hey_dude';
    };

    $scope.changePass = function (fields) {
        $scope.password = fields.password;
        rxNotify.add('Password Updated!', {
            type: 'success'
        });
    };

    $scope.notifyDismissal = function () {
        rxNotify.add('Password Unchanged', {
            type: 'info'
        });
    };
})
.controller('rxModalStateCtrl', function ($scope, $modalInstance, $timeout, rxNotify) {
    var complete = function () {
        $scope.loaded = true;
        $scope.setState('complete');
        rxNotify.add('Operation Success!', {
            stack: 'modal',
            type: 'success'
        });
    };

    $scope.submit = function () {
        $scope.setState('confirm');
    };

    $scope.confirm = function () {
        $scope.loaded = false;
        $scope.setState('pending');
        rxNotify.add('Performing Operation...', {
            stack: 'modal',
            loading: true,
            dismiss: [$scope, 'loaded']
        });
        $timeout(complete, 2000);
    };

    $scope.cancel = function () {
        rxNotify.clear('modal');

        /*
         * You may place custom dismiss logic here,
         * if you do not wish to use a `dismiss-hook` function.
         **/

        // This must be called to dismiss the modal.
        $modalInstance.dismiss();
    };
});
