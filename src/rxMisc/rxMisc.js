/**
 * @ngdoc overview
 * @name rxMisc
 * @description
 * # rxMisc Component
 *
 * A module for shared functionality across framework components.
 *
 * ## Filters
 * * {@link rxMisc.filter:titleize titleize}
 *
 * ## Services
 * * {@link rxMisc.service:rxAutoSave rxAutoSave}
 * * {@link rxMisc.service:rxDOMHelper rxDOMHelper}
 * * {@link rxMisc.service:rxNestedElement rxNestedElement}
 */
angular.module('encore.ui.rxMisc', ['debounce', 'encore.ui.rxSessionStorage'])
/**
 * @ngdoc service
 * @name rxMisc.service:rxDOMHelper
 * @description
 * A small set of functions to provide some functionality
 * that isn't present in Angular's jQuery-lite, and other
 * DOM-related functions that are useful
 *
 * All methods take jquery-lite wrapped elements as arguments
 */
.factory('rxDOMHelper', function ($document, $window) {
    var scrollTop = function () {
        // Safari and Chrome both use body.scrollTop, but Firefox needs
        // documentElement.scrollTop
        var doc = $document[0];
        var scrolltop = $window.pageYOffset || doc.body.scrollTop || doc.documentElement.scrollTop || 0;
        return scrolltop;
    };

    var offset = function (elm) {
        //http://cvmlrobotics.blogspot.co.at/2013/03/angularjs-get-element-offset-position.html
        var rawDom = elm[0];
        var _x = 0;
        var _y = 0;
        var doc = $document[0];
        var body = doc.documentElement || doc.body;
        var scrollX = $window.pageXOffset || body.scrollLeft;
        var scrollY = scrollTop();
        var rect = rawDom.getBoundingClientRect();
        _x = rect.left + scrollX;
        _y = rect.top + scrollY;
        return { left: _x, top:_y };
    };

    var style = function (elem) {
        if (elem instanceof angular.element) {
            elem = elem[0];
        }
        return $window.getComputedStyle(elem);
    };

    var width = function (elem) {
        return style(elem).width;
    };

    var height = function (elem) {
        return style(elem).height;
    };

    var shouldFloat = function (elem, maxHeight) {
        var elemOffset = offset(elem),
            scrolltop = scrollTop();

        return ((scrolltop > elemOffset.top) && (scrolltop < elemOffset.top + maxHeight));
    };

    // An implementation of wrapAll, based on
    // http://stackoverflow.com/a/13169465
    // Takes a raw DOM `newParent`, and moves all of `elms` (either
    // a single element or an array of elements) into it. It then places
    // `newParent` in the location that elms[0] was originally in
    var wrapAll = function (newParent, elms) {
        // Figure out if it's one element or an array
        var isGroupParent = ['SELECT', 'FORM'].indexOf(elms.tagName) !== -1;
        var el = (elms.length && !isGroupParent) ? elms[0] : elms;

        // cache the current parent node and sibling
        // of the first element
        var parentNode = el.parentNode;
        var sibling = el.nextSibling;

        // wrap the first element. This automatically
        // removes it from its parent
        newParent.appendChild(el);

        // If there are other elements, wrap them. Each time
        // it will remove the element from its current parent,
        // and also from the `elms` array
        if (!isGroupParent) {
            while (elms.length) {
                newParent.appendChild(elms[0]);
            }
        }

        // If there was a sibling to the first element,
        // insert newParent right before it. Otherwise
        // just add it to parentNode
        if (sibling) {
            parentNode.insertBefore(newParent, sibling);
        } else {
            parentNode.appendChild(newParent);
        }
    };

    // bind `f` to the scroll event
    var onscroll = function (f) {
        angular.element($window).bind('scroll', f);
    };

    var find = function (elem, selector) {
        return angular.element(elem[0].querySelector(selector));
    };

    return {
        offset: offset,
        scrollTop: scrollTop,
        width: width,
        height: height,
        shouldFloat: shouldFloat,
        onscroll: onscroll,
        find: find,
        wrapAll: wrapAll
    };
})
/**
 * @ngdoc filter
 * @name rxMisc.filter:titleize
 * @description
 * Convert a string to title case, stripping out underscores and capitalizing words.
 *
 * Credit where it's due: https://github.com/epeli/underscore.string/blob/master/titleize.js
 *
 * @param {String} inputString - The string to convert
 * @returns {String} The titleized version of the string
 *
 * @example
 * Both examples result in a string of `"A Simple String"`.
 * <pre>
 * {{ 'a simple_STRING' | titleize }}
 * </pre>
 *
 * <pre>
 * $filter('titleize')('a simple_STRING');
 * </pre>
 */
