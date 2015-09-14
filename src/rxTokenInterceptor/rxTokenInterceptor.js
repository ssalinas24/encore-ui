/**
 * @ngdoc overview
 * @name rxTokenInterceptor
 * @description
 * # rxTokenInterceptor Component
 *
 * [TBD]
 *
 * ## Services
 * * {@link rxTokenInterceptor.service:TokenInterceptor TokenInterceptor}
 */
angular.module('encore.ui.rxTokenInterceptor', ['encore.ui.rxSession'])
/**
 * @ngdoc service
 * @name rxTokenInterceptor.service:TokenInterceptor
 * @description
 * Simple injector which will intercept http request and inject the
 * Rackspace Identity's token into every http request.
 *
 * @requires rxSession.service:Session
 *
 * @example
 * <pre>
 * angular.module('encoreApp', ['encore.ui'])
 *     .config(function ($httpProvider) {
 *         $httpProvider.interceptors.push('TokenInterceptor');
 *     });
 * </pre>
 */
.provider('TokenInterceptor', function () {
    var exclusionList = this.exclusionList = [ 'rackcdn.com' ];

    this.$get = function (Session, $document) {
        var url = $document[0].createElement('a');
        return {
            request: function (config) {
                // Don't add the X-Auth-Token if the request URL matches
                // something in exclusionList
                // We're specifically looking at hostnames, so we have to
                // do the `createElement('a')` trick to turn the config.url
                // into something with a `.hostname`
                url.href = config.url;
                var exclude = _.some(exclusionList, function (item) {
                    if (_.contains(url.hostname, item)) {
                        return true;
                    }
                });

                if (!exclude) {
                    config.headers['X-Auth-Token'] = Session.getTokenId();
                }

                return config;
            }
        };
    };
});
