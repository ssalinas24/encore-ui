/*jshint unused:false*/
angular.module('demoApp')
.controller('hotkeysVolumeCtrl', function ($scope, hotkeys) {
    $scope.volume = 5;

    // Remove combos so we don't add them multiple times
    hotkeys.del('ctrl+up');
    hotkeys.del('ctrl+down');

    // Add desired combos
    hotkeys.add({
        combo: 'ctrl+up',
        description: 'Turn up the volume!',
        callback: function () {
            $scope.volume += 1;
        }
    });

    hotkeys.add({
        combo: 'ctrl+down',
        description: 'Turn it down!',
        callback: function () {
            $scope.volume -= 1;
        }
    });
});
