/**
 * @ngdoc overview
 * @name rxNotify
 * @description
 * # rxNotify Component
 *
 * Logic for displaying status messages on a page.
 *
 * ## Services
 * * {@link rxNotify.service:rxNotify rxNotify}
 * * {@link rxNotify.service:rxPromiseNotifications rxPromiseNotifications}
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
angular.module('encore.ui.rxNotify', ['ngSanitize', 'ngAnimate'])
/**
* @ngdoc directive
* @name rxNotify.directive:rxNotification
* @restrict E
* @scope
* @description
* Display a static message with styling taken from rx-notifications
*
* @param {String=} [type='info'] The type of notification (e.g. 'warning', 'error')
*
* @example
* <pre>
* <rx-notification type="warning">This is a message!</rx-notification>
* </pre>
*/
.directive('rxNotification', function (rxNotify) {
    return {
        scope: {
            type: '@'
        },
        transclude: true,
        restrict: 'E',
        templateUrl: 'templates/rxNotification.html',
        link: {
            // Transclude returns a jqLite object of the content in the directive pre transclusion into the template.
            pre: function (scope, el, attrs, ctrl, transclude) {
                if (!_.isEmpty(attrs.stack)) {
                    /* jshint maxlen:false */
                    /**
                     * transclude().parent() - returns a jqLite instance of the parent (this directive as defined
                     *                           in the template pre-rendering).
                     * transclude().parent().html() - returns the inner HTML of the parent, as a string, as it was
                     *                                  defined in the template pre-rendering (Text Only)
                     * ----------------------------
                     * el                           -> [<rx-notification stack=​"demo-stack" type=​"info">​
                     *                                  <div class=​"rx-notifications">​...template...​</div>​
                     *                                  </rx-notification>​]
                     *
                     * transclude()                 -> [<span class=​"ng-scope">​Hello, world in demo-stack stack!​</span>​]
                     *
                     * transclude().parent()        -> [<rx-notification stack=​"demo-stack" type=​"info">​
                     *                                  <span class=​"ng-scope">​Hello, world in demo-stack stack!​</span>
                     *                                  ​</rx-notification>​]
                     *
                     * transclude().parent().html() -> "<span class="ng-scope">Hello, world in demo-stack stack!</span>"
                     **/
                    var content = transclude().parent().html();
                    rxNotify.add(content, {
                        type: attrs.type,
                        stack: attrs.stack
                    });
                    el.remove();
                }
            }
        }
    };
})
 /**
 * @ngdoc directive
 * @name rxNotify.directive:rxNotifications
 * @restrict E
 * @scope
 * @description
 * Displays all messages in a stack
 *
 * @param {String=} [stack='page'] The message stack to associate with
 *
 * @example
 * <pre>
 * <rx-notifications stack="myCustomStack"></rx-notifications>
 * </pre>
 */
.directive('rxNotifications', function (rxNotify) {
    return {
        scope: {
            stack: '@?'
        },
        restrict: 'E',
        replace: true,
        templateUrl: 'templates/rxNotifications.html',
        controller: function ($scope) {
            /*
             * Calls rxNotify service to remove a message from a stack
             * @param {object} message The message object to remove.
             */
            $scope.dismiss = function (message) {
                rxNotify.dismiss(message);
            };
        },
        link: function (scope) {
            var stack = scope.stack || 'page';

            // watch the stack for updates
            scope.$watch(function () {
                return rxNotify.stacks[stack];
            }, function (data) {
                scope.messages = data;
            });

            scope.loading = true;
        }
    };
})
/**
 * @ngdoc service
 * @name rxNotify.service:rxNotify
 * @description
 * Manages page messages for an application
 */
