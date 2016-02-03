angular.module('encore.ui.quarks')
/**
 * @ngdoc service
 * @name quarks.service:rxHideIfUkAccount
 * @description
 * Check if account number in the URL is of UK origin.
 *
 * @return {Boolean} false if account number matches UK pattern
 * Use it as `visibility: [ 'rxHideIfUkAccount' ]`
 */
.factory('rxHideIfUkAccount', function ($routeParams) {
    var isUkAccount = {
        name: 'rxHideIfUkAccount',
        method: function () {
            return $routeParams.accountNumber < 10000000;
        }
    };

    return isUkAccount;
});
