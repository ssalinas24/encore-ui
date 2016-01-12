angular.module('encore.ui.quarks')
/**
 * @ngdoc service
 * @name quarks.service:LocalStorage
 * @deprecated
 * @description
 * **NOTICE:** This service has be deprecated in favor of the 
 * {@link quarks.service:rxLocalStorage rxLocalStorage} service.
 */
.service('LocalStorage', function (rxLocalStorage) {
    return rxLocalStorage;
});
