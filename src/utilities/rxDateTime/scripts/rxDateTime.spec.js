describe('rxDateTime', function () {
    var rxDateTime;
    var rxMomentFormats;
    var dateString;
    var actual, expected;

    beforeEach(function () {
        module('encore.ui.utilities');

        dateString = '2015-09-17T19:37:17Z';

        inject(function ($filter, _rxMomentFormats_) {
            rxDateTime = $filter('rxDateTime');
            rxMomentFormats = _rxMomentFormats_;
        });
    });

    it('should exist', function () {
        expect(rxDateTime).to.exist;
    });

    describe('using default format', function () {
        beforeEach(function () {
            actual = rxDateTime(dateString);
        });

        it('should result in expected value', function () {
            expected = moment(dateString).format(rxMomentFormats.dateTime.long);
            expect(actual).to.equal(expected);
        });
    });

    describe('using "long" format', function () {
        beforeEach(function () {
            actual = rxDateTime(dateString, 'long');
        });

        it('should result in expected value', function () {
            expected = moment(dateString).format(rxMomentFormats.dateTime.long);
            expect(actual).to.equal(expected);
        });
    });

    describe('using "short" format', function () {
        beforeEach(function () {
            actual = rxDateTime(dateString, 'short');
        });

        it('should result in expected value', function () {
            expected = moment(dateString).format(rxMomentFormats.dateTime.short);
            expect(actual).to.equal(expected);
        });
    });

    describe('using invalid format', function () {
        beforeEach(function () {
            actual = rxDateTime(dateString, 'asdf');
        });

        it('should result in a "long" format value', function () {
            expected = moment(dateString).format(rxMomentFormats.dateTime.long);
            expect(actual).to.equal(expected);
        });
    });
});
