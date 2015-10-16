/* jshint unused:false */
angular.module('demoApp')
.controller('tooltipsCtrl', function ($scope) {
    $scope.dynamicTooltip = 'I was defined in the controller!';
    $scope.htmlTooltip = '<span class="tooltip-header">A Tooltip Title</span><p>You can use HTML</p>';
});
