angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxCopyUtil
 *
 * @description
 * Utility service used by {@link elements.directive:rxCopy rxCopy}.
 */
.factory('rxCopyUtil', function ($window) {
    /**
     * @ngdoc method
     * @methodOf utilities.service:rxCopyUtil
     * @name selectNodeText
     * @param {Node} elementNode HTML element node, from which to select text
     *
     * @description Use Selection and Range APIs to select text in an HTML element.
     *
     * * {@link https://developer.mozilla.org/en-US/docs/Web/API/Selection Selection API}
     *   ({@link http://caniuse.com/#feat=selection-api caniuse})
     * * {@link https://developer.mozilla.org/en-US/docs/Web/API/Range Range API}
     *   ({@link http://caniuse.com/#feat=dom-range caniuse})
     */
    function selectNodeText (elementNode) {
        var range = document.createRange();
        var selection = $window.getSelection();

        // Unselect everything
        selection.removeAllRanges();

        // Add all transcluded text to the range
        range.selectNodeContents(elementNode);

        // Apply text selection to window
        selection.addRange(range);
    }//selectNodeText()

    /**
     * @ngdoc method
     * @methodOf utilities.service:rxCopyUtil
     * @name execCopy
     * @param {Function=} passFn Success callback
     * @param {Function=} failFn Failure callback.
     * If an error is present, it will be passed as an argument to the callback.
     *
     * @description Attempt to invoke clipboard API, and call expected
     * callback if the attempt succeeds or fails.
     *
     * **NOTE:** Of our supported browsers, Firefox 41+ and Chrome 43+ are the
     * minimum versions required for this to pass dependably. Other browsers and
     * older versions of supported browsers may see varying results.
     *
     * * {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand document.execCommand()}
     *   ({@link http://caniuse.com/#feat=document-execcommand caniuse})
     */
    function execCopy (passFn, failFn) {
        try {
            if (document.execCommand('copy')) {
                _.isFunction(passFn) && passFn();
            } else {
                _.isFunction(failFn) && failFn();
            }
        } catch (e) {
            _.isFunction(failFn) && failFn(e);
        }
    }//execCopy

    return {
        selectNodeText: selectNodeText,
        execCopy: execCopy
    };
});//rxCopyUtil
