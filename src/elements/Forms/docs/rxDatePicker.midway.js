var moment = require('moment');

describe('rxDatePicker', function () {
    var picker;

    before(function () {
        demoPage.go('#/elements/Forms');
    });

    describe('simple example', function () {
        var isoFormat = 'YYYY-MM-DD';
        var formatMonth = 'MMM';
        var formatYear = 'YYYY';
        var today = moment(new Date()).format(isoFormat);
        var month = moment(today).clone().format(formatMonth);
        var year = moment(today).clone().format(formatYear);
        var lastMonth = moment(today).clone().subtract(1, 'month').startOf('month');
        var lastMonthName = moment(lastMonth).clone().format(formatMonth);
        var nextMonth = moment(today).clone().add(1, 'month');
        var nextMonthName = moment(nextMonth).clone().format(formatMonth);
        var yearMonthDayString = function (date) {
            if (date === undefined) {
                date = today;
            }

            return moment(date).format(isoFormat);
        };

        before(function () {
            picker = encore.rxDatePicker.initialize($('#dpSimple'));
        });

        it('should not be disabled', function () {
            expect(picker.isDisabled()).to.eventually.eq(false);
        });

        it('should be valid', function () {
            expect(picker.isValid()).to.eventually.eq(true);
        });

        it('should not display calendar', function () {
            expect(picker.isOpen()).to.eventually.eq(false);
        });

        it('should open the calendar', function () {
            picker.open();
            expect(picker.isOpen()).to.eventually.eq(true);
        });

        it('should display the current month and year by default', function () {
            expect(picker.month).to.eventually.equal(month);
            expect(picker.year).to.eventually.equal(year);
        });

        it('should have some days that are in the current month', function () {
            expect(picker.tblCurrentMonthDays.count()).to.eventually.be.above(0);
        });

        it('should have some days that are out of the current month', function () {
            expect(picker.rootElement.$$('.day.outOfMonth').count()).to.eventually.be.above(0);
        });

        it('should navigate back one month', function () {
            picker.previousMonth();
            expect(picker.month).to.eventually.equal(lastMonthName);
        });

        it('should navigate forward two months', function () {
            picker.nextMonth();
            picker.nextMonth();
            expect(picker.month).to.eventually.equal(nextMonthName);
        });

        it('should close the calendar', function () {
            picker.close();
            expect(picker.isOpen()).to.eventually.eq(false);
        });

        it('should reopen the calendar and have the month unchanged', function () {
            picker.open();
            expect(picker.month).to.eventually.equal(nextMonthName);
            expect(picker.year).to.eventually.equal(nextMonth.year().toString());
            picker.previousMonth();
        });

        it('should display today as the current date', function () {
            picker.date.then(function (date) {
                expect(yearMonthDayString(date)).to.equal(yearMonthDayString());
            });
        });

        it('should not select a date that is out of month', function () {
            picker.open();
            picker.date.then(function (currentDate) {
                picker.rootElement.$$('.day.outOfMonth span').each(function (invalidDay) {
                    invalidDay.click();
                    picker.date.then(function (date) {
                        expect(date.valueOf()).to.equal(currentDate.valueOf());
                    });
                });
            });
        });

        it('should highlight today\'s date with a special class', function () {
            expect(picker.isDateToday(today)).to.eventually.be.true;
        });

        it('should highlight the currently selected date with a special class', function () {
            expect(picker.isDateSelected(today)).to.eventually.be.true;
        });

        it('should update the date to one month from now', function () {
            picker.date = moment(today).add(1, 'months').toDate();
            picker.date.then(function (date) {
                expect(yearMonthDayString(date)).to.equal(yearMonthDayString(nextMonth));
            });
        });

        it('should update the date back to today', function () {
            picker.date = moment(today).toDate();
            picker.date.then(function (date) {
                expect(yearMonthDayString(date)).to.equal(yearMonthDayString());
            });
        });

        it('should update the date to the first of the month', function () {
            var firstOfMonth = moment(today).startOf('month').toDate();
            picker.date = firstOfMonth;
            picker.date.then(function (date) {
                expect(yearMonthDayString(date)).to.equal(yearMonthDayString(firstOfMonth));
            });
        });

        it('should update the date to the last of the month', function () {
            picker.selectLastDayOfCurrentMonth();
            picker.date.then(function (date) {
                // we'll parse out the YYYY-MM-DD string with moment to avoid UTC offsets
                var lastOfMonth = moment(today).endOf('month').format(isoFormat);
                expect(yearMonthDayString(date)).to.equal(lastOfMonth);
            });
        });

        it('should update the date to one month ago', function () {
            var previousMonth = moment(today).subtract(1, 'months').toDate();
            picker.date = previousMonth;
            picker.date.then(function (date) {
                expect(yearMonthDayString(date)).to.equal(yearMonthDayString(previousMonth));
            });
        });

    });

    describe('enabled, valid', function () {
        before(function () {
            picker = encore.rxDatePicker.initialize($('#dpEnabledValid'));
        });

        it('should not be disabled', function () {
            expect(picker.isDisabled()).to.eventually.eq(false);
        });

        it('should be valid', function () {
            expect(picker.isValid()).to.eventually.eq(true);
        });
    });//enabled, valid

    describe('enabled, invalid', function () {
        before(function () {
            picker = encore.rxDatePicker.initialize($('#dpEnabledInvalid'));
        });

        it('should not be disabled', function () {
            expect(picker.isDisabled()).to.eventually.eq(false);
        });

        it('should not be valid', function () {
            expect(picker.isValid()).to.eventually.eq(false);
        });
    });//enabled, invalid

    describe('disabled, valid', function () {
        before(function () {
            picker = encore.rxDatePicker.initialize($('#dpDisabledValid'));
        });

        it('should be disabled', function () {
            expect(picker.isDisabled()).to.eventually.eq(true);
        });

        it('should be valid', function () {
            expect(picker.isValid()).to.eventually.eq(true);
        });
    });//disabled, valid

    describe('disabled, invalid', function () {
        before(function () {
            picker = encore.rxDatePicker.initialize($('#dpDisabledInvalid'));
        });

        it('should be disabled', function () {
            expect(picker.isDisabled()).to.eventually.eq(true);
        });

        it('should not be valid', function () {
            expect(picker.isValid()).to.eventually.eq(false);
        });
    });//disabled, invalid
});
