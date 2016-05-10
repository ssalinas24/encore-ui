describe('rxAge', function () {
    var age, clock;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($filter) {
            age = $filter('rxAge');

            // override Date
            clock = sinon.useFakeTimers(new Date(2000, 0, 1, 0, 0, 0).getTime());
        });
    });

    afterEach(function () {
        clock.restore();
    });

    it('should return unavailable if no date given', function () {
        expect(age()).to.equal('Unavailable');
    });

    it('should return -- if `z` given', function () {
        expect(age('z')).to.equal('--');
    });

    it('should convert date into elapsed time for minutes', function () {
        var date = new Date(1999, 11, 31, 23, 30, 0);

        expect(age(date)).to.equal('30m');
    });

    it('should convert date into elapsed time for hours', function () {
        var date = new Date(1999, 11, 31, 20, 30, 0);

        expect(age(date)).to.equal('3h 30m');
    });

    it('should convert date into elapsed time for days', function () {
        var date = new Date(1999, 11, 29, 20, 0, 0);

        expect(age(date)).to.equal('2d 4h');
    });

    it('should convert date into elapsed time for days w/o months', function () {
        var date = new Date(1999, 11, 4, 0, 0, 0);

        expect(age(date)).to.equal('28d 0h');
    });

    it('should convert date into elapsed time with years', function () {
        var date = new Date(1998, 11, 29, 20, 30, 30);

        // test default units
        expect(age(date)).to.equal('367d 3h');

        // test with minutes included
        expect(age(date, 3)).to.equal('367d 3h 29m');
    });

    it('should take max length', function () {
        var date = new Date(1999, 11, 29, 20, 30, 0);

        // test that default is 2 units
        expect(age(date)).to.equal('2d 3h');

        // test that override to 1 unit works
        expect(age(date, 1)).to.equal('2d');

        // test that override to 3 units works
        expect(age(date, 3)).to.equal('2d 3h 30m');
    });

    it('should take verbosity', function () {
        var date = new Date(1999, 11, 29, 20, 30, 0);

        expect(age(date, true)).to.equal('2 days, 3 hours');
    });

    it('should take both maxUnits and verbosity', function () {
        var date = new Date(1999, 11, 29, 20, 30, 0);

        expect(age(date, 1, true)).to.equal('2 days');
        expect(age(date, 3, true)).to.equal('2 days, 3 hours, 30 minutes');
    });
});
