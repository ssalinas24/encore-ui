describe('utilities:rxTimePickerUtil', function () {
    var util, result;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (rxTimePickerUtil) {
            util = rxTimePickerUtil;
        });
    });

    // Don't forget to update rxTimePickerUtil midway
    describe('parseUtcOffset()', function () {
        [
            ['8:00 (-06:00)', '-06:00'],
            ['13:00 (UTC-0800)', '-0800'],
            ['20:00-04:00','-04:00'],
            ['non-time string', ''],
            ['20:00-0400', '-0400'],
            ['20:00-400', ''],
            ['20:00-4', ''],
        ].forEach(function (strPair) {
            var strInput = strPair[0];
            var strOutput = strPair[1];

            it('should return "' + strOutput + '" as parsed from "' + strInput + '"', function () {
                result = util.parseUtcOffset(strInput);
                expect(result).to.eq(strOutput);
            });
        });
    });//parseUtcOffset()

    describe('modelToObject()', function () {
        describe('given value of "04:45-08:00"', function () {
            beforeEach(function () {
                result = util.modelToObject('04:45-08:00');
            });

            it('should have hour property of "04"', function () {
                expect(result.hour).to.eq('4');
            });

            it('should have minutes property of "45"', function () {
                expect(result.minutes).to.eq('45');
            });

            it('should have period property of "AM"', function () {
                expect(result.period).to.eq('AM');
            });

            it('should have offset property of "-08:00"', function () {
                expect(result.offset).to.eq('-08:00');
            });
        });//value 04:45-08:00

        describe('given value of "22:05+0400"', function () {
            beforeEach(function () {
                result = util.modelToObject('22:05+0400');
            });

            it('should have hour property of "10"', function () {
                expect(result.hour).to.eq('10');
            });

            it('should have minutes property of "05"', function () {
                expect(result.minutes).to.eq('05');
            });

            it('should have period property of "PM"', function () {
                expect(result.period).to.eq('PM');
            });

            it('should have offset property of "+0400"', function () {
                expect(result.offset).to.eq('+0400');
            });
        });//value 22:05+0400
    });//modelToObject()
});//utilities:rxTimePickerUtil
