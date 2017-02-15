angular.module('encore.ui.rxPaginate')
/**
 * @ngdoc directive
 * @name rxPaginate.directive:rxPaginate
 * @restrict E
 * @description
 * Directive that takes in the page tracking object and outputs a page
 * switching controller. It can be used in conjunction with the Paginate
 * filter for UI-based pagination, or can take an optional serverInterface
 * object if you instead intend to use a paginated server-side API
 *
 * @param {Object} pageTracking This is the page tracking service instance to
 * be used for this directive. See {@link utilities.service:PageTracking}
 * @param {Number} numberOfPages This is the maximum number of pages that the
 * page object will display at a time.
 * @param {Object} [serverInterface] An object with a `getItems()` method. The requirements
 * of this method are described in the rxPaginate module documentation
 * @param {Object} [filterText] The model for the table filter input, if any. This directive
 * will watch that model for changes, and request new results from the paginated API, on change
 * @param {Object} [selections] The `selected` property of a SelectFilter instance, if one is being used.
 * This directive will watch the filter's selections, and request new results from the paginated API, on change
 * @param {Object} [sortColumn] The model containing the current column the results should sort on.
 * This directive will watch that column for changes, and request new results from the paginated API, on change
 * @param {Object} [sortDirection] The model containing the current direction of the current sort column. This
 * directive will watch for changes, and request new results from the paginated API, on change
 * @param {String} [errorMessage] An error message that should be displayed if a call to the request fails
 */
.directive('rxPaginate', function ($q, $compile, debounce, PageTracking, rxPromiseNotifications) {
    return {
        templateUrl: 'templates/rxPaginate.html',
        replace: true,
        restrict: 'E',
        require: [
            '?^rxLoadingOverlay',
            '?^rxFloatingHeader'
        ],
        scope: {
            pageTracking: '=',
            numberOfPages: '@',
            serverInterface: '=?',
            filterText: '=?',
            selections: '=?',
            sortColumn: '=?',
            sortDirection: '=?'
        },
        link: function (scope, element, attrs, ctrls) {
            var errorMessage = attrs.errorMessage;

            var rxLoadingOverlayCtrl = ctrls[0] || {
                show: _.noop,
                hide: _.noop,
                showAndHide: _.noop
            };

            var rxFloatingHeaderCtrl = ctrls[1] || {
                reapply: _.noop
            };

            // We need to find the `<table>` that contains
            // this `<rx-paginate>`
            var parentElement = element.parent();
            while (parentElement.length && parentElement[0].tagName !== 'TABLE') {
                parentElement = parentElement.parent();
            }

            var table = parentElement;

            scope.scrollToTop = function () {
                table[0].scrollIntoView(true);
            };

            // Everything here is restricted to using server-side pagination
            if (!_.isUndefined(scope.serverInterface)) {
                var params = function () {
                    var direction = scope.sortDirection ? 'DESCENDING' : 'ASCENDING';
                    return {
                        filterText: scope.filterText,
                        selections: scope.selections,
                        sortColumn: scope.sortColumn,
                        sortDirection: direction
                    };
                };

                var getItems = function (pageNumber, itemsPerPage) {
                    var response = scope.serverInterface.getItems(pageNumber,
                                                   itemsPerPage,
                                                   params());
                    rxLoadingOverlayCtrl.showAndHide(response);

                    if (errorMessage) {
                        rxPromiseNotifications.add(response, {
                            error: errorMessage
                        });
                    }
                    return response;
                };

                // Register the getItems function with the PageTracker
                scope.pageTracking.updateItemsFn(getItems);

                var notifyPageTracking = function () {
                    var pageNumber = 0;
                    scope.pageTracking.newItems(getItems(pageNumber, scope.pageTracking.itemsPerPage));
                };

                // When someone changes the sort column, it will go to the
                // default direction for that column. That could cause both
                // `sortColumn` and `sortDirection` to get changed, and
                // we don't want to cause two separate API requests to happen
                var columnOrDirectionChange = debounce(notifyPageTracking, 100);

                var textChange = debounce(notifyPageTracking, 500);

                var selectionChange = debounce(notifyPageTracking, 1000);

                var ifChanged = function (fn) {
                    return function (newVal,  oldVal) {
                        if (newVal !== oldVal) {
                            fn();
                        }
                    };
                };
                // Whenever the filter text changes (modulo a debounce), tell
                // the PageTracker that it should go grab new items
                if (!_.isUndefined(scope.filterText)) {
                    scope.$watch('filterText', ifChanged(textChange));
                }

                if (!_.isUndefined(scope.selections)) {
                    scope.$watch('selections', ifChanged(selectionChange), true);
                }

                if (!_.isUndefined(scope.sortColumn)) {
                    scope.$watch('sortColumn', ifChanged(columnOrDirectionChange));
                }
                if (!_.isUndefined(scope.sortDirection)) {
                    scope.$watch('sortDirection', ifChanged(columnOrDirectionChange));
                }

                notifyPageTracking();
            }

            /*
             * Wrap pageTracking functions to reapply floating header
             * when navigating to another page of data.
             */
            scope.goToFirstPage = function () {
                rxFloatingHeaderCtrl.reapply();
                scope.pageTracking.goToFirstPage();
            };

            scope.goToPrevPage = function () {
                rxFloatingHeaderCtrl.reapply();
                scope.pageTracking.goToPrevPage();
            };

            scope.goToPage = function (n) {
                rxFloatingHeaderCtrl.reapply();
                scope.pageTracking.goToPage(n);
            };

            scope.goToNextPage = function () {
                rxFloatingHeaderCtrl.reapply();
                scope.pageTracking.goToNextPage();
            };

            scope.goToLastPage = function () {
                rxFloatingHeaderCtrl.reapply();
                scope.pageTracking.goToLastPage();
            };
        }
    };
});
