'use strict';
var moment = require('moment');
var _ = require('lodash');

var rxSelect = require('./rxSelect.page').rxSelect;

/**
 * @class
 */
class rxDatePicker {
    /**
     * @param {ElementFinder} rxDatePickerElement
     * ElementFinder to be transformed into an rxDatePicker page object
     * @returns {rxDatePicker}
     */
    constructor (rxDatePickerElement) {
        this.rootElement = rxDatePickerElement || $$('rx-date-picker').first();

        // Private selectors
        this.tblCurrentMonthDays = this.rootElement.$$('.day.inMonth');
    }//constructor

    /**
     * @type {String}
     * @description (get/set) Month value of the picker _calendar_.
     *
     * **Format:** `MMM` (e.g. "Apr", "May", "Jun")
     */
    get month () {
        return rxSelect.initialize(this.rootElement.element(by.model('currentMonth'))).selectedOption.getText();
    }
    set month (value) {
        this.open();
        var slowClick = false;
        rxSelect.initialize(this.rootElement.element(by.model('currentMonth'))).select(value, slowClick);
    }

    /**
     * @type {String}
     * @description (get/set) Year value of the picker _calendar_.
     *
     * The date picker provides a 10-year range before and after the selected date,
     * if present.  Otherwise, the range is calculated from today's date.
     *
     * **Format:** `YYYY` (e.g. "2016")
     */
    get year () {
        return rxSelect.initialize(this.rootElement.element(by.model('currentYear'))).selectedOption.getText();
    }
    set year (value) {
        this.open();
        var slowClick = false;
        rxSelect.initialize(this.rootElement.element(by.model('currentYear'))).select(value, slowClick);
    }

    /**
     * @type {String}
     * @description (get/set) _Selected value_ of the picker.
     *
     * **Format:** `YYYY-MM-DD` (e.g. "2016-05-25")
     */
    get date () {
        return this.rootElement.$('.displayValue').getAttribute('datetime');
    }
    set date (dateString) {
        var date = moment(dateString, 'YYYY-MM-DD');
        this.month = date.format('MMM');
        this.year = date.format('YYYY');
        this._selectVisibleDate(dateString);
    }
}//rxDatePicker

/* ========== Private API Functions ========== */

/**
 * @private
 * @description
 * Sets the calendar's date by clicking the date corresponding to the value of
 * `dateString`.
 *
 * @param {String} dateString
 * `YYYY-MM-DD` formatted string to select on the current month.
 *
 * @example
 * var picker = rxDatePicker.initialize();
 * picker._selectVisibleDate('2014-05-13');
 * expect(picker.date).to.eventually.eq('2014-05-13');
 */
rxDatePicker.prototype._selectVisibleDate = function (dateString) {
    this.open();
    this._dateElementByDate(dateString).$('span').click();
};//_selectVisibleDate()

/**
 * @private
 * @description
 * Will select the last day of the current month seen on the picker calendar.
 * Does not accept arguments. Set the calendar month yourself with
 * {@link rxDatePicker#month} and {@link rxDatePicker#year} first, so that logic
 * picks the correct date.
 */
rxDatePicker.prototype._selectLastDayOfCurrentMonth = function () {
    this.open();
    return protractor.promise.all([this.month, this.year])
        .then((results) => {
            var formattedDate = `${results[0]}-${results[1]}`;
            var lastOfMonth = moment(formattedDate, 'MMM-YYYY').endOf('month');
            this._selectVisibleDate(lastOfMonth.format('YYYY-MM-DD'));
        });
};//_selectLastDayOfCurrentMonth()

/**
 * @private
 * @description
 * Return a day seen on the picker calendar that corresponds to the value of
 * `dateString`.
 *
 * @param {String} dateString
 * `YYYY-MM-DD` formatted string of the date to select.
 *
 * @example
 * var picker = encore.rxDatePicker.initialize();
 * picker.open();
 * picker._dateElementByDate('2012-06-23').getAttribute('class');
 *
 * @returns {ElementFinder}
 */
