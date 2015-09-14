/*jshint proto:true*/
/**
 * @ngdoc overview
 * @name rxLocalStorage
 * @description
 * # rxLocalStorage Component
 *
 * [TBD]
 *
 * ## Services
 * * {@link rxLocalStorage.service:LocalStorage LocalStorage}
 */
angular.module('encore.ui.rxLocalStorage', [])
/**
 * @ngdoc service
 * @name rxLocalStorage.service:LocalStorage
 * @description
 * A simple wrapper for injecting the global variable localStorage
 * for storing values in local storage. This service is similar to angular's
 * $window and $document services.  The API works the same as the W3C's
 * specification provided at: http://dev.w3.org/html5/webstorage/#storage-0.
 * Also includes to helper functions for getting and setting objects.
 *
 * @example
 * <pre>
 * LocalStorage.setItem('Batman', 'Robin'); // no return value
 * LocalStorage.key(0); // returns 'Batman'
 * LocalStorage.getItem('Batman'); // returns 'Robin'
 * LocalStorage.removeItem('Batman'); // no return value
 * LocalStorage.setObject('hero', {name:'Batman'}); // no return value
 * LocalStorage.getObject('hero'); // returns { name: 'Batman'}
 * LocalStorage.clear(); // no return value
 * </pre>
 */
.service('LocalStorage', function ($window) {
    this.setItem = function (key, value) {
        $window.localStorage.setItem(key, value);
    };

    this.getItem = function (key) {
        return $window.localStorage.getItem(key);
    };

    this.key = function (key) {
        return $window.localStorage.key(key);
    };

    this.removeItem = function (key) {
        $window.localStorage.removeItem(key);
    };

    this.clear = function () {
        $window.localStorage.clear();
    };

    this.__defineGetter__('length', function () {
        return $window.localStorage.length;
    });

    this.setObject = function (key, val) {
        var value = _.isObject(val) || _.isArray(val) ? JSON.stringify(val) : val;
        this.setItem(key, value);
    };

    this.getObject = function (key) {
        var item = $window.localStorage.getItem(key);
        try {
            item = JSON.parse(item);
        } catch (error) {
            return item;
        }

        return item;
    };
});
