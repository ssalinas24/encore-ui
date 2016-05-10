angular.module('encore.ui.rxForm')
/**
 * @name rxForm.directive:rxFormFieldset
 * @deprecated
 * @ngdoc directive
 * @restrict E
 * @scope
 * @description
 * **DEPRECATED** - This directive has been marked as deprecated and *will be removed* in a future
 * release of the EncoreUI framework.  Please see current rxForm documentation for updated
 * functionality.
 *
 * This directive is used to wrap a set of input fields in the proper HTML
 *
 * @param {String} legend - Text to use for <legend>
 * @param {String} description - Text to place below input
 */
.directive('rxFormFieldset', function () {
    var warnMsg = 'DEPRECATION WARNING: rxFormFieldset has been marked as deprecated ' +
        'and will be removed in a future release of the EncoreUI framework. ' +
        'Please see current rxForm documentation for updated functionality.';
    console.warn(warnMsg);

    return {
        restrict: 'E',
        templateUrl: 'templates/rxFormFieldset.html',
        transclude: true,
        scope: {
            legend: '@',
            description: '@'
        }
    };
});
