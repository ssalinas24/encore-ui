angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxLocalStorage
 * @description
 * A simple wrapper for injecting the global variable `localStorage`
 * for storing values in the browser's local storage object. This service is similar to Angular's
 * `$window` and `$document` services.  The API works the same as the W3C's
 * specification provided at: https://html.spec.whatwg.org/multipage/webstorage.html.
 * This service also includes helper functions for getting and setting objects.
 *
 * @example
 * <pre>
 * rxLocalStorage.setItem('Batman', 'Robin'); // no return value
 * rxLocalStorage.key(0); // returns 'Batman'
 * rxLocalStorage.getItem('Batman'); // returns 'Robin'
 * rxLocalStorage.removeItem('Batman'); // no return value
 * rxLocalStorage.setObject('hero', {name:'Batman'}); // no return value
 * rxLocalStorage.getObject('hero'); // returns { name: 'Batman'}
 * rxLocalStorage.clear(); // no return value
 * </pre>
 */
.service('rxLocalStorage', function ($window) {
    var localStorage = $window.localStorage;
    if ($window.self !== $window.top && $window.top.localStorage) {
        localStorage = $window.top.localStorage;
    }

    this.setItem = function (key, value) {
        localStorage.setItem(key, value);
    };

    this.getItem = function (key) {
        return localStorage.getItem(key);
    };

    this.key = function (key) {
        return localStorage.key(key);
    };

    this.removeItem = function (key) {
        localStorage.removeItem(key);
    };

    this.clear = function () {
        localStorage.clear();
    };

    this.__defineGetter__('length', function () {
        return localStorage.length;
    });

    this.setObject = function (key, val) {
        var value = _.isObject(val) || _.isArray(val) ? JSON.stringify(val) : val;
        this.setItem(key, value);
    };

    this.getObject = function (key) {
        var item = localStorage.getItem(key);
        try {
            item = JSON.parse(item);
        } catch (error) {
            return item;
        }

        return item;
    };
});
