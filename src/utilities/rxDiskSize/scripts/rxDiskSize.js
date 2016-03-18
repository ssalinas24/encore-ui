angular.module('encore.ui.utilities')
/**
 * @ngdoc filter
 * @name utilities.filter:rxDiskSize
 * @description
 *
 * Converts GB disk size into a more readable format (e.g. GBs, TBs, PBs)
 *
 *
 * <pre>
 * 420 → 420 GB
 * 125000 → 125 TB
 * 171337000 → 171.337 PB
 * </pre>
 **/
.filter('rxDiskSize', function () {
    return function (size, unit) {
        var units = ['GB', 'TB', 'PB'];
        var index = _.indexOf(units, unit);

        if (index === -1) {
            if (size > 0) {
                index = Math.floor(Math.log(size) / Math.log(1000));
            } else {
                index = 0;
                size = 0;
            }
        }

        return size / Math.pow(1000, Math.floor(index)).toFixed(1) + ' ' + units[index];
    };
});
