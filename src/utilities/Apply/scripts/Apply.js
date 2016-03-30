angular.module('encore.ui.utilities')
/**
 * @ngdoc filter
 * @name utilities.filter:Apply
 * @description
 * Used to apply an instance of {@link utilities.service:SelectFilter SelectFilter} to an array.
 *
 * Merely calls the `applyTo()` method of a `SelectFilter` instance to an
 * input array.
 * <pre>
 * <tr ng-repeat="item in list | Apply:filter">
 * </pre>
 *
 * @param {Array} list The list to be filtered.
 * @param {Object} filter An instance of SelectFilter
 *
 */
.filter('Apply', function () {
    return function (list, filter) {
        return filter.applyTo(list);
    };
});
