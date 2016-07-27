angular.module('encore.ui.utilities')

/**
 * @ngdoc filter
 * @name utilities.filter:rxDate
 * @description
 *
 * Converts dateString to standard Date format
 *
 *
 * <pre>
 * 2015-09-17T19:37:17Z → September 17, 2015
 * 2015-09-17T19:37:17Z, long → September 17, 2015
 * 2015-09-17T19:37:17Z, short → 2015-09-17
 * </pre>
 **/
.filter('rxDate', function (rxMomentFormats) {
    return function (dateString, param) {
        var date = moment(dateString);
        if (date.isValid()) {
            if (_.has(rxMomentFormats.date, param)) {
                return date.format(rxMomentFormats.date[param]);
            } else {
                return date.format(rxMomentFormats.date['long']);
            }
        } else {
            return dateString;
        }
    };
});
