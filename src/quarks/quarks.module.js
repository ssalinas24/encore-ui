/**
 * @ngdoc overview
 * @name quarks
 * @description
 * # Quarks
 * Quarks are non-visual elements that support Atoms and Molecules.
 *
 * ## Values & Constants
 * * {@link quarks.value:devicePaths devicePaths}
 *
 * ## Filters
 * * {@link quarks.filter:xor xor}
 * * {@link quarks.filter:rxCapitalize rxCapitalize}
 * * {@link quarks.filter:rxDiskSize rxDiskSize}
 * * {@link quarks.filter:rxAge rxAge}
 * * {@link quarks.filter:titleize titleize}
 * * {@link quarks.filter:rxEnvironmentMatch rxEnvironmentMatch}
 * * {@link quarks.filter:rxEnvironmentUrl rxEnvironmentUrl}
 * * {@link quarks.filter:rxUnsafeRemoveHTML rxUnsafeRemoveHTML}
 * * {@link quarks.filter:rxSortEmptyTop rxSortEmptyTop}
 *
 * ## Services
 * * {@link quarks.service:hotkeys hotkeys}
 * * {@link quarks.service:SessionStorage SessionStorage}
 * * {@link quarks.service:rxBreadcrumbsSvc rxBreadcrumbsSvc}
 * * {@link quarks.service:SelectFilter SelectFilter}
 * * {@link quarks.service:rxNestedElement rxNestedElement}
 * * {@link quarks.service:Environment Environment}
 * * {@link quarks.service:rxPromiseNotifications rxPromiseNotifications}
 * * {@link quarks.service:rxSortUtil rxSortUtil}
 * * {@link quarks.service:Identity Identity}
 * * {@link quarks.service:rxStatusMappings rxStatusMappings}
 * * {@link quarks.service:ErrorFormatter ErrorFormatter}
 * * {@link quarks.service:rxFeedbackSvc rxFeedbackSvc}
 * * {@link quarks.service:rxLocalStorage rxLocalStorage}
 * * {@link quarks.service:rxAutoSave rxAutoSave}
 * * {@link quarks.service:rxDOMHelper rxDOMHelper}
 * * {@link quarks.service:rxScreenshotSvc rxScreenshotSvc}
 */
angular.module('encore.ui.quarks', [
    'ngResource',
    'debounce',
]);