rxDatePicker.prototype._dateElementByDate = function (dateString) {
    return this.rootElement.$(`[data-date="${dateString}"]`);
};

/* ========== Public API Functions ========== */
/**
 * @see rxDatePicker#close
 * @description Ensures that the date picker is open.
 * @example
 * var picker = encore.rxDatePicker.initialize();
 * picker.open();
 * picker.open(); // does nothing
 */
rxDatePicker.prototype.open = function () {
    this.isOpen().then((open) => {
        if (!open) {
            this.rootElement.$('.control').click();
        }
    });
};//open()

/**
 * @see rxDatePicker#open
 * @description Ensures that the date picker is closed.
 * @example
 * var picker = encore.rxDatePicker.initialize();
 * picker.open();
 * picker.close();
 * picker.close(); // does nothing
 */
rxDatePicker.prototype.close = function () {
    return this.isOpen().then((isOpen) => {
        if (isOpen) {
            this.rootElement.$('.backdrop').click();
        }
    });
};//close()

/**
 * @description Click over to the next month in the calendar.
 */
rxDatePicker.prototype.nextMonth = function () {
    this.open();
    this.rootElement.$('.arrow.next').click();
};//nextMonth()

/**
 * @description Click back to the previous month in the calendar.
 */
rxDatePicker.prototype.previousMonth = function () {
    this.open();
    this.rootElement.$('.arrow.prev').click();
};//previousMonth()

/**
 * @description Whether or not the date requested is currently selected.
 * @param {String} date
 * `YYYY-MM-DD` formatted date to check if it is currently selected.
 * @returns {Promise<Boolean>}
 */
rxDatePicker.prototype.isDateSelected = function (date) {
    this.open();
    return this._dateElementByDate(date).getAttribute('class')
        .then((classes) => _.includes(classes, 'selected'));
};//isDateSelected()

/**
 * @description
 * Whether or not the date passed in matches the "today" date in the calendar.
 * @param {String} date
 * `YYYY-MM-DD` formatted date to check if it is styled as today's date.
 * @returns {Promise<Boolean>}
 */
rxDatePicker.prototype.isDateToday = function (date) {
    this.open();
    return this._dateElementByDate(date).getAttribute('class')
        .then((classes) => _.includes(classes, 'today'));
};//isDateToday()

/**
 * @description Whether or not the entire calendar component is enabled.
 * @returns {Promise<Boolean>}
 */
rxDatePicker.prototype.isEnabled = function () {
    return this.rootElement.getAttribute('disabled')
        .then((disabled) => !disabled);
};//isEnabled()

/**
 * @description Whether or not the entire calendar component is present on the page.
 * @returns {Promise<Boolean>}
 */
rxDatePicker.prototype.isPresent = function () {
    return this.rootElement.isPresent();
};//isPresent()

/**
 * @description Whether or not the calendar is in an invalid state.
 * @returns {Promise<Boolean>}
 */
rxDatePicker.prototype.isValid = function () {
    return this.rootElement.getAttribute('class')
        .then((classes) => !_.includes(classes, 'ng-invalid'));
};//isValid()

/**
 * @description Whether or not the calendar is open.
 * @returns {Promise<Boolean>}
 */
rxDatePicker.prototype.isOpen = function () {
    return this.rootElement.$('.popup').getAttribute('class')
        .then((classes) => !_.includes(classes, 'ng-hide'));
};//isOpen()

/**
 * @param {ElementFinder} rxDatePickerElement
 * ElementFinder to be transformed into an rxDatePicker page object.
 * @returns {rxDatePicker} Page object representing the rxDatePicker element.
 */
rxDatePicker.initialize = function (rxDatePickerElement) {
    return new rxDatePicker(rxDatePickerElement);
};

exports.rxDatePicker = rxDatePicker;
