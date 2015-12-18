var moment = require('moment');

describe('rxDatePicker', function () {
    var picker;

    before(function () {
        demoPage.go('#/molecules/rxDatePicker');
    });

    describe('simple example', function () {
        var today = new Date();
        var lastMonth = new Date(moment(today).subtract(1, 'month'));
        var nextMonth = new Date(moment(today).add(1, 'month'));
        var yearMonthDayString = function (date) {
            if (date === undefined) {
                date = today;
            }

            return date.toISOString().split('T')[0];
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
            picker.monthAndYear.then(function (date) {
                expect(date.getYear()).to.equal(today.getYear());
                expect(date.getMonth()).to.equal(today.getMonth());
            });
        });

        it('should have some days that are in the current month', function () {
            expect(picker.tblCurrentMonthDays.count()).to.eventually.be.above(0);
        });

        it('should have some days that are out of the current month', function () {
            expect(picker.rootElement.$$('.day.outOfMonth').count()).to.eventually.be.above(0);
        });

        it('should navigate back one month', function () {
            picker.previousMonth();
            picker.monthAndYear.then(function (date) {
                expect(date.getYear()).to.equal(lastMonth.getYear());
                expect(date.getMonth()).to.equal(lastMonth.getMonth());
            });
        });

        it('should navigate forward two months', function () {
            picker.nextMonth();
            picker.nextMonth();
            picker.monthAndYear.then(function (date) {
                expect(date.getYear()).to.equal(nextMonth.getYear());
                expect(date.getMonth()).to.equal(nextMonth.getMonth());
            });
        });

        it('should close the calendar', function () {
            picker.close();
            expect(picker.isOpen()).to.eventually.eq(false);
        });

        it('should reopen the calendar and have the month unchanged', function () {
            picker.open();
            picker.monthAndYear.then(function (date) {
                expect(date.getYear()).to.equal(nextMonth.getYear());
                expect(date.getMonth()).to.equal(nextMonth.getMonth());
                picker.previousMonth();
            });
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
            picker.date = new Date(nextMonth);
            picker.date.then(function (date) {
                expect(yearMonthDayString(date)).to.equal(yearMonthDayString(nextMonth));
            });
        });

        it('should update the date back to today', function () {
            picker.date = today;
            picker.date.then(function (date) {
                expect(yearMonthDayString(date)).to.equal(yearMonthDayString());
            });
        });

        it('should update the date to the first of the month', function () {
            var firstOfMonth = moment(today).startOf('month');
            picker.date = new Date(firstOfMonth);
            picker.date.then(function (date) {
                expect(yearMonthDayString(date)).to.equal(yearMonthDayString(firstOfMonth));
            });
        });

        it('should update the date to the last of the month', function () {
            picker.selectLastDayOfCurrentMonth();
            picker.date.then(function (date) {
                // we'll parse out the YYYY-MM-DD string with moment to avoid UTC offsets
                var lastOfMonth = moment(today).endOf('month').format().split('T')[0];
                expect(yearMonthDayString(date)).to.equal(lastOfMonth);
            });
        });

        it('should update the date to one month ago', function () {
            picker.date = new Date(lastMonth);
            picker.date.then(function (date) {
                expect(yearMonthDayString(date)).to.equal(yearMonthDayString(lastMonth));
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
