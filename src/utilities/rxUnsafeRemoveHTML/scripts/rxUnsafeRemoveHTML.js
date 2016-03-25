angular.module('encore.ui.utilities')
/**
 * @ngdoc filter
 * @name utilities.filter:rxUnsafeRemoveHTML
 * @description
 * Given a string, it removes all HTML tags from the string, using the
 * browser's own parsing engine. Any content inside of tags will be kept.
 *
 * **NOTE:** You must only use this with **trusted text**. See this
 * {@link http://stackoverflow.com/a/5002618 StackOverflow} answer for more details.
 *
 * @param {String} htmlString The string to remove HTML from **trusted text**
 * @returns {String} Cleaned string
 */
.filter('rxUnsafeRemoveHTML', function ($document) {
    return function (htmlString) {
        // protect against null, which can crash some browsers
        if (_.isEmpty(htmlString)) {
            htmlString = '';
        }

        var div = $document[0].createElement('div');
        div.innerHTML = htmlString;
        return div.textContent || div.innerText || '';
    };
});
