angular.module('encore.ui.rxOptionTable')
/**
 * @deprecated
 * @ngdoc directive
 * @restrict E
 * @name rxOptionTable.directive:rxFormOptionTable
 * @description
 * **DEPRECATED**: Please use **{@link rxOptionTable.directive:rxOptionTable rxOptionTable}**
 * as a stand-in-replacement.
 */
.directive('rxFormOptionTable', function (rxOptionTableDirective) {
    var warnMsg = 'DEPRECATION WARNING: rxFormOptionTable has been marked as deprecated ' +
        'and will be removed in a future release of the EncoreUI framework. ' +
        'Please use rxOptionTable as a stand-in replacement.';
    console.warn(warnMsg);
    return rxOptionTableDirective[0];
});
