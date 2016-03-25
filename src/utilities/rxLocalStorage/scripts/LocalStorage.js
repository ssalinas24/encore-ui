angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:LocalStorage
 * @deprecated
 * @description
 * **NOTICE:** This service has be deprecated in favor of the
 * {@link utilities.service:rxLocalStorage rxLocalStorage} service.
 */
.service('LocalStorage', function (rxLocalStorage) {
    return rxLocalStorage;
});
