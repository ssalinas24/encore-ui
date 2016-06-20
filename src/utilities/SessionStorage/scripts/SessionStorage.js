angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:SessionStorage
 * @description
 *
 * A simple wrapper for injecting the global variable sessionStorage
 * for storing values in session storage. This service is similar to angular's
 * $window and $document services.  The API works the same as the W3C's
 * specification provided at: http://dev.w3.org/html5/webstorage/#storage-0.
 * Also includes to helper functions for getting and setting objects.
 *
 * @example
 * <pre>
 * SessionStorage.setItem('Batman', 'Robin'); // no return value
 * SessionStorage.key(0); // returns 'Batman'
 * SessionStorage.getItem('Batman'); // returns 'Robin'
 * SessionStorage.removeItem('Batman'); // no return value
 * SessionStorage.setObject('hero', {name:'Batman'}); // no return value
 * SessionStorage.getObject('hero'); // returns { name: 'Batman'}
 * SessionStorage.clear(); // no return value
 * </pre>
 */
.service('SessionStorage', function ($window) {
    var sessionStorage = $window.sessionStorage;
    if ($window.self !== $window.top && $window.top.sessionStorage) {
        sessionStorage = $window.top.sessionStorage;
    }

    this.setItem = function (key, value) {
        sessionStorage.setItem(key, value);
    };

    this.getItem = function (key) {
        return sessionStorage.getItem(key);
    };

    this.key = function (key) {
        return sessionStorage.key(key);
    };

    this.removeItem = function (key) {
        sessionStorage.removeItem(key);
    };

    this.clear = function () {
        sessionStorage.clear();
    };

    this.__defineGetter__('length', function () {
        return sessionStorage.length;
    });

    this.setObject = function (key, val) {
        var value = _.isObject(val) || _.isArray(val) ? JSON.stringify(val) : val;
        this.setItem(key, value);
    };

    this.getObject = function (key) {
        var item = sessionStorage.getItem(key);
        try {
            item = JSON.parse(item);
        } catch (error) {
            return item;
        }

        return item;
    };
});
