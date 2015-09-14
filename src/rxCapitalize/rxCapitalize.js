/**
 * @ngdoc overview
 * @name rxCapitalize
 * @description
 * # rxCapitalize Component
 *
 * [TBD]
 *
 * ## Filters
 * * {@link rxCapitalize.filter:rxCapitalize rxCapitalize}
 */
angular.module('encore.ui.rxCapitalize', [])
/**
 * @ngdoc filter
 * @name rxCapitalize.filter:rxCapitalize
 * @description [TBD]
 */
.filter('rxCapitalize', function () {
    return function (input) {
        if (!_.isString(input)) {
            return '';
        }
        return input.charAt(0).toUpperCase() + input.slice(1);
    };
});
