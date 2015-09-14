/**
 * @ngdoc overview
 * @name rxAccountInfo
 * @description
 * # rxAccountInfo Component
 *
 * [TBD]
 *
 * ## Directives
 * * {@link rxAccountInfo.directive:rxAccountInfo rxAccountInfo}
 */
angular.module('encore.ui.rxAccountInfo', [])
/**
 * @ngdoc directive
 * @name rxAccountInfo.directive:rxAccountInfo
 * @restrict E
 * @scope
 * @description
 * Responsible for drawing an account info box.
 *
 * There are two different styles of account info box supported. The "old" one, which appears
 * wherever you want it to be, and a new one that is intended to be placed underneath the breadcrumbs.
 * To use the new one, pass `account-info-banner="true"` to this directive
 *
 * @param {string} accountNumber - The account number to load and retrieve data for
 * @param {string} [teamId] - Optional team ID, used for loading team badges
 * @param {string} [notifyStack] - Optional notifications stack to put errors on. Defaults to `page`
 * @param {string} [accountInfoBanner] - Set to "true" to use the new under-the-breadcrumbs style
 */
.directive('rxAccountInfo', function (Teams, SupportAccount, Encore, rxNotify, encoreRoutes,
                                    AccountStatusGroup) {
    return {
        templateUrl: function (elem, attr) {
            if (attr.accountInfoBanner === 'true') {
                return 'templates/rxAccountInfoBanner.html';
            }
            return 'templates/rxAccountInfo.html';
        },
        restrict: 'E',
        transclude: true,
        scope: {
            accountNumber: '@',
            teamId: '@',
            notifyStack: '@'
        },
        link: function (scope) {
            var notifyStack = scope.notifyStack || 'page';
            scope.badges = [];
            scope.tooltipHtml = function (badge) {
                return ['<span class="tooltip-header">', badge.name,
                        '</span><p>', badge.description, '</p>'].join('');
            };

            // Currently, the only time we should show the `Current User` area is
            // if the Racker is on the Cloud page
            encoreRoutes.isActiveByKey('cloud').then(function (isCloud) {
                scope.showCurrentUser = isCloud;
            });

            scope.accountPageUrl = _.template('/accounts/<%= accountNumber %>', scope);

            SupportAccount.getBadges({ accountNumber: scope.accountNumber }, function (badges) {
                scope.badges = scope.badges.concat(badges);
            }, function () {
                rxNotify.add('Error retrieving badges for this account', {
                    type: 'error',
                    stack: notifyStack
                });
            });

            if (!_.isEmpty(scope.teamId) && (_.isNumber(_.parseInt(scope.teamId)))) {
                Teams.badges({ id: scope.teamId }).$promise.then(function (badges) {
                    scope.badges = scope.badges.concat(badges);
                }, function () {
                    rxNotify.add('Error retrieving badges for this team', {
                        type: 'error',
                        stack: notifyStack
                    });
                });
            }

            Encore.getAccount({ id: scope.accountNumber }, function (account) {
                scope.accountName = account.name;
                scope.accountStatus = account.status;
                scope.accountAccessPolicy = account.accessPolicy;
                scope.statusClass = '';
                var statusClass = AccountStatusGroup(account.status);
                if (statusClass === 'warning') {
                    scope.statusClass = 'msg-warn';
                } else if (statusClass === 'info') {
                    scope.statusClass = 'msg-info';
                }
            }, function () {
                rxNotify.add('Error retrieving account name', {
                    type: 'error',
                    stack: notifyStack
                });
            });
        }
    };
});
