describe('rxMonth', function () {
    var rxMonth;
    var rxMomentFormats;
    var dateString;
    var actual, expected;

    beforeEach(function () {
        module('encore.ui.utilities');

        dateString = '2015-09-17T19:37:17Z';

        inject(function ($filter, _rxMomentFormats_) {
            rxMonth = $filter('rxMonth');
            rxMomentFormats = _rxMomentFormats_;
        });
    });

    it('should exist', function () {
        expect(rxMonth).to.exist;
    });

    describe('using default format', function () {
        beforeEach(function () {
            actual = rxMonth(dateString);
        });

        it('should result in expected value', function () {
            expected = moment(dateString).format(rxMomentFormats.month.long);
            expect(actual).to.equal(expected);
        });
    });

    describe('using "long" format', function () {
        beforeEach(function () {
            actual = rxMonth(dateString, 'long');
        });

        it('should result in expected value', function () {
            expected = moment(dateString).format(rxMomentFormats.month.long);
            expect(actual).to.equal(expected);
        });
    });

    describe('using "short" format', function () {
        beforeEach(function () {
            actual = rxMonth(dateString, 'short');
        });

        it('should result in expected value', function () {
            expected = moment(dateString).format(rxMomentFormats.month.short);
            expect(actual).to.equal(expected);
        });
    });

    describe('using "micro" format', function () {
        beforeEach(function () {
            actual = rxMonth(dateString, 'micro');
        });

        it('should result in expected value', function () {
            expected = moment(dateString).format(rxMomentFormats.month.micro);
            expect(actual).to.equal(expected);
        });
    });

    describe('using invalid format', function () {
        beforeEach(function () {
            actual = rxMonth(dateString, 'asdf');
        });

        it('should result in a "long" format value', function () {
            expected = moment(dateString).format(rxMomentFormats.month.long);
            expect(actual).to.equal(expected);
        });
    });
});