.filter('titleize', function () {
    return function (inputString) {
        return inputString
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/(?:^|\s)\S/g, function (character) {
                return character.toUpperCase();
            });
    };
})
/**
 * @ngdoc service
 * @name rxMisc.service:rxNestedElement
 * @description
 * Helper function to aid in the creation of boilerplate DDO definitions
 * required to validate nested custom elements.
 *
 * @param {Object=} opts - Options to merge with default DDO definitions
 * @param {String} opts.parent - Parent directive name
 * (i.e. defined NestedElement is an immediate child of this parent element)
 *
 * @return {Object} Directive Definition Object for a rxNestedElement
 *
 * @example
 * <pre>
 * angular.module('myApp', [])
 * .directive('parentElement', function (rxNestedElement) {
 *   return rxNestedElement();
 * })
 * .directive('childElement', function (rxNestedElement) {
 *   return rxNestedElement({
 *      parent: 'parentElement'
 *   });
 * });
 * </pre>
 */
.factory('rxNestedElement', function () {
    return function (opts) {
        opts = opts || {};

        var defaults = {
            restrict: 'E',
            /*
             * must be defined for a child element to verify
             * correct hierarchy
             */
            controller: angular.noop
        };

        if (angular.isDefined(opts.parent)) {
            opts.require = '^' + opts.parent;
            /*
             * bare minimum function definition needed for "require"
             * validation logic
             *
             * NOTE: `angular.noop` and `_.noop` WILL NOT trigger validation
             */
            opts.link = function () {};
        }

        return _.defaults(opts, defaults);
    };
})
/**
 * @ngdoc service
 * @name rxMisc.service:rxAutoSave
 * @description
 * A factory that controllers can use to help automatically save and load
 * form data (via LocalStorage) on any given page.
 *
 * @param {Object} scope scope to apply a `$watch` expression
 * @param {String} variable
 * variable name corresponding to an object on the given scope
 * @param {Object=} options usage options
 * @param {Promise} [options.clearOnSuccess=null] *optional* -
 * Clear saved data on successful resolution of given promise.
 *
 * @param {Function} [options.keyShaping]
 * Sometimes, it may be necessary to change how a key is formed for the specified
 * `storageBackend`.  Keys are calculated by prepending `'rxAutoSave::'` before the
 * url. Your custom `keyShaping` function will take one parameter (`key`), to which
 * you may modify to your specific needs.
 *
 * The below example will ignore any caching flags in the url.
 * <pre>
 * var autosave = rxAutoSave($scope, 'formData', {
 *     keyShaping: function (key) {
 *         return key.replace('?cache=false', '');
 *     }
 * });
 * </pre>
 *
 * @param {Integer} [options.ttl=172800] *optional* -
 * Time to Live (in seconds) - defaults to 2 days
 *
 * Whenever data changes in the watched variable, the expiry time will be freshly set
 * In addition, we freshly set the expiry time whenever the data is loaded. If the data
 * is 12 hours away from expiring and a user visits the page again, the expiry will be
 * freshly set to a new 48 hours, whether or not the user makes a change.
 *
 * If a user visits a page after the data has expired, the data will be cleared from
 * storage and not automatically loaded.
 * * A continuous background process is not running to look for expired data.
 * * We only check for expiration the next time `rxAutoSave` tries to load the data.
 *
 * To turn off automatic expiry for a given form, pass a value of `{ ttl: 0 }`.
 * In this case, the data will never expire and you will have to clear it manually at
 * an appropriate time by using one of the following:
 *
 * * `clear()`
 * * `clearOnSuccess()`
 *
 * @param {Boolean|Promise} [options.load=true] *optional* -
 * If false, will prevent data from being automatically loaded onto the scope.
 *
 * You may use a promise that resolves to a boolean, if desired.
 * @param {Boolean|Promise} [options.save=true] *optional* -
 * If false, will prevent data from being automatically saved on change.
 *
 * You may use a promise that resolves to a boolean, if desired.
 * @param {String[]} [options.exclude] *optional* -
 * A string of property names to exclude from automatic save. This is useful to
 * exclude saving any sensitive information like passwords, credit card numbers, etc.
 *
 * <pre>
 * var autosave = rxAutoSave($scope, 'formData', { exclude: ['password'] });
 * </pr>
 *
 * @param {Object} [options.storageBackend=LocalStorage] *optional* -
 * Must be an object which has `getObject(key)` and `setObject(key, val)` methods.
 * `LocalStorage` and `SessionStorage` are both provided by EncoreUI, and support
 * this interface.
 *
 * You can use your own custom backends as well, as long as it supports `getObject(key)`
 * and `setObject(key, val)`.
 */
