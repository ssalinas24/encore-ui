angular.module('encore.ui.rxPaginate')
/**
 * @ngdoc directive
 * @name rxPaginate.directive:rxLoadingOverlay
 * @restrict A
 * @description
 * This directive can be used to show and hide a "loading" overlay on top
 * of any given element. Add this as an attribute to your element, and then
 * other sibling or child elements can require this as a controller.
 *
 * @method show - Shows the overlay
 * @method hide - Hides the overlay
 * @method showAndHide(promise) - Shows the overlay, and automatically
 * hides it when the given promise either resolves or rejects
 */
.directive('rxLoadingOverlay', function ($compile) {
    var loadingBlockHTML = '<div ng-show="_rxLoadingOverlayVisible" class="loading-overlay">' +
                                '<div class="loading-text-wrapper">' +
                                    '<i class="fa fa-fw fa-lg fa-spin fa-circle-o-notch"></i>' +
                                    '<div class="loading-text">Loading...</div>' +
                                '</div>' +
                            '</div>';

    return {
        restrict: 'A',
        controller: function ($scope) {
            this.show = function () {
                $scope._rxLoadingOverlayVisible = true;
            };

            this.hide = function () {
                $scope._rxLoadingOverlayVisible = false;
            };

            this.showAndHide = function (promise) {
                this.show();
                promise.finally(this.hide);
            };
        },
        link: function (scope, element) {
            // This target element has to have `position: relative` otherwise the overlay
            // will not sit on top of it
            element.css({ position: 'relative' });
            scope._rxLoadingOverlayVisible = false;

            $compile(loadingBlockHTML)(scope, function (clone) {
                element.append(clone);
            });
        }
    };
});
