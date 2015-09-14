/**
 * @ngdoc overview
 * @name rxSelectFilter
 * @description
 * # rxSelectFilter component
 *
 * [TBD]
 *
 * ## Directives
 * * {@link rxSelectFilter.directive:rxMultiSelect rxMultiSelect}
 * * {@link rxSelectFilter.directive:rxSelectFilter rxSelectFilter}
 * * {@link rxSelectFilter.directive:rxSelectOption rxSelectOption}
 *
 * ## Filters
 * * {@link rxSelectFilter.filter:Apply Apply}
 *
 * ## Services
 * * {@link rxSelectFilter.service:SelectFilter SelectFilter}
 */
angular.module('encore.ui.rxSelectFilter', ['encore.ui.rxMisc', 'encore.ui.rxSelect'])
/**
 * @ngdoc filter
 * @name rxSelectFilter.filter:Apply
 * @description
 * Used to apply an instance of SelectFilter to an array.
 *
 * @param {Array} list The list to be filtered.
 * @param {Object} filter An instance of SelectFilter
 */
.filter('Apply', function () {
    return function (list, filter) {
        return filter.applyTo(list);
    };
})
/**
 * @ngdoc service
 * @name rxSelectFilter.service:SelectFilter
 * @description
 * A prototype for creating objects that can be used for filtering arrays.
 *
 * @method create(options) - Create a filter that tracks the provided properties.
 */
.service('SelectFilter', function () {
    return {
        create: function (options) {
            options = _.defaults(options, {
                properties: [],
                available: {},
                selected: _.isUndefined(options.available) ? {} : _.cloneDeep(options.available)
            });

            var filter = _.cloneDeep(options);

            var firstRun = true;

            function init (list) {
                filter.properties.forEach(function (property) {
                    if (_.isUndefined(filter.available[property])) {
                        filter.available[property] = _.uniq(_.pluck(list, property));
                    }

                    // Check `options.selected` instead of `filter.selected` because the latter
                    // is used as the model for `<rx-multi-select>`, which initializes its
                    // model to an empty array. However, the intent is select all options
                    // initially when left unspecified (preferred default behavior).
                    if (_.isUndefined(options.selected[property])) {
                        filter.selected[property] = _.clone(filter.available[property]);
                    }
                });
            }

            function isItemValid (item) {
                return filter.properties.every(function (property) {
                    return _.contains(filter.selected[property], item[property]);
                });
            }

            filter.applyTo = function (list) {
                if (firstRun) {
                    firstRun = false;
                    init(list);
                }
                return list.filter(isItemValid);
            };

            return filter;
        }
    };
})
/**
 * @ngdoc directive
 * @name rxSelectFilter.directive:rxSelectFilter
 * @restrict E
 * @scope
 * @description
 * Autmatically creates the appropriate dropdowns to manage a filter object.
 *
 * @param {Object} filter - An instance of SelectFilter
 */
.directive('rxSelectFilter', function () {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxSelectFilter.html',
        scope: {
            filter: '='
        }
    };
})
/**
 * @ngdoc directive
 * @name rxSelectFilter.directive:rxMultiSelect
 * @restrict E
 * @scope
 * @description
 * A multi-select dropdown with checkboxes for each option
 *
 * @param {String} ng-model The scope property that stores the value of the input
 * @param {Array} [options] A list of the options for the dropdown
 */
.directive('rxMultiSelect', function ($document, rxDOMHelper, rxSelectDirective) {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxMultiSelect.html',
        transclude: true,
        require: ['rxMultiSelect', 'ngModel'],
        scope: {
            selected: '=ngModel',
            options: '=?',
        },
        controller: function ($scope) {
            if (_.isUndefined($scope.selected)) {
                $scope.selected = [];
            }

            this.options = [];
            this.addOption = function (option) {
                if (option !== 'all') {
                    this.options = _.union(this.options, [option]);
                    this.render();
                }
            };
            this.removeOption = function (option) {
                if (option !== 'all') {
                    this.options = _.without(this.options, option);
                    this.unselect(option);
                    this.render();
                }
            };

            this.select = function (option) {
                $scope.selected = option === 'all' ? _.clone(this.options) : _.union($scope.selected, [option]);
            };
            this.unselect = function (option) {
                $scope.selected = option === 'all' ? [] : _.without($scope.selected, option);
            };
            this.isSelected = function (option) {
                if (option === 'all') {
                    return this.options.length === $scope.selected.length;
                } else {
                    return _.contains($scope.selected, option);
                }
            };

            this.render = function () {
                if (this.ngModelCtrl) {
                    this.ngModelCtrl.$render();
                }
            };
        },
        link: function (scope, element, attrs, controllers) {
            rxSelectDirective[0].link.apply(this, arguments);

            var previewElement = rxDOMHelper.find(element, '.preview')[0];

            var documentClickHandler = function (event) {
                if (event.target !== previewElement) {
                    scope.listDisplayed = false;
                    scope.$apply();
                }
            };

            $document.on('click', documentClickHandler);
            scope.$on('$destroy', function () {
                $document.off('click', documentClickHandler);
            });

            scope.listDisplayed = false;

            scope.toggleDisplay = function (event) {
                if (event.target === previewElement) {
                    scope.listDisplayed = !scope.listDisplayed;
                } else {
                    event.stopPropagation();
                }
            };

            var selectCtrl = controllers[0];
            var ngModelCtrl = controllers[1];

            ngModelCtrl.$render = function () {
                scope.$evalAsync(function () {
                    scope.preview = (function () {
                        function getLabel (option) {
                            var optionElement = rxDOMHelper.find(element, '[value="' + option + '"]');
                            return optionElement.text().trim();
                        }

                        if (_.isEmpty(scope.selected)) {
                            return 'None';
                        } else if (scope.selected.length === 1) {
                            return getLabel(scope.selected[0]) || scope.selected[0];
                        } else if (scope.selected.length === selectCtrl.options.length - 1) {
                            var option = _.first(_.difference(selectCtrl.options, scope.selected));
                            return 'All except ' + getLabel(option) || scope.selected[0];
                        } else if (scope.selected.length === selectCtrl.options.length) {
                            return 'All Selected';
                        } else {
                            return scope.selected.length + ' Selected';
                        }
                    })();
                });
            };

            selectCtrl.ngModelCtrl = ngModelCtrl;
        }
    };
})
/**
 * @ngdoc directive
 * @name rxSelectFilter.directive:rxSelectOption
 * @restrict E
 * @description
 * A single option for rxMultiSelect
 *
 * @param {String} value The value of the option. If no transcluded content is provided,
 *                       the value will also be used as the option's text.
 */
.directive('rxSelectOption', function (rxDOMHelper) {
    return {
        restrict: 'E',
        templateUrl: 'templates/rxSelectOption.html',
        transclude: true,
        scope: {
            value: '@'
        },
        require: '^^rxMultiSelect',
        link: function (scope, element, attrs, selectCtrl) {
            scope.transclusion = rxDOMHelper.find(element, '[ng-transclude] > *').length > 0;

            scope.toggle = function () {
                if (scope.isSelected) {
                    selectCtrl.unselect(scope.value);
                } else {
                    selectCtrl.select(scope.value);
                }
            };

            // The state of the input may be changed by the 'all' option.
            scope.$watch(function () {
                return selectCtrl.isSelected(scope.value);
            }, function (isSelected) {
                scope.isSelected = isSelected;
            });

            selectCtrl.addOption(scope.value);

            scope.$on('$destroy', function () {
                selectCtrl.removeOption(scope.value);
            });
        }
    };
});
