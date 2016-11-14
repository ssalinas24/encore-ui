angular.module('encore.ui.utilities')
    .factory('rxProgressbarUtil', function () {
        var svc = {};

        svc.calculatePercent = function (val, max) {
            max = angular.isDefined(max) ? max : 100;

            // Lower Bound Check
            val = (val < 0 ? 0 : val);
            // Upper Bound Check
            val = (val > max ? max : val);

            // All 0
            if (val === 0 && max === 0) {
                return 100;
            }

            return +(100 * val / max).toFixed(0);
        };//calculatePercent()

        return svc;
    });
