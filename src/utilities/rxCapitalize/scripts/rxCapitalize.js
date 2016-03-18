angular.module('encore.ui.utilities')
/**
 * @ngdoc filter
 * @name utilities.filter:rxCapitalize
 * @description
 * The `rxCapitalize` filter capitalizes the first word in a string via an Angular filter.
 */
.filter('rxCapitalize', function () {
    return function (input) {
        if (!_.isString(input)) {
            return '';
        }
        return input.charAt(0).toUpperCase() + input.slice(1);
    };
});
