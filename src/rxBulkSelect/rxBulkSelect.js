angular.module('encore.ui.rxBulkSelect', ['encore.ui.rxCheckbox'])
/**
 * @ngdoc directive
 * @name encore.ui.rxBulkSelect:rxBulkSelect
 * @restrict A
 * @scope
 * @description
 *
 * A directive you place in your <table> element to enable bulk select.
 * This directive will automatically add <tr bulk-select-message> into your <thead>,
 * which will appear whenever items are selected, and disappear when none are selected.
 * The main responsibility of this directive is to provide a controller for other
 * bulk-select-related directives to interact with.
 *
 * @param {Object} bulkSource The source list that the table ng-repeats over.
 * @param {string} selectedKey The attribute on items in bulkSource that will be used to track
 *                             if the user has clicked the checkbox for that item.
 * @param {string} [resourceName=bulkSource] The name of the resource being iterated over.
 */
.directive('rxBulkSelect', function () {
    var elemString = '<tr rx-bulk-select-message></tr>';
    return {
        restrict: 'A',
        scope: {
            bulkSource: '=',
            selectedKey: '@'
        },
        compile: function (elem, attrs) {

            // We add the `<tr rx-bulk-select-message>` row to the header here to save the devs
            // from having to do it themselves. 
            var thead = elem.find('thead').eq(0);
            var messageElem = angular.element(elemString);
            messageElem.attr('resource-name', attrs.resourceName || attrs.bulkSource.replace(/s$/, ''));
            thead.append(messageElem);

            return function (scope, element) {
                scope.tableElement = element;
            };
        },
        controller: 'rxBulkSelectController'
    };
})
.controller('rxBulkSelectController', function ($scope, NotifyProperties, rxBulkSelectUtils) {
    $scope.showMessage = false;
    
    var uncheckHeaderFn = _.noop,
        messageStats = {
            // jscs:disable disallowDanglingUnderscores
            _numSelected: 0,
            _total: 0
        };

    this.registerForNumSelected = NotifyProperties.registrationFn(messageStats, 'numSelected', '_numSelected');
    this.registerForTotal = NotifyProperties.registrationFn(messageStats, 'total', '_total');

    this.messageStats = messageStats;

    var numSelected = function () {
        var selected = _.where($scope.bulkSource, $scope.selectedKey);
        return selected.length;
    };

    var updateMessageStats = function () {
        messageStats.numSelected = numSelected();
        messageStats.total = $scope.bulkSource.length;
    };

    this.key = function () {
        return $scope.selectedKey;
    };

    var setAllVisibleRows = function (state) {
        rxBulkSelectUtils.setAllVisibleRows(state, $scope.tableElement, $scope.selectedKey);
    };

    var setAllRows = function (state) {
        _.each($scope.bulkSource, function (item) {
            item[$scope.selectedKey] = state;
        });
    };

    this.selectAllVisibleRows = function () {
        setAllVisibleRows(true);
        updateMessageStats();
    };

    this.deselectAllVisibleRows = function () {
        setAllVisibleRows(false);
        updateMessageStats();
        uncheckHeaderFn();
    };

    this.selectEverything = function () {
        setAllRows(true);
        updateMessageStats();
    };

    this.deselectEverything = function () {
        setAllRows(false);
        updateMessageStats();
        uncheckHeaderFn();
    };

    $scope.$watch('bulkSource.length', function (newTotal) {
        if (newTotal !== messageStats.total) {
            updateMessageStats();
        }
    });

    this.increment = function () {
        messageStats.numSelected += 1;
    };
    
    this.decrement = function () {
        messageStats.numSelected -= 1;
    };

    this.registerHeader = function (uncheck) {
        if (_.isFunction(uncheck)) {
            uncheckHeaderFn = uncheck;
        }
    };

})

