angular.module('encore.ui.utilities')

/**
 * @ngdoc filter
 * @name utilities.filter:rxMonth
 * @description
 *
 * Converts dateString to standard Month format
 *
 *
 * <pre>
 * 2015-09-17T19:37:17Z → September 2015
 * 2015-09-17T19:37:17Z, long → September 2015
 * 2015-09-17T19:37:17Z, short → 09 / 2015
 * 2015-09-17T19:37:17Z, micro → 09 / 15
 * </pre>
 **/
.filter('rxMonth', function (rxMomentFormats) {
    return function (dateString, param) {
        var date = moment(dateString);
        if (date.isValid()) {
            if (_.has(rxMomentFormats.month, param)) {
                return date.format(rxMomentFormats.month[param]);
            } else {
                return date.format(rxMomentFormats.month['long']);
            }
        } else {
            return dateString;
        }
    };
});