.factory('rxAutoSave', function ($location, $q, debounce, LocalStorage) {
    /*
     * We'll version the schema for the stored data, so if we need to change
     * the schema in the future, we can do automatic migrations. Never
     * delete any of these documented schemas. If you have to add a new version,
     * then add it on top, but keep the documentation for the old one around.
     * VERSION 1
     *      'rxAutoSave::' + URL => {
     *          pageConfig: {
     *              version: 1
     *          },
     *          forms: {
     *              "form1": {
     *                   config: {
     *                      expires: 0,
     *                  },
     *                  data: {
     *                      // Serialized form data
     *                  }
     *              }
     *              "form2": {
     *                  config: {
     *                      expires: 33421234322,
     *                  }
     *                  data: {
     *                      // Serialized form data
     *                  }
     *              }
     *          }
     *      }
    */
    var version = 1;

    // This will be used by the rxAutoSave instance to interact with
    // LocalStorage.
    //
    // @param watchVar - the string name of the
    //                   object that's being watched, representing the model for the form.
    //                   StorageAPI is not publically exposed, it can only be used and accessed
    //                   by the rxAutoSave instance
    // @param [storageBackend] - Optional, defaults to LocalStorage. If you pass in a storage object,
    //                           it must support both getObject(key) and setObject(key, val), matching
    //                           the operations of LocalStorage and SessionStorage
    // @param [keyShaping] - Optional, defaults to just returning the originally defined key value.
    //                       It gets passed the original value defined ('rxAutoSave::' + $location.url())
    //                       and is expected to return the new key that you wish to have used.
    var StorageAPI = function (watchVar, storageBackend, keyShaping) {
        this.key = keyShaping('rxAutoSave::' + $location.url());
        this.watchVar = watchVar;
        this.storage = storageBackend ? storageBackend : LocalStorage;
    };

    // Get all the saved data for this page. If none
    // exists, then create an empty object that matches
    // the current schema.
    StorageAPI.prototype.getAll = function () {
        return this.storage.getObject(this.key) || {
            pageConfig: {
                version: version,
            },
            forms: {
            }
        };
    };

    // Given a `watchVar`, return the corresponding
    // `form` object from LocalStorage. This form object should include
    // both `.data` and `.config` properties.
    // If no form currently exists for `watchVar`, then an empty
    // object will be created that matches the current schema
    StorageAPI.prototype.getForm = function () {
        var all = this.getAll();
        if (!_.has(all.forms, this.watchVar)) {
            all.forms[this.watchVar] = {
                data: {},
                config: {
                    expires: 0
                }
            };
        }
        return all.forms[this.watchVar];
    };

    // Given a full form object, save it into LocalStorage,
    // indexed into the forms[watchVar] location for this page
    StorageAPI.prototype.setForm = function (form) {
        var all = this.getAll();
        all.forms[this.watchVar] = form;
        this.storage.setObject(this.key, all);
    };

    // Get the current `config` object for a given watchVar
    StorageAPI.prototype.getConfig = function () {
        return this.getForm().config;
    };

    // Return the time that a given form is supposed to
    // have its saved data expire
    StorageAPI.prototype.getExpires = function () {
        return this.getConfig().expires;
    };

    // For a given watchVar, set a new expiry time, and save
    // into LocalStorage
    StorageAPI.prototype.setExpiryTime = function (expiryTime) {
        var form = this.getForm();
        form.config.expires = expiryTime;
        this.setForm(form);
    };

    // Force an expiration for a given watchVar. This will completely
    // clear the saved data for this watchVar, and set the `expires`
    // back to 0
    StorageAPI.prototype.expire = function () {
        var form = this.getForm();
        form.data = {};
        form.config.expires = 0;
        this.setForm(form);
    };

    // Return the current saved data for a given watchVar
    StorageAPI.prototype.getDataObject = function () {
        return this.getForm().data || {};
    };

    // For a given watchVar, store `val` as its saved
    // data, into LocalStorage
    StorageAPI.prototype.setDataObject = function (val) {
        var form = this.getForm();
        form.data = val;
        this.setForm(form);
    };

    // This is what we return from rxAutoSave, and calling this
    // function will return an instance
    return function (scope, watchVar, opts) {
        opts = opts || {};
        _.defaults(opts, {
            load: true,
            save: true,
            clearOnSuccess: undefined,
            exclude: [],
            ttl: 172800,
            keyShaping: _.identity,
            storageBackend: LocalStorage
        });

        opts.ttl = opts.ttl * 1000; // convert back to milliseconds

        var api = new StorageAPI(watchVar, opts.storageBackend, opts.keyShaping);

        var updateExpiryTime = function () {
            if (opts.ttl > 0) {
                api.setExpiryTime(_.now() + opts.ttl);
            }
        };

        // Responsible for loading the data from LocalStorage into the form
        var load = function () {
            var expires = api.getExpires();
            if (expires > 0 && expires <= _.now()) {
                // This data has expired. Make sure we clear it out
                // of LocalStorage
                api.expire();
                return;
            }

            updateExpiryTime();

            // Write all the storedObject values into scope[watchVar], except
            // for any specified in opts.exclude
            var storedObject = api.getDataObject();
            _.assign(scope[watchVar], _.omit(storedObject, opts.exclude));
        };

        // This is the "instance" that is returned when someone
        // calls rxAutoSave($scope, 'someWatchVar')
        var autoSaveInstance = {
            clear: function () {
                api.expire();
            },

            clearOnSuccess: function (promise) {
                promise.then(this.clear);
            },

            save: function () {
                update(scope[watchVar]);
            },

            getStoredValue: function () {
                return api.getDataObject();
            }
        };

        _.bindAll(autoSaveInstance);

        var update = function (newVal) {
            // Get the current data stored for this watchVar
            var data = api.getDataObject();

            // Overwrite all properties in allWatchVars[watchVar] with properties from
            // newVal, except for the properties in opts.exclude
            _.assign(data, _.omit(newVal, opts.exclude));

            // Store the newly changed data in LocalStorage
            api.setDataObject(data);

            // Update the expiry time whenever we modify data
            updateExpiryTime();
        };

        // We don't want to write to LocalStorage every time the model changes,
        // because that would turn typing into a textarea into an expensive operation.
        // We'll instead debounce the the writes for 1 second
        var debounced = debounce(update, 1000);

        $q.when(opts.save).then(function (shouldSave) {
            if (shouldSave) {
                // The `true` third argument tells $watch to do a deep comparison
                scope.$watch(watchVar, debounced, true);
            }
        });

        $q.when(opts.load).then(function (shouldLoad) {
            if (shouldLoad) {
                load();
            }
        });

        if (!_.isUndefined(opts.clearOnSuccess)) {
            autoSaveInstance.clearOnSuccess(opts.clearOnSuccess);
        }

        return autoSaveInstance;
    };
});
