/**
 * @ngdoc overview
 * @name utilities
 * @description
 * # Utilities
 * Utilities are modules related to:
 *
 * * business logic
 *   * values, constants, controllers, services
 * * display logic & application flow control
 *   * convenience, "if"-like, and "switch"-like directives
 *   * filters
 *
 * ## Values & Constants
 * * {@link utilities.value:devicePaths devicePaths}
 * * {@link utilities.constant:feedbackApi feedbackApi}
 * * {@link utilities.value:feedbackTypes feedbackTypes}
 * * {@link utilities.object:rxStatusColumnIcons rxStatusColumnIcons}
 *
 * ## Controllers
 * * {@link utilities.controller:rxBulkSelectController rxBulkSelectController}
 * * {@link utilities.controller:rxFeedbackController rxFeedbackController}
 * * {@link utilities.controller:rxModalCtrl rxModalCtrl}
 *
 * ## Directives
 * * {@link utilities.directive:rxFavicon rxFavicon}
 *
 * ## Filters
 * * {@link utilities.filter:Page Page}
 * * {@link utilities.filter:Paginate Paginate}
 * * {@link utilities.filter:PaginatedItemsSummary PaginatedItemsSummary}
 * * {@link utilities.filter:rxAge rxAge}
 * * {@link utilities.filter:rxCapitalize rxCapitalize}
 * * {@link utilities.filter:rxDiskSize rxDiskSize}
 * * {@link utilities.filter:rxEnvironmentMatch rxEnvironmentMatch}
 * * {@link utilities.filter:rxEnvironmentUrl rxEnvironmentUrl}
 * * {@link utilities.filter:rxSortEmptyTop rxSortEmptyTop}
 * * {@link utilities.filter:rxUnsafeRemoveHTML rxUnsafeRemoveHTML}
 * * {@link utilities.filter:titleize titleize}
 * * {@link utilities.filter:xor xor}
 *
 * ## Services
 * * {@link utilities.service:Auth Auth}
 * * {@link utilities.service:encoreRoutes encoreRoutes}
 * * {@link utilities.service:Environment Environment}
 * * {@link utilities.service:ErrorFormatter ErrorFormatter}
 * * {@link utilities.service:hotkeys hotkeys}
 * * {@link utilities.service:Identity Identity}
 * * {@link utilities.service:NotifyProperties NotifyProperties}
 * * {@link utilities.service:PageTracking PageTracking}
 * * {@link utilities.service:Permission Permission}
 * * {@link utilities.service:routesCdnPath routesCdnPath}
 * * {@link utilities.service:rxAppRoutes rxAppRoutes}
 * * {@link utilities.service:rxAutoSave rxAutoSave}
 * * {@link utilities.service:rxBreadcrumbsSvc rxBreadcrumbsSvc}
 * * {@link utilities.service:rxBulkSelectUtils rxBulkSelectUtils}
 * * {@link utilities.service:rxDOMHelper rxDOMHelper}
 * * {@link utilities.service:rxFeedbackSvc rxFeedbackSvc}
 * * {@link utilities.service:rxFormUtils rxFormUtils}
 * * {@link utilities.service:rxLocalStorage rxLocalStorage}
 * * {@link utilities.service:rxModalFooterTemplates rxModalFooterTemplates}
 * * {@link utilities.service:rxNestedElement rxNestedElement}
 * * {@link utilities.service:rxNotify rxNotify}
 * * {@link utilities.service:rxPageTitle rxPageTitle}
 * * {@link utilities.service:rxPaginateUtils rxPaginateUtils}
 * * {@link utilities.service:rxPromiseNotifications rxPromiseNotifications}
 * * {@link utilities.service:rxScreenshotSvc rxScreenshotSvc}
 * * {@link utilities.service:rxSortUtil rxSortUtil}
 * * {@link utilities.service:rxStatusMappings rxStatusMappings}
 * * {@link utilities.service:rxStatusTags rxStatusTags}
 * * {@link utilities.service:rxVisibility rxVisibility}
 * * {@link utilities.service:rxVisibilityPathParams rxVisibilityPathParams}
 * * {@link utilities.service:Session Session}
 * * {@link utilities.service:Status Status}
 * * {@link utilities.service:StatusUtil StatusUtil}
 * * {@link utilities.service:TokenInterceptor TokenInterceptor}
 * * {@link utilities.service:UnauthorizedInterceptor UnauthorizedInterceptor}
 * * {@link utilities.service:urlUtils urlUtils}
 */
angular.module('encore.ui.utilities', [
    'ngResource',
    'debounce',
]);
