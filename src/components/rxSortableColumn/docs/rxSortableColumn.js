angular.module('demoApp')
.controller('rxSortableColumnCtrl', function ($scope, PageTracking, rxSortUtil) {
    $scope.sort = rxSortUtil.getDefault('name');
    $scope.sort = rxSortUtil.getDefault('name', false);
    $scope.pager = PageTracking.createInstance();

    $scope.sortCol = function (predicate) {
        return rxSortUtil.sortCol($scope, predicate);
    };

    $scope.talentPool = [
        {
            name: 'Andrew Yurisich',
            jobTitle: 'Mailroom Associate IV'
        },
        {
            name: 'Patrick Deuley',
            jobTitle: 'Design Chaplain'
        },
        {
            name: null,
            jobTitle: 'Chief Mastermind'
        },
        {
            jobTitle: 'Assistant Chief Mastermind'
        },
        {
            name: 'Hussam Dawood',
            jobTitle: 'Evangelist of Roger Enriquez'
        },
        {
            name: 'Kerry Bowley',
            jobTitle: 'Dev Mom'
        },
    ];
});
