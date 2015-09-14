/**
 * @ngdoc overview
 * @name rxInfoPanel
 * @description
 * # rxInfoPanel Component
 *
 * [TBD]
 *
 * ## Directives
 * * {@link rxInfoPanel.directive:rxInfoPanel rxInfoPanel}
 */
angular.module('encore.ui.rxInfoPanel', [])
/**
 * @ngdoc directive
 * @name rxInfoPanel.directive:rxInfoPanel
 * @restrict E
 * @scope
 * @description
 * Renders a generic, pre-styled, info panel, with an optional title.
 *
 * @param {String} title - Text to be displayed in the title area of the info panel
 */
.directive('rxInfoPanel', function () {
    return {
        templateUrl: 'templates/rxInfoPanel.html',
        restrict: 'E',
        transclude: true,
        scope: {
            panelTitle: '@',
        }
    };
});
