/**
 * @ngdoc overview
 * @name rxSession
 * @description
 * # rxSession Component
 *
 * [TBD]
 *
 * ## Services
 * * {@link rxSession.service:Session Session}
 */
angular.module('encore.ui.rxSession', ['encore.ui.rxLocalStorage'])
/**
 * @ngdoc service
 * @name rxSession.service:Session
 * @description
 * Service for managing user session in encore-ui.
 *
 * @requires rxLocalStorage.service:LocalStorage
 *
 * @example
 * <pre>
 * Session.getToken(); // Returns the stored token
 * Session.storeToken(token); // Stores token
 * Session.logout(); // Logs user off
 * Session.isCurrent(); // Returns true/false if the token has expired.
 * Session.isAuthenticated(); // Returns true/false if the user token is valid.
 * </pre>
 */
.factory('Session', function (LocalStorage) {
    var TOKEN_ID = 'encoreSessionToken';
    var session = {};

    /**
    * Dot walks the token without throwing an error.
    * If key exists, returns value otherwise returns undefined.
    */
    session.getByKey = function (key) {
        var tokenValue,
            token = session.getToken(),
            keys = key ? key.split('.') : undefined;

        if (_.isEmpty(token) || !keys) {
            return;
        }

        tokenValue = _.reduce(keys, function (val, key) {
            return val ? val[key] : undefined;
        }, token);

        return tokenValue;
    };

    session.getToken = function () {
        return LocalStorage.getObject(TOKEN_ID);
    };

    session.getTokenId = function () {
        return session.getByKey('access.token.id');
    };

    session.getUserId = function () {
        return session.getByKey('access.user.id');
    };

    session.getUserName = function () {
        return session.getByKey('access.user.name');
    };

    session.storeToken = function (token) {
        LocalStorage.setObject(TOKEN_ID, token);
    };

    session.logout = function () {
        LocalStorage.removeItem(TOKEN_ID);
    };

    session.isCurrent = function () {
        var expireDate = session.getByKey('access.token.expires');

        if (expireDate) {
            return new Date(expireDate) > _.now();
        }

        return false;
    };

    session.isAuthenticated = function () {
        var token = session.getToken();
        return _.isEmpty(token) ? false : session.isCurrent();
    };

    return session;
});
