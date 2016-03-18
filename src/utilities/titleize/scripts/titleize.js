angular.module('encore.ui.utilities')
/**
 * @ngdoc filter
 * @name utilities.filter:titleize
 * @description
 * Convert a string to title case, stripping out underscores and capitalizing words.
 *
 * Credit where it's due: https://github.com/epeli/underscore.string/blob/master/titleize.js
 *
 * @param {String} inputString - The string to convert
 * @returns {String} The titleized version of the string
 *
 * @example
 * Both examples result in a string of `"A Simple String"`.
 * <pre>
 * {{ 'a simple_STRING' | titleize }}
 * </pre>
 *
 * <pre>
 * $filter('titleize')('a simple_STRING');
 * </pre>
 */
.filter('titleize', function () {
    return function (inputString) {
        return inputString
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/(?:^|\s)\S/g, function (character) {
                return character.toUpperCase();
            });
    };
});
