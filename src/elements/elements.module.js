/**
 * @ngdoc overview
 * @name elements
 * @requires utilities
 * @description
 * # Elements
 * Elements are visual directives.
 *
 * ## Directives
 * * {@link elements.directive:rxAccountInfo rxAccountInfo}
 * * {@link elements.directive:rxActionMenu rxActionMenu}
 * * {@link elements.directive:rxButton rxButton}
 * * {@link elements.directive:rxCheckbox rxCheckbox}
 * * {@link elements.directive:rxDatePicker rxDatePicker}
 * * {@link elements.directive:rxMetadata rxMetadata}
 * * {@link elements.directive:rxTimePicker rxTimePicker}
 */
angular.module('encore.ui.elements', [
    'encore.ui.utilities',
    'ngSanitize',
    'ngAnimate'
]);