/**
 * @ngdoc directive
 * @name encore.ui.rxBulkSelect:rxBulkSelectHeaderCheck
 * @restrict A
 * @scope
 * @requires rxBulkSelect
 * @description
 *
 * A directive you place on your <th> element representing the checkbox column.
 * This places a checkbox in the header, which will select all items on the current
 * page when clicked.
 *
 * @example   <th rx-bulk-select-header-check></th>
 */
.directive('rxBulkSelectHeaderCheck', function ($compile) {
    var selectAllCheckbox = '<input ng-model="allSelected" ng-change="selectAll()" rx-checkbox>';
    return {
        restrict: 'A',
        scope: true,
        require: '^rxBulkSelect',
        link: function (scope, element, attrs, rxBulkSelectCtrl) {
            scope.allSelected = false;
            scope.selectAll = function () {
                if (scope.allSelected) {
                    rxBulkSelectCtrl.selectAllVisibleRows();
                } else {
                    rxBulkSelectCtrl.deselectAllVisibleRows();
                }
            };
            element.append($compile(selectAllCheckbox)(scope).parent());

            var testAllSelected = function () {
                var stats = rxBulkSelectCtrl.messageStats;
                scope.allSelected = stats.numSelected === stats.total;
            };
            rxBulkSelectCtrl.registerForNumSelected(testAllSelected);
            rxBulkSelectCtrl.registerForTotal(testAllSelected);

            var uncheck = function () {
                scope.allSelected = false;
            };
            rxBulkSelectCtrl.registerHeader(uncheck);
        }
    };
})

/**
 * @ngdoc directive
 * @name encore.ui.rxBulkSelect:rxBulkSelectRow
 * @restrict A
 * @scope
 * @requires rxBulkSelect
 * @description
 *
 * A directive you place on your <td> element which will contain the bulk-select
 * checkbox. This directive draws the checkbox itself. This directive takes
 * `row` as an attribute, pointing to the object representing this row.
 *
 * @param {Object} row The object representing this row, i.e. the left side of the ng-repeat
 *
 * @example   <td rx-bulk-select-row row="server"></td>
 */
.directive('rxBulkSelectRow', function () {
    return {
        restrict: 'A',
        scope: {
            row: '='
        },
        require: '^rxBulkSelect',
        template: '<input ng-change="onChange()" ng-model="row[key]"' +
                  ' rx-checkbox class="rx-bulk-select-row" />',
        link: function (scope, element, attrs, rxBulkSelectCtrl) {
            scope.key = rxBulkSelectCtrl.key();
            scope.onChange = function () {
                if (scope.row[scope.key]) {
                    rxBulkSelectCtrl.increment();
                } else {
                    rxBulkSelectCtrl.decrement();
                }
            };
        }
    };
})

/**
 * @ngdoc directive
 * @name encore.ui.rxBulkSelect:rxBulkSelectMessage
 * @restrict A
 * @scope
 * @requires rxBulkSelect, ?rxFloatingHeader
 * @description
 *
 * This directive is responsible for drawing the appearing/disappearing
 * "message" row in the table header. This row shows how many items have
 * been selected, and gives buttons for "Select All" and "Clear All"
 *
 * You should not use this directive directly. It will be drawn automatically
 * by rxBulkSelect.
 *
 * If the table also has rxFloatingHeader available, this directive will 
 * communicate with the controller from rxFloatingHeader, to correctly
 * support the appearing/disappearing of this header row.
 *
 * @param {string} resourceName The singular form of the name of the resource, e.g. 'server'.
 *
 */
