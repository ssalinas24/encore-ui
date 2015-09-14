/**
 * @ngdoc overview
 * @name rxCharacterCount
 * @description
 * # rxCharacterCount Component
 *
 * [TBD]
 *
 * ## Directives
 * * {@link rxCharacterCount.directive:rxCharacterCount rxCharacterCount}
 */
angular.module('encore.ui.rxCharacterCount', [])
/**
 * @ngdoc directive
 * @name rxCharacterCount.directive:rxCharacterCount
 * @restrict A
 * @scope
 * @description
 * Monitors the number of characters in a text input and compares it to the desired length.
 *
 * @param {Number=} [low-boundary=10] How far from the maximum to enter a warning state
 * @param {Number=} [max-characters=254] The maximum number of characters allowed
 * @param {Boolean=} [highlight=false] Whether or not characters over the limit are highlighted
 *
 * @example
 * <pre>
 * <textarea ng-model="model" rx-character-count></textarea>
 * </pre>
 */
.directive('rxCharacterCount', function ($compile) {
    var counterStart = '<div class="character-countdown" ';
    var counterEnd =   'ng-class="{ \'near-limit\': nearLimit, \'over-limit\': overLimit }"' +
                  '>{{ remaining }}</div>';

    var backgroundStart = '<div class="input-highlighting" ';
    var backgroundEnd = '><span>{{ underLimitText }}</span>' +
                     '<span class="over-limit-text">{{ overLimitText }}</span></div>';

    var extraDirectives = function (attrs) {
        var extra = '';
        if (_.has(attrs, 'ngShow')) {
            extra += 'ng-show="' + attrs.ngShow + '" ';
        }
        if (_.has(attrs, 'ngHide')) {
            extra += 'ng-hide="' + attrs.ngHide + '" ';
        }
        return extra;
    };

    var buildCounter = function (attrs) {
        return counterStart + extraDirectives(attrs) + counterEnd;
    };

    var buildBackground = function (attrs) {
        return backgroundStart + extraDirectives(attrs) + backgroundEnd;
    };

    return {
        restrict: 'A',
        require: 'ngModel',
        // scope:true ensures that our remaining/nearLimit/overLimit scope variables
        // only live within this directive
        scope: true,
        link: function (scope, element, attrs, ngModelCtrl) {
            // Wrap the textarea so that an element containing a copy of the text
            // can be layered directly behind it.
            var wrapper = angular.element('<div class="counted-input-wrapper" />');
            element.after(wrapper);

            $compile(buildCounter(attrs))(scope, function (clone) {
                wrapper.append(element);
                wrapper.append(clone);
            });

            var maxCharacters = _.parseInt(attrs.maxCharacters) || 254;
            var lowBoundary = _.parseInt(attrs.lowBoundary) || 10;
            scope.remaining = maxCharacters;
            scope.nearLimit = false;
            scope.overLimit = false;

            // This gets called whenever the ng-model for this element
            // changes, i.e. when someone enters new text into the textarea
            scope.$watch(
                function () { return ngModelCtrl.$modelValue; },
                function (newValue) {
                    if (typeof newValue !== 'string') {
                        return;
                    }
                    scope.remaining = maxCharacters - newValue.length;
                    scope.nearLimit = scope.remaining >= 0 && scope.remaining < lowBoundary;
                    scope.overLimit = scope.remaining < 0;
                });

            function countSpaces (str, options) {
                options || (options = {});
                return str.search(options.fromEnd ? /\s*$/ : /\S/);
            }

            // Since the input value is trimmed before writing to the model,
            // an input event is attached to the element to handle the highlighting,
            // which needs the pre- and post-trimmed string.
            function writeLimitText () {
                var val = element.val();
                var cutoff = maxCharacters;
                var end = val.length;

                if (!attrs.ngTrim || attrs.ngTrim !== 'false') {
                    cutoff += countSpaces(val);
                    end = countSpaces(val, { fromEnd: true });
                }

                scope.underLimitText = val.slice(0, cutoff);
                scope.overLimitText = val.slice(cutoff, end);
                scope.$apply();
            }

            if (attrs.highlight === 'true') {
                $compile(buildBackground(attrs))(scope, function (clone) {
                    wrapper.prepend(clone);
                });

                element.on('input', writeLimitText);
            }

            scope.$on('$destroy', function () {
                element.off('input', writeLimitText);
                wrapper.remove();
            });
        }
    };
});
