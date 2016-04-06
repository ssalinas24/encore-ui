angular.module('demoApp')
.controller('tablePaginateExampleController', function ($scope, PageTracking) {
    $scope.pager = PageTracking.createInstance();
    $scope.people = [
        { name: 'Patrick Deuley', occupation: 'Design Chaplain' },
        { name: 'Hussam Dawood', occupation: 'Cat Lover' }
    ];
});
