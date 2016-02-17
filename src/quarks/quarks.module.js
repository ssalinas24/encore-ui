/**
 * @ngdoc overview
 * @name quarks
 * @description
 * # Quarks
 * Quarks are non-visual elements that support Atoms and Molecules.
 *
 * ## Values & Constants
 * * {@link quarks.value:devicePaths devicePaths}
 * * {@link quarks.constant:feedbackApi feedbackApi}
 * * {@link quarks.value:feedbackTypes feedbackTypes}
 * * {@link quarks.object:rxStatusColumnIcons rxStatusColumnIcons}
 *
 * ## Controllers
 * * {@link quarks.controller:rxBulkSelectController rxBulkSelectController}
 * * {@link quarks.controller:rxFeedbackController rxFeedbackController}
 * * {@link quarks.controller:rxModalCtrl rxModalCtrl}
 * 
 * ## Filters
 * * {@link quarks.filter:Page Page}
 * * {@link quarks.filter:Paginate Paginate}
 * * {@link quarks.filter:PaginatedItemsSummary PaginatedItemsSummary}
 * * {@link quarks.filter:rxAge rxAge}
 * * {@link quarks.filter:rxCapitalize rxCapitalize}
 * * {@link quarks.filter:rxDiskSize rxDiskSize}
 * * {@link quarks.filter:rxEnvironmentMatch rxEnvironmentMatch}
 * * {@link quarks.filter:rxEnvironmentUrl rxEnvironmentUrl}
 * * {@link quarks.filter:rxSortEmptyTop rxSortEmptyTop}
 * * {@link quarks.filter:rxUnsafeRemoveHTML rxUnsafeRemoveHTML}
 * * {@link quarks.filter:titleize titleize}
 * * {@link quarks.filter:xor xor}
 *
 * ## Services
 * * {@link quarks.service:Auth Auth}
 * * {@link quarks.service:encoreRoutes encoreRoutes}
 * * {@link quarks.service:Environment Environment}
 * * {@link quarks.service:ErrorFormatter ErrorFormatter}
 * * {@link quarks.service:hotkeys hotkeys}
 * * {@link quarks.service:Identity Identity}
 * * {@link quarks.service:NotifyProperties NotifyProperties}
 * * {@link quarks.service:PageTracking PageTracking}
 * * {@link quarks.service:Permission Permission}
 * * {@link quarks.service:routesCdnPath routesCdnPath}
 * * {@link quarks.service:rxAppRoutes rxAppRoutes}
 * * {@link quarks.service:rxAutoSave rxAutoSave}
 * * {@link quarks.service:rxBreadcrumbsSvc rxBreadcrumbsSvc}
 * * {@link quarks.service:rxBulkSelectUtils rxBulkSelectUtils}
 * * {@link quarks.service:rxDOMHelper rxDOMHelper}
 * * {@link quarks.service:rxFeedbackSvc rxFeedbackSvc}
 * * {@link quarks.service:rxFormUtils rxFormUtils}
 * * {@link quarks.service:rxHideIfUkAccount rxHideIfUkAccount}
 * * {@link quarks.service:rxLocalStorage rxLocalStorage}
 * * {@link quarks.service:rxModalFooterTemplates rxModalFooterTemplates}
 * * {@link quarks.service:rxNestedElement rxNestedElement}
 * * {@link quarks.service:rxNotify rxNotify}
 * * {@link quarks.service:rxPageTitle rxPageTitle}
 * * {@link quarks.service:rxPaginateUtils rxPaginateUtils}
 * * {@link quarks.service:rxPromiseNotifications rxPromiseNotifications}
 * * {@link quarks.service:rxScreenshotSvc rxScreenshotSvc}
 * * {@link quarks.service:rxSortUtil rxSortUtil}
 * * {@link quarks.service:rxStatusMappings rxStatusMappings}
 * * {@link quarks.service:rxStatusTags rxStatusTags}
 * * {@link quarks.service:rxVisibility rxVisibility}
 * * {@link quarks.service:rxVisibilityPathParams rxVisibilityPathParams}
 * * {@link quarks.service:Session Session}
 * * {@link quarks.service:Status Status}
 * * {@link quarks.service:StatusUtil StatusUtil}
 * * {@link quarks.service:TokenInterceptor TokenInterceptor}
 * * {@link quarks.service:UnauthorizedInterceptor UnauthorizedInterceptor}
 * * {@link quarks.service:urlUtils urlUtils}
 */
angular.module('encore.ui.quarks', [
    'ngResource',
    'debounce',
]);