.service('rxNotify', function ($interval, $rootScope) {
    var defaultStack = 'page';
    var stacks = {};

    // initialize a default stack
    stacks[defaultStack] = [];

    // array that contains messages to show on 'next' (when route changes)
    var nextQueue = [];

    var messageDefaults = {
        type: 'info',
        timeout: -1,
        loading: false,
        show: 'immediate',
        dismiss: 'next',
        ondismiss: _.noop(),
        stack: 'page',
        repeat: true
    };

    /**
     * @function
     * @private
     * @description Adds a message to a stack
     *
     * @param {Object} message The message object to add.
     */
    var addToStack = function (message) {
        // if repeat is false, check to see if the message is already in the stack
        if (!message.repeat) {
            if (_.find(stacks[message.stack], { text: message.text, type: message.type })) {
                return;
            }
        }

        // if timeout is set, we should remove message after time expires
        if (message.timeout > -1) {
            dismissAfterTimeout(message);
        }

        // make sure there's actual text to add
        if (message.text.length > 0) {
            stacks[message.stack].push(message);
        }
    };//addToStack

    /**
     * @function
     * @private
     * @description
     * Sets a timeout to wait a specific time then dismiss message
     *
     * @param {Object} message The message object to remove.
     */
    var dismissAfterTimeout = function (message) {
        // convert seconds to milliseconds
        var timeoutMs = message.timeout * 1000;

        $interval(function () {
            dismiss(message);
        }, timeoutMs, 1);
    };

    /**
     * @function
     * @private
     * @description
     * Shows/dismisses message after scope.prop change to true
     *
     * @param {Object} message The message object to show/dismiss
     * @param {String} changeType Whether to 'show' or 'dismiss' the message
     */
    var changeOnWatch = function (message, changeType) {
        var scope = message[changeType][0];
        var prop = message[changeType][1];

        // function to run to change message visibility
        var cb;

        // switch which function to call based on type
        if (changeType == 'show') {
            cb = addToStack;
        } else if (changeType == 'dismiss') {
            cb = dismiss;

            // add a listener to dismiss message if scope is destroyed
            scope.$on('$destroy', function () {
                dismiss(message);
            });
        }

        scope.$watch(prop, function (newVal) {
            if (newVal === true) {
                cb(message);
            }
        });
    };//changeOnWatch

    /**
     * @function
     * @private
     * @description removes all messages that are shown
     */
    var clearAllShown = function () {
        _.forOwn(stacks, function (index, key) {
            stacks[key] = _.reject(stacks[key], {
                'dismiss': messageDefaults.dismiss
            });
        });
    };

    /**
     * @function
     * @private
     * @description adds messages marked as 'next' to relevant queues
     */
    var addAllNext = function () {
        _.each(nextQueue, function (message) {
            // add to appropriate stack
            addToStack(message);
        });

        // empty nextQueue of messages
        nextQueue.length = 0;
    };

    /**
     * @name clear
     * @ngdoc method
     * @methodOf rxNotify.service:rxNotify
     * @description deletes all messages in a stack
     *
     * @param {String} stack The name of the stack to clear
     */
    var clear = function (stack) {
        if (stacks.hasOwnProperty(stack)) {
            // @see http://davidwalsh.name/empty-array
            stacks[stack].length = 0;
        }
    };

    /**
     * @name dismiss
     * @ngdoc method
     * @methodOf rxNotify.service:rxNotify
     * @description removes a specific message from a stack
     *
     * @param {Object} msg Message object to remove
     */
    var dismiss = function (msg) {
        // remove message by id
        stacks[msg.stack] = _.reject(stacks[msg.stack], { 'id': msg.id });

        if (_.isFunction(msg.ondismiss)) {
            $interval(function () {
                msg.ondismiss(msg);
            }, 0, 1);
        }
    };//dismiss()

    /**
     * @name add
     * @ngdoc method
     * @methodOf rxNotify.service:rxNotify
     * @description adds a message to a stack
     *
     * @param {String} text Message text
     * @param {Object=} options Message options
     * @param {String=} [options.type='info'] Message Type
     *
     * Values:
     * * 'info'
     * * 'warning'
     * * 'error'
     * * 'success'
     * @param {Integer=} [options.timeout=-1]
     * Time (in seconds) for message to appear. A value of -1 will display
     * the message until it is dismissed or the user navigates away from the
     * page.
     *
     * Values:
     * * -1
     * * Any positive integer
     * @param {Boolean=} [options.repeat=true]
     * Whether the message should be allowed to appear more than once in the stack.
     * @param {Boolean=} [options.loading=false]
     * Replaces type icon with spinner. Removes option for use to dismiss message.
     *
     * You usually want to associate this with a 'dismiss' property.
     * @param {String|Array=} [options.show='immediate']
     * When to have the message appear.
     *
     * Values:
     * * 'immediate'
     * * 'next'
     * * [scope, 'property']
     *   * Pass in a property on a scope to watch for a change.
     *     When the property equals true, the message is shown.
     * @param {String|Array=} [options.dismiss='next']
     * When to have the message disappear.
     *
     * Values:
     * * 'next'
     * * [scope, 'property']
     *     * Pass in a property on a scope to watch for a change.
     *       When the property equals true, the message is dismissed.
     * @param {Function=} [options.ondismiss=_.noop]
     * Function that should be run when message is dismissed.
     * @param {String=} [options.stack='page']
     * Which message stack the message gets added to.
     *
     * Values:
     * * 'page'
     * * Any String *(results in a custom stack)*
     *
     * @returns {Object} message object
     */
    var add = function (text, options) {
        var message = {
            text: text
        };

        options = options || {};

        // add unique id to message for easier identification
        options.id = _.uniqueId();

        // if stack is specified, add to different stack
        var stack = options.stack || defaultStack;

        // if new stack doesn't exist, create it
        if (!_.isArray(stacks[stack])) {
            stacks[stack] = [];
        }

        // merge options with defaults (overwriting defaults where applicable)
        _.defaults(options, messageDefaults);

        // add options to message
        _.merge(message, options);

        // if dismiss is set to array, watch variable
        if (_.isArray(message.dismiss)) {
            changeOnWatch(message, 'dismiss');
        }

        // add message to stack immediately if has default show value
        if (message.show == messageDefaults.show) {
            addToStack(message);
        } else if (message.show == 'next') {
            nextQueue.push(message);
        } else if (_.isArray(message.show)) {
            changeOnWatch(message, 'show');
        }

        // return message object
        return message;
    };//add()

    // add a listener to root scope which listens for the event that gets fired when the route successfully changes
    $rootScope.$on('$routeChangeSuccess', function processRouteChange () {
        clearAllShown();
        addAllNext();
    });

    // expose public API
    return {
        add: add,
        clear: clear,
        dismiss: dismiss,
        stacks: stacks
    };
})
/**
* @ngdoc service
* @name rxNotify.service:rxPromiseNotifications
* @description Manages displaying messages for a promise
*
* @example
* <pre>
* rxPromiseNotifications.add($scope.deferred.promise, {
*     loading: 'Loading Message',
*     success: 'Success Message',
*     error: 'Error Message'
* });
* </pre>
*/
.factory('rxPromiseNotifications', function (rxNotify, $rootScope, $q, $interpolate) {
    var scope = $rootScope.$new();

    /**
     * Removes 'loading' message from stack
     * @private
     * @this Scope used for storing messages data
     */
    var dismissLoading = function () {
        if (this.loadingMsg) {
            rxNotify.dismiss(this.loadingMsg);
        }
    };

    /**
     * shows either a success or error message
     * @private
     * @this Scope used for storing messages data
     * @param {string} msgType Message type to be displayed
     * @param {Object} response Data that's returned from the promise
     */
    var showMessage = function (msgType, response) {
        if (msgType in this.msgs && !this.isCancelled) {
            // convert any bound properties into a string based on obj from result
            var exp = $interpolate(this.msgs[msgType]);
            var msg = exp(response);

            var msgOpts = {
                type: msgType
            };

            // if a custom stack is passed in, specify that for the message options
            if (this.stack) {
                msgOpts.stack = this.stack;
            }

            rxNotify.add(msg, msgOpts);
        }
    };

    /**
     * cancels all messages from displaying
     * @private
     * @this Scope used for storing messages data
     */
    var cancelMessages = function () {
        this.isCancelled = true;
        this.deferred.reject();
    };

    /**
     * @name add
     * @ngdoc method
     * @methodOf rxNotify.service:rxPromiseNotifications
     * @description
     * @param {Object} promise
     * The promise to attach to for showing success/error messages
     * @param {Object} msgs
     * The messages to display. Can take in HTML/expressions
     * @param {String} msgs.loading
     * Loading message to show while promise is unresolved
     * @param {String=} msgs.success
     * Success message to show on successful promise resolve
     * @param {String=} msgs.error
     * Error message to show on promise rejection
     * @param {String=} [stack='page']
     * What stack to add to
     */
    var add = function (promise, msgs, stack) {
        var deferred = $q.defer();

        var uid = _.uniqueId('promise_');

        scope[uid] = {
            isCancelled: false,
            msgs: msgs,
            stack: stack
        };

        // add loading message to page
        var loadingOpts = {
            loading: true
        };

        if (stack) {
            loadingOpts.stack = stack;
        }

        if (msgs.loading) {
            scope[uid].loadingMsg = rxNotify.add(msgs.loading, loadingOpts);
        }

        // bind promise to show message actions
        deferred.promise
            .then(showMessage.bind(scope[uid], 'success'), showMessage.bind(scope[uid], 'error'))
            .finally(dismissLoading.bind(scope[uid]));

        // react based on promise passed in
        promise.then(function (response) {
            deferred.resolve(response);
        }, function (reason) {
            deferred.reject(reason);
        });

        // if page change, cancel everything
        $rootScope.$on('$routeChangeStart', cancelMessages.bind(scope[uid]));

        // attach deferred to scope for later access
        scope[uid].deferred = deferred;

        return scope[uid];
    };

    return {
        add: add
    };
});
