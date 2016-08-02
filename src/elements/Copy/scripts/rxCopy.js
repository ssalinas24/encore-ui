angular.module('encore.ui.elements')
/**
 * @name elements.directive:rxCopy
 * @ngdoc directive
 * @restrict E
 * @scope
 *
 * @requires $interpolate
 * @requires $interval
 * @requires $window
 * @requires utilities.service:rxCopyUtil
 *
 * @description
 * The rxCopy directive is designed to provide programmatic copy-to-clipboard
 * functionality for plain text on the screen.
 *
 * @example
 * <pre>
 * <rx-copy>
 *   This text will be copied to the system clipboard when you click the
 *   clipboard icon found nearby on the page.
 * </rx-copy>
 * </pre>
 */
.directive('rxCopy', function ($window, $interval, $interpolate, rxCopyUtil) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        templateUrl: 'templates/rxCopy.html',
        link: function (scope, element, attrs, controllers, transclude) {
            // first span in the template (aka. '.rxCopy__text')
            var copyTextNode = element.find('span')[0];

            var CopyState = {
                waiting: function () {
                    scope.copyState = 'waiting';
                    scope.tooltip = 'Click to Copy';
                },

                passed: function () {
                    scope.copyState = 'success';
                    scope.tooltip = 'Copied!';
                },

                failed: function () {
                    scope.copyState = 'fail';

                    if ($window.navigator.platform.match(/mac/i)) {
                        scope.tooltip = 'Press &#x2318;-C to copy.';
                    } else {
                        scope.tooltip = 'Press Ctrl-C to copy.';
                    }
                }//failed
            };//CopyState

            CopyState.waiting();

            // We use transclude so that we can trim any leading/trailing
            // whitespace from the wrapped text.  This is very difficult,
            // using the selection API alone.
            transclude(function (clone) {
                var cloneText = clone.text().trim();
                // $interpolate to ensure that angular expressions are evaluated
                // before setting the trimmed content
                scope.trimmedContent = $interpolate(cloneText)(scope.$parent);
            });

            scope.copyText = function () {
                // document.execCommand() requires a selection
                // before it can perform a copy operation
                rxCopyUtil.selectNodeText(copyTextNode);

                rxCopyUtil.execCopy(CopyState.passed, CopyState.failed);

                $interval(CopyState.waiting, 3000, 1);
            };//copyText()
        }
    };
});//rxCopy
