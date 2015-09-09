/*jshint node:true*/
var Page = require('astrolabe').Page;

/**
   The specific information about a single badge.
   Returned from {@link rxAccountInfo.badge}
   @namespace rxAccountInfo.badge.badge
 */
var badge = function (rootElement) {
    return Page.create({

        /**
           A link to the image source for the badge.
           @memberof rxAccountInfo.badge.badge
           @returns {String} The attribute under `ng-src` for the badge.
         */
        src: {
            get: function () {
                return rootElement.getAttribute('ng-src');
            }
        },

        /**
           Will get the `data-name` attribute from the badge.
           @memberof rxAccountInfo.badge.badge
           @returns {String} The name of the badge.
         */
        name: {
            get: function () {
                return rootElement.getAttribute('data-name');
            }
        },

        /**
           Will get the `data-description` attribute from the badge.
           @memberof rxAccountInfo.badge.badge
           @returns {String} The description of the badge.
         */
        description: {
            get: function () {
                return rootElement.getAttribute('data-description');
            }
        }

    });
};

/**
   @namespace
 */
var rxAccountInfo = {

    tblBadges: {
        get: function () {
            return this.rootElement.$$('.account-info-badge img');
        }
    },

    lblStatus: {
        get: function () {
            return this.rootElement.$('.account-status');
        }
    },

    /**
       @function
       @returns {Boolean} Whether the root element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
       @returns {String} The name of the account.
     */
    name: {
        get: function () {
            return this.rootElement.element(by.binding('accountName')).getText();
        }
    },

    /**
       @returns {String} The account number.
     */
    number: {
        get: function () {
            return this.rootElement.element(by.binding('accountNumber')).getText();
        }
    },

    /**
       @returns {String} The account access policy.
     */
    accessPolicy: {
        get: function () {
            return this.rootElement.element(by.binding('accountAccessPolicy')).getText();
        }
    },

    /**
       The resulting status is lowercased so that it is easy to use with
       <a href="#encore.module_rxAccountInfo.statuses">encore.rxAccountInfo.statuses</a>.
       @returns {String} The account status, to lower case.
     */
    status: {
        get: function () {
            return this.lblStatus.getText().then(function (text) {
                return text.toLowerCase();
            });
        }
    },

    /**
       Parses a class name from the DOM to determine what the status of the account is.
       Designed to be easily compared with
       <a href="#encore.module_rxAccountInfo.statusTypes">encore.rxAccountInfo.statusTypes</a>.
       @returns {String} The status type of the account.
     */
    statusType: {
        get: function () {
            return this.lblStatus.getAttribute('class').then(function (classNames) {
                var className = classNames.match(/msg-(\w+)/);
                return className === null ? 'active' : className[1];
            });
        }
    },

    /**
       @namespace rxAccountInfo.badge
     */
    badge: {
        get: function () {
            var page = this;
            return Page.create({

                /**
                   @function
                   @param {Number} index - The badge to return at position `index`.
                   @memberof rxAccountInfo.badge
                   @returns {rxAccountInfo.badge.badge} A single badge object at position `index`.
                 */
                byIndex: {
                    value: function (index) {
                        return badge(page.tblBadges.get(index));
                    }
                },

                /**
                   @function
                   @param {String} badgeName - The name of the badge to check if present.
                   @memberof rxAccountInfo.badge
                   @returns {Boolean} Whether or not the badge `badgeName` is present.
                 */
                exists: {
                    value: function (badgeName) {
                        return page.rootElement.$('img[data-name="' + badgeName + '"]').isPresent();
                    }
                },

                /**
                   Accepts a string for a fast, exact match only. Matches on the `img[data-name]` attribute.
                   @function
                   @memberof rxAccountInfo.badge
                   @param {String} badgeName - Badge name to match against.
                   @returns {rxAccountInfo.badge.badge} A single badge objects by name `badgeName`.
                 */
                byName: {
                    value: function (badgeName) {
                        return badge(page.rootElement.$('img[data-name="' + badgeName + '"]'));
                    }
                },

                /**
                   @memberof rxAccountInfo.badge
                   @returns {String[]} All badge names.
                 */
                names: {
                    get: function () {
                        return page.tblBadges.map(function (badgeElement) {
                            return badge(badgeElement).name;
                        });
                    }
                },

                /**
                   @function
                   @returns {Number} The total number of badges for the account.
                 */
                count: {
                    value: function () {
                        return page.tblBadges.count();
                    }
                }

            });
        }
    },

    badges: {
        get: function () {
            var page = this;
            return Page.create({
                matchingName: {
                    value: function (badgeRegExp) {
                        return page.tblBadges.filter(function (badgeElement) {
                            return badgeElement.getAttribute('data-name').then(function (name) {
                                return badgeRegExp.test(name) === true;
                            });
                        }).then(function (matchingElements) {
                            return matchingElements.map(function (matchingElement) {
                                return badge(matchingElement);
                            });
                        });
                    }
                }
            });
        }
    }

};

/**
   @exports encore.rxAccountInfo
 */
exports.rxAccountInfo = {

    /**
       @function
       @param {WebElement} rxAccountInfoElement - WebElement to be transformed into an rxAccountInfoElement object
       @returns {rxAccountInfo} Page object representing the rxAccountInfo object.
     */
    initialize: function (rxAccountInfoElement) {
        rxAccountInfo.rootElement = {
            get: function () { return rxAccountInfoElement; }
        };
        return Page.create(rxAccountInfo);
    },

    /**
       @returns {rxAccountInfo} Page object representing the _first_ rxAccountInfo object found on the page.
     */
    main: (function () {
        rxAccountInfo.rootElement = {
            get: function () { return $('html'); }
        };
        return Page.create(rxAccountInfo);
    })(),

    /**
       @constant
       @returns {Object} Lookup of account statuses from status text. Used for comparisons in tests.
       @example
       ```js
       expect(encore.rxAccountInfo.main.status).to.eventually.equal(encore.rxAccountInfo.statuses.delinquent);
       ```
     */
    statuses: {
        approvalDenied: 'approval denied',
        aupViolation: 'aup violation',
        delinquent: 'delinquent',
        pendingApproval: 'pending approval',
        pendingMigration: 'pending migration',
        suspended: 'suspended',
        terminated: 'terminated',
        testStatus: 'teststatus',
        unverified: 'unverified'
    },

    /**
       @constant
       @returns {Object} Lookup of status types from a human-readable class name. Used for comparisons in tests.
       @example
       ```js
       expect(encore.rxAccountInfo.main.statusType).to.eventually.equal(encore.rxAccountInfo.statusTypes.warning);
       ```
     */
    statusTypes: {
        active: 'active',
        info: 'info',
        warning: 'warn'
    }

};
