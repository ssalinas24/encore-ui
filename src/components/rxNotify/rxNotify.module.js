/**
 * @ngdoc overview
 * @name rxNotify
 * @description
 * # rxNotify Component
 *
 * The rxNotify component provides status message notifications on a page.
 *
 * There may be situations where you will need to use the styling/markup of
 * rxNotify's messaging queue in status messages of your own - for example,
 * a modal window which asks if you want to delete an object, with the
 * appropriate warning or error flags. If this is the case, we recommend using
 * the {@link rxNotify.directive:rxNotification rxNotification} directive in your views.  Please note, this
 * differs from {@link rxNotify.directive:rxNotifications rxNotifications} (plural).
 *
 * The type attribute can be any type supported by `options.type` for the `rxNotify.add()` function in
 * the {@link utilities.service:rxNotify rxNotify} service.
 *
 * ## Directives
 * * {@link rxNotify.directive:rxNotification rxNotification}
 * * {@link rxNotify.directive:rxNotifications rxNotifications}
 *
 * # Use Cases
 *
 * ## Add Notification in Loading State
 * <pre>
 * rxNotify.add('Loading', {
 *     loading: true,
 *     dismiss: [$scope, 'loaded']
 * });
 * var apiCallback = function (data) {
 *     $scope.loaded = true;
 *     // do something with the data
 * };
 * </pre>
 *
 * ## Show Notification on Variable Change
 * <pre>
 * $scope.loaded = false;
 * rxNotify.add('Content Loaded', {
 *     show: [$scope, 'loaded']
 * });
 * $timeout(function () {
 *     $scope.loaded = true;
 * }, 1500);
 * </pre>
 *
 *
 * ## Dismiss Notification on Variable Change
 * <pre>
 * $scope.loaded = false;
 * rxNotify.add('Content Loaded', {
 *     dismiss: [$scope, 'loaded']
 * });
 * $timeout(function () {
 *     $scope.loaded = true;
 * }, 1500);
 * </pre>
 *
 *
 * ## Using a Custom Stack
 * Say you want to create a stack for a login form.
 * Let's call the stack 'loginForm' to reference in our code.
 *
 * **Controller**
 * <pre>
 * rxNotify.add('Username required', {
 *     type: 'error',
 *     stack: 'loginForm'
 * });
 * </pre>
 *
 * **View**
 * <pre>
 * <rx-notifications stack="loginForm"></rx-notifications>
 * </pre>
 */
angular.module('encore.ui.rxNotify', [
    'ngSanitize',
    'ngAnimate',
    'encore.ui.utilities'
]);
