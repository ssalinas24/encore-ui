var _ = require('lodash');

/**
 * @namespace
 */
exports.rxMisc = {
    /**
     * @function
     * @description Equivalent to `browser.actions().mouseDown(elem).mouseUp().perform();`.
     * This function should be used when dealing with odd or unusual behavior while interacting with click events
     * that don't seem to work right. Either the element does not appear to respond to a normal `.click()` call, or
     * the element is responding to more than one click event. This typically happens more often in Firefox than
     * in other browsers.
     * @param {ElementFinder} elem - Element to "slow click".
     * @example
     * it('should click the crazy custom HTML thing that looks like a button but isn\'t', function () {
     *     var crazyButton = $('.button-wrapper[id="userId_"' + browser.params.userId + '"]');
     *     crazyButton.click(); // didn't work!
     *     expect(encore.rxNotify.all.exists('You will be redirected', 'success')).to.eventually.be.false;
     *     encore.rxMisc.slowClick(crazyButton);
     *     expect(encore.rxNotify.all.exists('You will be redirected', 'success')).to.eventually.be.true;
     * });
     */
    slowClick: function (elem) {
        browser.actions().mouseDown(elem).mouseUp().perform();
    },

    /**
     * @description **Note: This function does not return a promise. It returns a direct value.**
     * Transform `currencyStringOrArray` (USD) to an integer representing pennies or an array of integers representing
     * pennies. Built to reverse Angular's 'currency' filter. Do not pass in fractions of a penny because it will be
     * rounded with Math.round() which doesn't use bankers' rounding for negative numbers.
     * NOTE: AngularJS representation of negative currency changes in
     * [AngularJS v1.4.4](https://code.angularjs.org/1.4.4/docs/api/ng/filter/currency)
     * @param {string|array<string>} currencyStringOrArray - Raw text or an array of raw texts as output by Angular's
     * `currency` filter.
     *
     * @example
     * expect(encore.rxMisc.currencyToPennies('$0.01')).to.equal(1);
     * expect(encore.rxMisc.currencyToPennies('$100 CAN')).to.equal(10000);
     * expect(encore.rxMisc.currencyToPennies('($100 AUS)')).to.equal(-10000);
     * expect(encore.rxMisc.currencyToPennies('$1.10')).to.equal(110);
     * expect(encore.rxMisc.currencyToPennies(['$0.01', '($100 AUS)', '$150.14'])).to.eql([1, -10000, 15014]);
     */
    currencyToPennies: function (currencyStringOrArray) {
        var convert = function (currencyString) {
            var resFloat = parseFloat(currencyString.split(' ')[0].replace(/[,$()]/g, '').trim());

            // Negative number
            if (_.first(currencyString) === '(' && _.last(currencyString) === ')') {
                resFloat = -resFloat;
            }

            return parseInt(Math.round(resFloat * 100), 10);
        };

        if (typeof currencyStringOrArray === 'string') {
            return convert(currencyStringOrArray);
        } else if (Array.isArray(currencyStringOrArray)) {
            return _.map(currencyStringOrArray, convert);
        }
    },

    /**
     * @see http://rackerlabs.github.io/encore-ui/#/styles/formatting
     * @description **Note: This function does not return a promise. It returns a direct value.**
     * A convenience function to pass to `.then` when a date is needed from text.
     * If there is any manipulation of the text needed to render a valid date in
     * javascript, then you shouldn't use this function. If that is the case, see the link to the
     * Encore-UI styleguide listed in the "See" addendum below. There should be no need to manipulate
     * a date's text to create a valid date object if you are following the styleguide.
     * @param {String} dateText - Text that represents the date object in the UI.
     * @returns {Date}
     * @example
     * // instead of doing this
     * startDate: {
     *     get: function () {
     *         return element(by.binding('startDate')).getText().then(function (text) {
     *             return new Date(text);
     *         });
     *     }
     * },
     *
     * // use this instead
     * endDate: {
     *     get: function () {
     *         return element(by.binding('endDate')).getText().then(encore.rxMisc.newDate);
     *     }
     * }
     */
    newDate: function (dateText) {
        return new Date(dateText);
    },

    /**
     * @function
     * @description Utility function to negate a value in a `.then` callback using shorthand.
     * @param {*} value - The value to toggle. Runs the `!` operator on the value.
     * @returns {*} Whatever happens when you run `!value` on `value`. Use with caution!
     * @example
     * var myPage = {
     *     someComponent: {
     *         isOpen: function () {
     *             return $('.opened-component').isPresent();
     *         },
     *
     *         isClosed: function () {
     *             return this.isOpen().then(encore.rxMisc.negate);
     *         }
     *     }
     * };
     */
    negate: function (value) {
        return !value;
    },

    /**
     * @description A list of common strings that appear in the UI that represent `null` to a page object.
     * Add to this list yourself or create a new one in this namespace for your application.
     * @example
     * var userPage {
     *     get emailPreferences() { return element(by.model('email.preferences')).getText(); }
     * };
     *
     * it('should return null for the user email preferences', function () {
     *     encore.rxMisc.nullValueMatches.push('Unregistered'); // this is permanent for the test run
     *     // this element's inner text is "Unregistered", triggering a `null` response
     *     expect(userPage.emailPreferences).to.eventually.be.null;
     * });
     */
    nullValueMatches: [],

    /**
     * @description If the `elem` is found, invoke `innerFn` on the resulting element.
     * If there is no element found (or displayed), return `null`.
     * If the element is found and displayed, but the text matches something in {@link rxMisc.nullValueMatches},
     * then it is considered invalid, and by default, `null` is returned. You can specify a final argument,
     * `fallbackReturnValue`, which will over ride the default `null` response into something else you'd prefer.
     * This is useful when applications feature use of `ng-if` to control various messages to the user.
     * @function
     * @param {ElementFinder} elem - The ElementFinder that may or may not be present, or displayed, or valid.
     * @param {Function} [innerFn=getText()] -
     * Function to call on the element should it be present, displayed, and valid.
     * @param {*} [fallbackReturnValue=null] -
     * Returned if the ElementFinder is not present, or not displayed, or invalid.
     * @example
     * // given this html
     * <span class="accent-text">
     *   <span ng-if="balance.currentBalance">
     *     {{balance.currentBalance | currency }} {{balance.currency}}
     *   </span>
     *   <span ng-if="!balance.currentBalance">
     *     N/A
     *   </span>
     * </span>
     *
     * // this would be your page object
     * var balancePage = Page.create({
     *     balance: {
     *         get: function () {
     *             var balanceElement = element(by.binding('currentBalance'));
     *             // will return `null` if "N/A". Otherwise, will transform to Number.
     *             return encore.rxMisc.unless(balanceElement, function (elem) {
     *                 return elem.getText().then(encore.rxMisc.currencyToPennies);
     *             });
     *         }
     *     }
     * });
     *
     * // this would be in your protractor.conf.js file
     * onPrepare: function () {
     *     encore.rxMisc.nullValueMatches.push('N/A');
     * }
     */
    unless: function (elem, innerFn, fallbackReturnValue) {
        if (fallbackReturnValue === undefined) {
            fallbackReturnValue = null;
        }

        return elem.isPresent().then(function (present) {
            if (present) {
                return elem.isDisplayed().then(function (displayed) {
                    if (displayed) {
                        return elem.getText().then(function (text) {
                            if (exports.rxMisc.nullValueMatches.indexOf(text.trim()) > -1) {
                                return fallbackReturnValue;
                            }
                            return innerFn === undefined ? text : innerFn(elem);
                        });
                    }
                    // not displayed
                    return fallbackReturnValue;
                });
            }
            // not present
            return fallbackReturnValue;
        });
    },

    /**
     * @see https://github.com/Droogans/node-timing.js#sample-output-of-timinggettimes
     * @description A collection of timing information from the current browser being used in a
     * Selenium test. Can return just one item of interest, or can accept a list of items to return
     * if you need many different timing metrics. If no parameter is used, all timing metrics are returned.
     * @function
     * @param {String|Array} [keys] - Key to get (string), keys to get (Array), or all (`undefined`).
     * @returns {Object} An object of timings that can be used to infer browser render performance.
     * @example
     * it('should have loaded the page in less than two seconds', function () {
     *     expect(encore.rxMisc.getPerformanceMetrics('loadTime')).to.eventually.be.under(2000);
     * });
     */
    getPerformanceMetrics: function (keys) {
        return browser.driver.executeScript(require('node-timing.js').getTimes).then(function (times) {
            if (_.isString(keys)) {
                return times[keys];
            } else if (_.isArray(keys)) {
                return _.pick(times, keys);
            } else {
                return times;
            }
        });
    },

    /**
     * @description Accepts an ElementFinder, or an ElementArrayFinder, which can have several locations.
     * Should the list of elements be stacked vertically (say, in a list of table rows),
     * the element with the smallest Y coordinate will be scrolled to.
     * @function
     * @param {ElementFinder|ElementArrayFinder} elem - An element, or a list of elements to scroll to.
     * @example
     * var tablePage = {
     *     get tblRows() { return element.all(by.repeater('row in rows')); },
     *     isLoading: function () {
     *         return $('.infinite-scrolling.loading');
     *     },
     *
     *     triggerLoad: function () {
     *         encore.rxMisc.scrollToElement(this.tblRows.get(-1));
     *     }
     * };
     *
     * it('should scroll to the bottom of the table and load more stuff', function () {
     *    browser.ignoreSynchronization = true;
     *    tablePage.triggerLoad();
     *    expect(tablePage.isLoading()).to.eventually.equal(true);
     *    browser.ignoreSynchronization = false;
     * });
     */
    scrollToElement: function (elem) {
        return elem.getLocation().then(function (loc) {
            if (_.isArray(loc)) {
                loc = _.min(loc, 'y');
            }

            var command = ['window.scrollTo(0, ', loc.y.toString(), ');'].join('');
            browser.executeScript(command);
        });
    },

    /**
     * @function
     * @description Whether or not `e1` and `e2` have the same Y coordinates.
     * @param {ElementFinder} e1 First element to compare Y locations against.
     * @param {ElementFinder} e2 Second element to compare Y locations against.
     * @returns {Boolean}
     * @example
     * var rowOfThings = $$('ul li'); // inline-style row list
     * expect(listOfThings.count()).to.eventually.equal(2);
     * var firstThing = listOfThings.get(0);
     * var lastThing = listOfThings.get(1);
     * expect(encore.rxMisc.compareYLocations(firstThing, lastThing)).to.eventually.be.true;
     */
    compareYLocations: function (e1, e2) {
        return this.compareLocations(e1, e2, 'y');
    },

    /**
     * @function
     * @description Whether or not `e1` and `e2` have the same X coordinates.
     * @param {ElementFinder} e1 First element to compare X locations against.
     * @param {ElementFinder} e2 Second element to compare X locations against.
     * @returns {Boolean}
     * @example
     * var listOfThings = $$('ol li'); // left-justified list
     * expect(listOfThings.count()).to.eventually.equal(2);
     * var firstThing = listOfThings.get(0);
     * var lastThing = listOfThings.get(1);
     * expect(encore.rxMisc.compareXLocations(firstThing, lastThing)).to.eventually.be.true;
     */
    compareXLocations: function (e1, e2) {
        return this.compareLocations(e1, e2, 'x');
    },

    /**
     * @function
     * @private
     * @description
     * Unify input from either a location object or an ElementFinder into a promise
     * representing the location attribute (x or y) of either input.
     * Both `transformLocation($('.element'), 'y')` and `transformLocation({x: 20, y: 0}, 'y')`
     * return a promise representing the y value of the resulting (or provided) location object.
     */
    transformLocation: function (elementOrLocation, attribute) {
        if (_.isFunction(elementOrLocation.getLocation)) {
            var elem = elementOrLocation;
            return elem.getLocation().then(function (loc) {
                return loc[attribute];
            });
        } else {
            var location = elementOrLocation;
            if (_.has(location, attribute)) {
                return protractor.promise.fulfilled(location[attribute]);
            } else {
                return protractor.promise.fulfilled(location);
            }
        }
    },

    /**
     * @private
     * @function
     * @param {ElementFinder} e1 First element to compare locations against.
     * @param {ElementFinder} e2 Second element to compare locations against.
     * @param {String} attribute attribute to compare ('x' or 'y')
     */
    compareLocations: function (e1, e2, attribute) {
        var promises = [
            this.transformLocation(e1, attribute),
            this.transformLocation(e2, attribute)
        ];

        return protractor.promise.all(promises).then(function (locations) {
            return locations[0] === locations[1];
        });
    }
};
