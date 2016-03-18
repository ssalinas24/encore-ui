angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxPageTitle
 * @description
 *  `rxPageTitle` service manages page titles.
 *
 * Two methods are available for setting the page title:
 *
 * First, `setTitle()` simply sets the title to whatever raw string is passed in.
 *
 * Second, `setTitleUnsafeStripHTML()` strips any HTML tags from the string, and sets the title to
 * the result. This uses the
 * [technique found here](http://stackoverflow.com/questions/5002111/javascript-how-to-strip-html-tags-from-string).
 * Note the caveats listed there, namely:
 *
 * 1. Only tags valid within `<div>` will be correctly stripped out
 * 2. You should not have  any `<script>` tags within the title
 * 3. You should not pass `null` as the title
 * 4. The title must come from a trusted source, i.e. danger danger danger
 *    `<img onerror="alert('could run arbitrary JS here')" src=bogus />`
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
});
