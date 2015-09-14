/**
 * @ngdoc overview
 * @name rxDiskSize
 * @description
 * # rxDiskSize Component
 *
 * [TBD]
 *
 * ## Filters
 * * {@link rxDiskSize.filter:rxDiskSize rxDiskSize}
 */
angular.module('encore.ui.rxDiskSize', [])
/**
 * @ngdoc filter
 * @name rxDiskSize.filter:rxDiskSize
 * @description [TBD]
 */
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
