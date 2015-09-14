/**
 * @ngdoc overview
 * @name rxStatusColumn
 * @description
 * # rxStatusColumn Component
 *
 * [TBD]
 *
 * ## Directives
 * * {@link rxStatusColumn.directive:rxStatusColumn rxStatusColumn}
 * * {@link rxStatusColumn.directive:rxStatusHeader rxStatusHeader}
 *
 * ## Objects/Values
 * * {@link rxStatusColumn.object:rxStatusColumnIcons rxStatusColumnIcons}
 *
 * ## Services
 * * {@link rxStatusColumn.service:rxStatusMappings rxStatusMappings}
 */
angular.module('encore.ui.rxStatusColumn', [])
/**
 * @ngdoc directive
 * @name rxStatusColumn.directive:rxStatusColumn
 * @restrict A
 * @scope
 * @description
 * A directive for drawing colored status columns in a table. This
 * takes the place of the <td></td> for the column it's in.
 *
 * @param {String} status The status to draw
 * @param {String} [api] Optionally specify which API mapping to use for the status
 * @param {String} [tooltip] The string to use for the tooltip. If omitted,
 *                           it will default to using the passed in status
 */
.directive('rxStatusColumn', function (rxStatusMappings, rxStatusColumnIcons) {
    return {
        templateUrl: 'templates/rxStatusColumn.html',
        restrict: 'A',
        scope: {
            status: '@',
            api: '@',
            tooltipContent: '@'
        },
        link: function (scope, element) {

            var lastStatusClass = '';

            var updateTooltip = function () {
                scope.tooltipText = scope.tooltipContent || scope.status || '';
            };

            var setStatus = function (status) {
                scope.mappedStatus = rxStatusMappings.getInternalMapping(status, scope.api);
                updateTooltip();

                // We use `fa-exclamation-circle` when no icon should be visible. Our LESS file
                // makes it transparent
                scope.statusIcon = rxStatusColumnIcons[scope.mappedStatus] || 'fa-exclamation-circle';
                element.addClass('status');
                element.removeClass(lastStatusClass);
                lastStatusClass = 'status-' + scope.mappedStatus;
                element.addClass(lastStatusClass);
                element.addClass('rx-status-column');
            };

            scope.$watch('status', function (newStatus) {
                setStatus(newStatus);
            });

            scope.$watch('tooltipContent', function () {
                updateTooltip();
            });
        }
    };
})
/**
 * @ngdoc object
 * @name rxStatusColumn.object:rxStatusColumnIcons
 * @description
 * Mapping of internal statuses to FontAwesome icons.
 * The keys map to the names defined in rxStatusColumn.less
 */
.value('rxStatusColumnIcons', {
    'ERROR': 'fa-ban',
    'WARNING': 'fa-exclamation-triangle',
    'INFO': 'fa-info-circle',
})
/**
 * @ngdoc directive
 * @name rxStatusColumn.directive:rxStatusHeader
 * @description
 * Place this attribute directive on the `<th>` for the status columns. It ensures
 * correct styling.
 *
 */
.directive('rxStatusHeader', function () {
    return {
        link: function (scope, element) {
            element.addClass('rx-status-header');
        }
    };
})
/**
 * @ngdoc service
 * @name rxStatusColumn.service:rxStatusMappings
 * @description
 * A set of methods for creating mappings between a product's notion
 * of statuses, and the status identifiers used in encore-ui
 */
.factory('rxStatusMappings', function () {
    var globalMappings = {};
    var apiMappings = {};
    var rxStatusMappings = {};

    var upperCaseCallback = function (objectValue, sourceValue) {
        return sourceValue.toUpperCase();
    };

    // Takes a full set of mappings to be used globally
    rxStatusMappings.addGlobal = function (mapping) {
        _.assign(globalMappings, mapping, upperCaseCallback);
    };

    // Create a mapping specific to a particular API. This will
    // only be used when the directive receives the `api="..."`
    // attribute
    rxStatusMappings.addAPI = function (apiName, mapping) {
        var api = apiMappings[apiName] || {};
        _.assign(api, mapping, upperCaseCallback);
        apiMappings[apiName] = api;
    };

    var buildMapFunc = function (mapToString) {
        return function (statusString, api) {
            var obj = {};
            if (_.isString(statusString)) {
                obj[statusString] = mapToString;
            } else if (_.isArray(statusString)) {
                _.each(statusString, function (str) {
                    obj[str] = mapToString;
                });
            }

            if (api) {
                rxStatusMappings.addAPI(api, obj);
            } else {
                rxStatusMappings.addGlobal(obj);
            }
        };
    };

    // All four of these map a string, or an array of strings,
    // to the corresponding internal status (Active/Warning/Error/Info)
    // Each can optionally take a string as the second parameter, indictating
    // which api the mapping belongs to
    rxStatusMappings.mapToActive = buildMapFunc('ACTIVE');
    rxStatusMappings.mapToWarning = buildMapFunc('WARNING');
    rxStatusMappings.mapToError = buildMapFunc('ERROR');
    rxStatusMappings.mapToInfo = buildMapFunc('INFO');
    rxStatusMappings.mapToPending = buildMapFunc('PENDING');
    rxStatusMappings.mapToDisabled = buildMapFunc('DISABLED');

    rxStatusMappings.getInternalMapping = function (statusString, api) {
        if (_.has(apiMappings, api) && _.has(apiMappings[api], statusString)) {
            return apiMappings[api][statusString];
        }

        var mapped = globalMappings[statusString];

        return mapped ? mapped : statusString;
    };

    return rxStatusMappings;
});
