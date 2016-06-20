var Page = require('astrolabe').Page;
var moment = require('moment');

var rxSelect = require('./rxSelect.page').rxSelect;
var rxMisc = require('./rxMisc.page').rxMisc;

/**
 * @namespace
 */
var rxDatePicker = {

    /**
     * @private
     * @instance
     * @type {ElementArrayFinder}
     */
    tblCurrentMonthDays: {
        get: function () {
            return this.rootElement.$$('.day.inMonth');
        }
    },

    /**
     * @private
     * @function
     * @instance
     * @description Return a day in the current visible month by date string.
     * Formatted as an ISOString.
     * @param {String} dateString - ISOString-formatted string representing the date to select.
     * @returns {ElementFinder}
     * @example
     * var picker = encore.rxDatePicker.initialize();
     * picker.open();
     * picker.dateElementByDate('2012-06-23').getAttribute('class');
     */
    dateElementByDate: {
        value: function (dateString) {
            return this.rootElement.$('[data-date="' + dateString + '"]');
        }
    },

    /**
     * @private
     * @function
     * @instance
     * @description Whether or not the date requested is currently selected.
     * @param {Date} date - The date to verify whether or not it is currently selected.
     * @returns {Boolean}
     */
    isDateSelected: {
        value: function (date) {
            this.open();
            var dateString = moment(date).format('YYYY-MM-DD');
            return this.dateElementByDate(dateString).getAttribute('class').then(function (classes) {
                return _.contains(classes, 'selected');
            });
        }
    },

    /**
     * @private
     * @function
     * @instance
     * @description Whether or not the date passed in matches the "today" date in the calendar.
     * @param {Date} [date=new Date] - The date to check against the calendar to confirm that it is today's date.
     * @returns {Boolean}
     */
    isDateToday: {
        value: function (date) {
            this.open();
            var dateString = moment(date).format('YYYY-MM-DD');
            return this.dateElementByDate(dateString).getAttribute('class').then(function (classes) {
                return _.contains(classes, 'today');
            });
        }
    },

    /**
     * @private
     * @instance
     * @function
     * @description Will select the last day of the currently visible month. Does not accept arguments.
     * Set the visible month yourself with {@link rxDatePicker#month} and {@link rxDatePicker#year} first
     * to pick the right last day of the month.
     * @example
     * var picker = encore.rxDatePicker.initialize();
     * picker.date = new Date('January 2016');
     * // don't do this!
     * picker.date = moment(new Date('January 2016')).endOf('month');
     * // the date picker uses all `ISOString()` calls to grab dates.
     * picker.date.then(function (date) {
     *     // notice the timezone conversion -- it will select the first of the next month
     *     // if your machine is set to the Central Standard Time timezone.
     *     expect(date.toISOString()).to.equal('2016-02-01T05:59:59.999Z');
     * });
     * // do this instead
     * picker.date = new Date('January 2016');
     * picker.selectLastDayOfCurrentMonth();
     * picker.date.then(function (date) {
     *     // although the date is the same, `selectLastDayOfCurrentMonth` uses moment
     *     // to select the last day of the month for you, in a way that won't incur
     *     // any timezone changes.
     *     expect(date.toISOString()).to.equal('2016-02-01T05:59:59.999Z');
     * });
     */
    selectLastDayOfCurrentMonth: {
        value: function () {
            var self = this;
            this.open();

            return protractor.promise.all([this.month, this.year]).then(function (results) {
                var currentDate = new Date(results[0] + ' ' + results[1]);
                var lastDate = moment(new Date(currentDate)).endOf('month').format();
                var lastDayString = lastDate.split('T')[0];
                self.selectVisibleDate(lastDayString);
            });
        }
    },

    /**
     * @function
     * @instance
     * @deprecated
     * @description Whether or not the entire calendar component is disabled.
     *
     * **DEPRECATED** Check inverse of `isEnabled()` instead.
     * @return {Promise<Boolean>}
     */
    isDisabled: {
        value: function () {
            return this.isEnabled().then(function (enabled) {
                return !enabled;
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the entire calendar component is enabled.
     * @return {Promise<Boolean>}
     */
    isEnabled: {
        value: function () {
            return this.rootElement.getAttribute('disabled').then(function (disabled) {
                return !disabled;
            });
        }
    },


    /**
     * @function
     * @instance
     * @description Whether or not the entire calendar component is present on the page.
     * @returns {Boolean}
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the calendar is in an invalid state.
     * @return {Boolean}
     */
    isValid: {
        value: function () {
            return this.rootElement.getAttribute('class').then(function (classes) {
                return !_.contains(classes, 'ng-invalid');
            });
        }
    },

    /**
     * @private
     * @instance
     * @function
     * @description Whether or not the calendar is open.
     * @return {Promise<Boolean>}
     */
    isOpen: {
        value: function () {
            return this.rootElement.$('.popup').getAttribute('class').then(function (classes) {
                return !_.contains(classes, 'ng-hide');
            });
        }
    },

    /**
     * @private
     * @instance
     * @function
     * @deprecated
     * @description Whether or not the calendar is closed.
     *
     * **DEPRECATED** Check inverse of `isOpen()` instead.
     * @return {Promise<Boolean>}
     */
    isClosed: {
        value: function () {
            return this.isOpen().then(function (open) {
                return !open;
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Ensures that the date picker is open.
     * @see rxDatePicker#close
     * @example
     * var picker = encore.rxDatePicker.initialize();
     * picker.open();
     * picker.open(); // does nothing
     */
    open: {
        value: function () {
            var self = this;
            this.isOpen().then(function (open) {
                if (!open) {
                    self.rootElement.$('.control').click();
                }
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Ensures that the date picker is closed.
     * @see rxDatePicker#open
     * @example
     * var picker = encore.rxDatePicker.initialize();
     * picker.open();
     * picker.close();
     * picker.close(); // does nothing
     */
    close: {
        value: function () {
            var self = this;
            return this.isOpen().then(function (isOpen) {
                if (isOpen) {
                    self.rootElement.$('.backdrop').click();
                }
            });
        }
    },

    /**
     * @private
     * @instance
     * @function
     * @description Click over to the next month in the calendar.
     */
    nextMonth: {
        value: function () {
            this.open();
            this.rootElement.$('.arrow.next').click();
        }
    },

    /**
     * @private
     * @instance
     * @function
     * @description Click back to the previous month in the calendar.
     */
    previousMonth: {
        value: function () {
            this.open();
            this.rootElement.$('.arrow.prev').click();
        }
    },

    /**
     * @private
     * @instance
     * @function
     * @param {String} dateString - YYYY-MM-DD formatted string to select on the current month.
     * @description Clicks and sets the calendar's date to the one corresponding to `dateString`'s value.
     * @example
     * var picker = rxDatePicker.initialize();
     * picker.monthAndYear = new Date('May 2014');
     * picker.selectVisibleDate('2014-05-13');
     * expect(picker.date).to.eventually.equalDate(new Date('May 13, 2014'));
     */
    selectVisibleDate: {
        value: function (dateString) {
            this.open();
            this.dateElementByDate(dateString).$('span').click();
        }
    },

    /**
     * @private
     * @instance
     * @description Getter/setter for entering and retrieving the month from the date picker.
     * @returns {String} The current month selected on the calendar.
     * @param {String} month - Sets the current month on the calendar.
     */
    month: {
        get: function () {
            return rxSelect.initialize(this.rootElement.element(by.model('currentMonth'))).selectedOption.getText();
        },

        set: function (value) {
            this.open();
            var slowClick = false;
            rxSelect.initialize(this.rootElement.element(by.model('currentMonth'))).select(value, slowClick);
        }
    },

    /**
     * @private
     * @instance
     * @description Getter/setter for entering and retrieving the year from the date picker.
     * The date picker provides a 10-year range before and after the selected date, if present.  Otherwise,
     * the range is calculated from today's date.
     * @returns {String} The current year selected on the calendar.
     * @param {String} year - Sets the current year on the calendar.
     */
    year: {
        get: function () {
            return rxSelect.initialize(this.rootElement.element(by.model('currentYear'))).selectedOption.getText();
        },

        set: function (value) {
            this.open();
            var slowClick = false;
            rxSelect.initialize(this.rootElement.element(by.model('currentYear'))).select(value, slowClick);
        }
    },

    /**
     * @instance
     * @description Getter/setter for entering and retrieving a date from the date picker.
     * @returns {Date} The current date set on the calendar
     * @param {Date} date - The date to pick in the date picker.
     * @example
     * it('should have today\'s date set by default', function () {
     *     var today = new Date(new Date().toISOString().split('T')[0]);
     *     expect(myPage.datepicker.date).to.eventually.equalDate(today);
     * });
     *
     * it('should set the date to Midsummer 2012', function () {
     *     var midsummer = new Date('2012-06-23');
     *     myPage.datepicker.date = midsummer;
     *     expect(myPage.datepicker.date).to.eventually.equalDate(midsummer); // priekā!
     * });
     */
    date: {
        get: function () {
            return this.rootElement.$('.displayValue').getText().then(rxMisc.newDate);
        },

        set: function (date) {
            this.month = date.toString().split(' ')[1];
            this.year = date.toString().split(' ')[3];
            var targetDateString = date.toISOString().split('T')[0];
            this.selectVisibleDate(targetDateString);
        }
    }
};

exports.rxDatePicker = {
    /**
     * @function
     * @memberof rxDatePicker
     * @param {ElementFinder} rxDatePickerElement - ElementFinder to be transformed into an rxDatePicker page object.
     * @returns {rxDatePicker} Page object representing the rxDatepicker element.
     */
    initialize: function (rxDatePickerElement) {
        if (rxDatePickerElement === undefined) {
            rxDatePickerElement = $('rx-date-picker');
        }

        rxDatePicker.rootElement = {
            get: function () { return rxDatePickerElement; }
        };
        return Page.create(rxDatePicker);
    }
};
