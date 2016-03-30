/**
 * @ngdoc overview
 * @name molecules
 * @requires utilities
 * @requires atoms
 * @description
 * # Molecules
 * Molecules are complex elements made up of various Atoms.
 *
 * ## Directives
 * * {@link molecules.directive:rxDatePicker rxDatePicker}
 * * {@link molecules.directive:rxTimePicker rxTimePicker}
 */
angular.module('encore.ui.molecules', [
    'encore.ui.utilities',
    'encore.ui.atoms'
]);
