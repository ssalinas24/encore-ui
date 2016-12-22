angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxEncoreRoutes
 * @description
 * Creates a shared instance of `AppRoutes` that is used for the Encore App nav.
 * This allows apps to make updates to the nav via `rxEncoreRoutes`.
 *
 * @return {Object} Instance of rxAppRoutes with `fetchRoutes` method added
 */
.factory('rxEncoreRoutes', function (rxAppRoutes, routesCdnPath, rxNotify, $q, $http,
                                   rxVisibilityPathParams, rxVisibility, rxEnvironment,
                                   rxLocalStorage) {

    // We use rxVisibility in the nav menu at routesCdnPath, so ensure it's ready
    // before loading from the CDN
    rxVisibility.addVisibilityObj(rxVisibilityPathParams);

    var rxEncoreRoutes = new rxAppRoutes();

    var setWarningMessage = function () {
        rxNotify.add('There was a problem loading the navigation, so a cached version has been loaded for display.', {
            type: 'warning'
        });
    };

    var setFailureMessage = function () {
        rxNotify.add('Error loading site navigation', {
            type: 'error'
        });
    };

    var url, suffix;
    switch (true) {
        case rxEnvironment.isUnifiedProd(): {
            url = routesCdnPath.production;
            suffix = 'prod';
            break;
        }
        case rxEnvironment.isPreProd(): {
            url = routesCdnPath.preprod;
            suffix = 'preprod';
            break;
        }
        case routesCdnPath.hasCustomURL: {
            url = routesCdnPath.staging;
            suffix = 'custom';
            break;
        }
        default: {
            url = routesCdnPath.staging;
            suffix = 'staging';
        }
    }

    rxEncoreRoutes.fetchRoutes = function () {
        var routesKey = 'rxEncoreRoutes-' + suffix;
        var cachedRoutes = rxLocalStorage.getObject(routesKey);

        $http.get(url)
            .success(function (routes) {
                rxEncoreRoutes.setAll(routes);
                rxLocalStorage.setObject(routesKey, routes);
            })
            .error(function () {
                if (cachedRoutes) {
                    rxEncoreRoutes.setAll(cachedRoutes);
                    setWarningMessage();
                } else {
                    setFailureMessage();
                }
            });

        return cachedRoutes || [];
    };

    return rxEncoreRoutes;
})

/**
 * @deprecated
 * Please use rxEncoreRoutes instead. This item will be removed on the 4.0.0 release.
 * @ngdoc service
 * @name utilities.service:encoreRoutes
 * @requires utilities.service:rxEncoreRoutes
 */
.service('encoreRoutes', function (rxEncoreRoutes) {
    console.warn (
        'DEPRECATED: encoreRoutes - Please use rxEncoreRoutes. ' +
        'encoreRoutes will be removed in EncoreUI 4.0.0'
    );
    return rxEncoreRoutes;
});
