angular.module('demoApp')
.controller('rxBreadcrumbsCtrl', function ($scope, rxBreadcrumbsSvc) {
    rxBreadcrumbsSvc.set([{
        path: '/#/components',
        name: 'Components',
    }, {
        name: '<strong>All Components</strong>',
        status: 'demo'
    }]);
});
