angular.module('encore.ui.rxMultiSelect', ['encore.ui.rxMisc', 'encore.ui.rxSelect', 'encore.ui.rxSelectFilter'])
/**
 * @ngdoc filter
 * @name encore.ui.rxMultiSelect:Apply
 * @description
 * Used to apply an instance of multi select
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
 * @ngdoc directive
 * @name encore.ui.rxSelectFilter:rxMultiSelect
 * @restrict E
 * @description
 * A multi-select dropdown with checkboxes for each option
 *
 * @param {string} ng-model The scope property that stores the value of the input
 * @param {Array} [options] A list of the options for the dropdown
 */
.directive('rxMultiSelect', function ($document, rxDOMHelper, rxSelectDirective) {

    function directiveController ($scope) {
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
    }

    function directiveLinker (scope, element, attrs, controllers) {
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

    return {
        restrict: 'E',
        templateUrl: 'templates/rxMultiSelect.html',
        transclude: true,
        require: ['rxMultiSelect', 'ngModel'],
        scope: {
            selected: '=ngModel',
            options: '=?',
        },
        controller: directiveController,
        link: directiveLinker
    };
})