.directive('rxBulkSelectMessage', function () {
    return {
        restrict: 'A',
        require: ['^rxBulkSelect', '?^rxFloatingHeader'],
        scope: {
            resourceName: '@'
        },
        templateUrl: 'templates/rxBulkSelectMessage.html',
        link: function (scope, element, attr, controllers) {
            element.addClass('ng-hide');

            var rxBulkSelectCtrl = controllers[0],
                // Optional controller, so mock it out if it's not present
                rxFloatingHeaderCtrl = controllers[1] || { update: function () {} };

            scope.selectAll = function () {
                rxBulkSelectCtrl.selectEverything();
            };

            scope.deselectAll = function () {
                rxBulkSelectCtrl.deselectEverything();
            };

            scope.numSelected = 0;
            scope.total = rxBulkSelectCtrl.messageStats.total;
            
            var numSelectedChange = function (numSelected, oldNumSelected) {
                scope.numSelected = numSelected;
                var multiple = numSelected > 1;
                scope.plural = multiple ? 's' : '';
                scope.isOrAre = multiple ? 'are' : 'is';

                // We could use `ng-show` directly on the directive, rather
                // than manually adding/removing the `.ng-hide` class here. The issue
                // that causes is that ng-show will run before rxFloatingHeader
                // runs its stuff, and it causes it to not see when `.ng-hide`
                // has been removed. That causes it to clone the message row
                // with `.ng-hide` on it, which results in jumpiness at the top
                // of the table
                if (numSelected === 0) {
                    element.addClass('ng-hide');
                    rxFloatingHeaderCtrl.update();
                } else if (numSelected > 0 && oldNumSelected === 0) {
                    // Only explicitly do this work if we're transitioning from
                    // numSelected=0 to numSelected>0
                    element.removeClass('ng-hide');
                    rxFloatingHeaderCtrl.update();
                }
            };
            rxBulkSelectCtrl.registerForNumSelected(numSelectedChange);

            rxBulkSelectCtrl.registerForTotal(function (newTotal) {
                scope.total = newTotal;
            });
            rxFloatingHeaderCtrl.update();
        }
    };
})
/**
 * @ngdoc directive
 * @name encore.ui.rxBulkSelect:rxBulkSelectValidate
 * @restrict A
 * @requires rxBulkSelect
 * @description
 *
 * A directive used to validate rxBulkSelect in a form. The directive should be placed
 * on the same element as rxBulkSelect. The form will be invalid when no items are selected
 * and valid when at least one item is selected.
 */
.directive('rxBulkSelectValidate', function () {
    return {
        require: ['^form', 'rxBulkSelect'],
        restrict: 'A',
        link: function (scope, elm, attrs, controllers) {
            var formCtrl = controllers[0];
            var bulkSelectCtrl = controllers[1];
            var setValidity = function () {
                var stats = bulkSelectCtrl.messageStats;
                formCtrl.$setValidity('selected', stats.numSelected > 0);
            };

            bulkSelectCtrl.registerForNumSelected(setValidity);
            formCtrl.$setValidity('selected', false);
        }
    };
})

/**
 * @ngdoc directive
 * @name encore.ui.rxBulkSelect:rxBatchActions
 * @restrict E
 * @scope
 * @requires rxBulkSelect
 * @description
 *
 * This directive is responsible for adding the batch action menu link
 * inside a table header. It can only be used when rxBulkSelect is also
 * present. It should be placed in a <th> element.
 *
 * It will also transclude `<li>` items, each representing a modal bulk
 * select action. You don't need to include the correctly styled <ul>, it
 * will do this for you.
 *
 * @example 
 *   <th colspan="10">
 *       <rx-batch-actions>
 *           <li>
 *               <rx-modal-action
 *                   template-url="templates/suspend-modal.html"
 *                   controller="SuspendServersCtrl"
 *                   classes="msg-info">
 *                   <i class="fa fa-fw fa-power-off msg-info"></i>
 *                   Suspend Selected Servers
 *               </rx-modal-action>
 *           </li>
 *       </rx-batch-actions>
 *   </th>
 */
