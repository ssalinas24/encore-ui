angular.module('encore.ui.utilities')

/**
 * @ngdoc filter
 * @name utilities.filter:rxByteSize
 * @description
 *
 * Converts Byte disk size into a more readable format (e.g. MBs, GBs, TBs, PBs)
 *
 *
 * <pre>
 * 1000 → 1 KB
 * 12000000 → 12 MB
 * </pre>
 **/
.filter('rxBytesConvert', function () {
    return function (bytes, unit) {
        var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var index;

        // check if unit is in the list of units
        if (_.isUndefined(unit) || _.indexOf(units, unit.toUpperCase()) === -1) {
            // determine closest unit
            if (bytes > 0) {
                index = Math.floor(Math.log(bytes) / Math.log(1000));
                if (index > 5) {
                    index = 5; // if the data is too large, default PB
                }
            } else {
                index = 0;
                bytes = 0;
            }
        } else {
            index = _.indexOf(units, unit.toUpperCase());
        }

        // calculate result in exected unit
        var result = bytes / Math.pow(1000, index);
        // check if result is integer (karma doesn't know Number.isInteger())
        // https://github.com/ariya/phantomjs/issues/14014
        if (result % 1 === 0) {
            return result + ' ' + units[index];
        } else {
            return result.toFixed(2) + ' ' + units[index];
        }
    };
});

