angular.module('encore.ui.utilities')

/**
 * @ngdoc filter
 * @name utilities.filter:rxDateTime
 * @description
 *
 * Converts dateString to standard DateTime format
 *
 *
 * <pre>
 * 2015-09-17T19:37:17Z → Sep 17, 2015 @ 2:37PM (UTC-05:00)
 * 2015-09-17T19:37:17Z, long → Sep 17, 2015 @ 2:37PM (UTC-05:00)
 * 2015-09-17T19:37:17Z, short → 2015-09-17 @ 14:37-05:00
 * </pre>
 **/
.filter('rxDateTime', function (rxMomentFormats) {
    return function (dateString, param) {
        var date = moment(dateString);
        if (date.isValid()) {
            if (_.has(rxMomentFormats.dateTime, param)) {
                return date.format(rxMomentFormats.dateTime[param]);
            } else {
                return date.format(rxMomentFormats.dateTime['long']);
            }
        } else {
            return dateString;
        }
    };
});