.directive('rxBatchActions', function (rxDOMHelper) {
    return {
        restrict: 'E',
        require: ['^rxBulkSelect', '?^rxFloatingHeader'],
        templateUrl: 'templates/rxBatchActions.html',
        transclude: true,
        link: function (scope, element, attrs, controllers) {

            var rxBulkSelectCtrl = controllers[0],
                rxFloatingHeaderCtrl = controllers[1];

            // We need to add the class onto the parent <tr>, so rxFloatingHeader can
            // easily identify this <tr>
            element.parent().parent().addClass('rx-table-filter-row');

            scope.displayed = false;

            scope.toggleBulkActions = function () {
                scope.displayed = !scope.displayed;
            };

            var numSelectedChange = function (numSelected) {
                scope.rowsSelected = numSelected > 0;
                if (numSelected === 0) {
                    scope.displayed = false;
                }
            };
            rxBulkSelectCtrl.registerForNumSelected(numSelectedChange);

            if (!_.isUndefined(rxFloatingHeaderCtrl)) {
                // When rxBatchActions lives inside of an rxFloatingHeader enabled table,
                // the element will be cloned by rxFloatingHeader. The issue is that a normal
                // .clone() does not clone Angular bindings, and thus the cloned element doesn't
                // have `ng-show="displayed"` on it. We can manually add `ng-hide` on startup, to
                // ensure that class is present in the clone. After that, everything will work as expected.
                if (!scope.displayed) {
                    rxDOMHelper.find(element, '.batch-action-menu-container').addClass('ng-hide');
                }
                rxFloatingHeaderCtrl.update();
            }

        }
    };
    
})
.factory('rxBulkSelectUtils', function () {
    var rxBulkSelectUtils = {};
    
    var allVisibleRows = function (tableElement) {
        return _.map(tableElement[0].querySelectorAll('td .rx-bulk-select-row'), angular.element);
    };

    // state is true or false, indicating whether the rows should be selected or deselected
    rxBulkSelectUtils.setAllVisibleRows = function (state, tableElement, rowKey) {
        _.each(allVisibleRows(tableElement), function (row) {
            row.scope().row[rowKey] = state;
        });
    };

    return rxBulkSelectUtils;
})

/**
 * @ngdoc service
 * @name encore.ui.rxBulkSelect:NotifyProperties
 * @description
 *
 * This factory provides functionality for abstracting "properties", and allowing
 * other directives/controllers/etc. to register for notifications when the properties
 * change. It would normally be used for a parent directive's controller, and child element
 * directives that "require" that controller.
 *
 * For example, say you have a value you want to track, which we'll call `numSelected`.
 * This will be a plain integer value that you have complete control over. What you want
 * is for other directives/controllers/etc to be able to register for notifications whenever
 * `numSelected` changes. 
 *
 * The `registrationFn` method here sets all of this up. In your directive/controller where
 * you want your property to live, do something like:
 *
 * stats = { _numSelected: 0 };
 * scope.registerForNumSelected = NotifyProperties.registrationFn(stats, 'numSelected', '_numSelected');
 *
 * This is saying "We have a property `_numSelected` in `stats`, and we want it exposted as `numSelected`
 * in `stats`. Whenever `stats.numSelected` is modified, other directives/controllers should be notified"
 *
 * Anyone that wants to register for notifications can call `registerForNumSelected(notificationFunction)`. Then,
 * whenever `numSelected` changes, it will call `notificationFunction(newValue, oldValue)`
 *
 * This means that if you do `stats.numSelected = 20`, everyone that registered for notifications will
 * get their notification function called.
 */
.factory('NotifyProperties', function ($timeout) {
    var NotifyProperties = {};

    NotifyProperties.registrationFn = function (dst, name, sourceName) {
        var listeners = [];
        var notify = function (newVal, oldVal) {
            _.each(listeners, function (fn) {
                $timeout(function () { fn(newVal, oldVal); });
                fn(newVal, oldVal);
            });
        };

        Object.defineProperty(dst, name, {
            get: function () { return dst[sourceName]; },
            set: function (newVal) {
                var oldVal = dst[sourceName];
                dst[sourceName] = newVal;
                notify(newVal, oldVal);
            },
        });
        return function register (fn) {
            listeners.push(fn);
        };

    };

    return NotifyProperties;
    
});
