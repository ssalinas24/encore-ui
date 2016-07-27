angular.module('encore.ui.utilities')

/**
 * @ngdoc filter
 * @name utilities.filter:rxTime
 * @description
 *
 * Converts dateString to standard Time format
 *
 *
 * <pre>
 * 2015-09-17T19:37:17Z → 2:37PM (UTC-05:00)
 * 2015-09-17T19:37:17Z, long → 2:37PM (UTC-05:00)
 * 2015-09-17T19:37:17Z, short → 14:37-05:00
 * </pre>
 **/
.filter('rxTime', function (rxMomentFormats) {
    return function (dateString, param) {
        var date = moment(dateString);
        if (date.isValid()) {
            if (_.has(rxMomentFormats.time, param)) {
                return date.format(rxMomentFormats.time[param]);
            } else {
                return date.format(rxMomentFormats.time['long']);
            }
        } else {
            return dateString;
        }
    };
});
