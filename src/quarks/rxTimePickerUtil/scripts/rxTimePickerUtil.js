angular.module('encore.ui.quarks')
/**
 * @ngdoc service
 * @name quarks.service:rxTimePickerUtil
 *
 * @description
 * Utility service used by {@link molecules.directive:rxTimePicker rxTimePicker}.
 */
.factory('rxTimePickerUtil', function () {
    /**
     * @ngdoc property
     * @propertyOf quarks.service:rxTimePickerUtil
     * @name modelFormat
     * @description formatting mask for Time model/data values
     */
    var modelFormat = 'HH:mmZ';

    /**
     * @ngdoc property
     * @propertyOf quarks.service:rxTimePickerUtil
     * @name viewFormat
     * @description formatting mask for Time view/display values
     */
    var viewFormat = 'HH:mm (UTCZZ)';

    /**
     * @ngdoc method
     * @methodOf quarks.service:rxTimePickerUtil
     * @name parseUtcOffset
     * @param {String} stringValue string containing UTC offset
     * @return {String} UTC Offset value
     *
     * @description parse offset value from given string, if present
     *
     * **NOTE:** Logic in this function must match the logic in
     * the page object.
     */
    function parseUtcOffset (stringValue) {
        var regex = /([-+]\d{2}:?\d{2})/;
        var matched = stringValue.match(regex);
        return (matched ? matched[0] : '');
    }//parseUtcOffset()

    /**
     * @ngdoc method
     * @methodOf quarks.service:rxTimePickerUtil
     * @name modelToObject
     * @param {String} stringValue time in `HH:mmZ` format
     * @return {Object} parsed data object
     *
     * @description
     * Parse the model value to fetch hour, minutes, period, and offset
     * to populate the picker form with appropriate values.
     */
    function modelToObject (stringValue) {
        var momentValue = moment(stringValue, modelFormat);
        var offset = parseUtcOffset(stringValue);
        var parsed = {
            hour: '',
            minutes: '',
            period: 'AM',
            offset: (_.isEmpty(offset) ? '+0000' : offset)
        };

        if (!_.isEmpty(offset)) {
            momentValue.utcOffset(offset);
        }

        if (momentValue.isValid()) {
            parsed.hour = momentValue.format('h');
            parsed.minutes = momentValue.format('mm');
            parsed.period = momentValue.format('A');
        }

        return parsed;
    }//modelToObject()

    return {
        parseUtcOffset: parseUtcOffset,
        modelToObject: modelToObject,
        modelFormat: modelFormat,
        viewFormat: viewFormat,
    };
});//rxTimePickerUtil
