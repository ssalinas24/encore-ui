/**
 * @ngdoc overview
 * @name rxPageTitle
 * @description
 * # rxPageTitle Component
 *
 * [TBD]
 *
 * ## Filters
 * * {@link rxPageTitle.filter:rxUnsafeRemoveHTML rxUnsafeRemoveHTML}
 *
 * ## Services
 * * {@link rxPageTitle.service:rxPageTitle rxPageTitle}
 */
angular.module('encore.ui.rxPageTitle', [])
/**
 * @ngdoc service
 * @name rxPageTitle.service:rxPageTitle
 * @description [TBD]
 */
.factory('rxPageTitle', function ($document, $filter) {
    var suffix = '',
        title = '';

    var addSuffix = function (t) {
        if (suffix !== '') {
            title = t + suffix;
        } else {
            title = t;
        }

    };

    var setDocumentTitle = function (t) {
        $document.prop('title', t);
    };

    return {
        setSuffix: function (s) {
            suffix = s;
        },
        getSuffix: function () {
            return suffix;
        },
        setTitle: function (t) {
            addSuffix(t);
            setDocumentTitle(title);
        },

        // Set the page title to `t`, and strip any HTML tags/entities
        // within it. This is considered unsafe, i.e. you *must* trust the
        // source of the input, as it allows arbitrary javascript to be executed
        setTitleUnsafeStripHTML: function (t) {
            addSuffix(t);
            setDocumentTitle($filter('rxUnsafeRemoveHTML')(title));
        },

        getTitle: function () {
            return $document.prop('title');
        }
    };
})
/**
 * @ngdoc filter
 * @name rxPageTitle.filter:rxUnsafeRemoveHTML
 * @description
 * Given a string, it removes all HTML tags from the string, using the
 * browser's own parsing engine. Any content inside of tags will be kept.
 *
 * NOTE: You must only use this with trusted text. See
 * http://stackoverflow.com/a/5002618 for more details
 *
 * @param {String} The string to remove HTML from
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
