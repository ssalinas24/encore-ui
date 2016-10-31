describe('rxProgressbarUtil', function () {
    var rxProgressbarUtil, subject;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (_rxProgressbarUtil_) {
            rxProgressbarUtil = _rxProgressbarUtil_;
        });
    });

    describe('calculatePercent()', function () {
        beforeEach(function () {
            subject = rxProgressbarUtil.calculatePercent;
        });

        it('should be a function', function () {
            expect(typeof subject).to.equal('function');
        });

        describe('without max argument', function () {
            [
                { val: -10, expected: 0 },
                { val: 0, expected: 0 },
                { val: 22, expected: 22 },
                { val: 100, expected: 100 },
                { val: 500, expected: 100 },
            ].forEach(function (meta) {
                describe('with value of ' + meta.val, function () {
                    it('should be ' + meta.expected, function () {
                        expect(subject(meta.val)).to.equal(meta.expected);
                    });
                });
            });
        });

        [
            { val: -10, max: 50, expected: 0 },
            { val: 0, max: 50, expected: 0 },
            { val: 22, max: 50, expected: 44 },
            { val: 50, max: 50, expected: 100 },
            { val: 500, max: 50, expected: 100 },
            { val: 0, max: 0, expected: 100 },
            { val: 100, max: 0, expected: 100 },
            { val: -10, max: 0, expected: 100 },
        ].forEach(function (meta) {
            describe('with a max of ' + meta.max, function () {
                describe('and a value of ' + meta.val, function () {
                    it('should be ' + meta.expected, function () {
                        expect(subject(meta.val, meta.max)).to.equal(meta.expected);
                    });
                });
            });
        });
    });//calculatePercent()
});
