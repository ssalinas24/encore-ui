describe('rxBytesConvert', function () {
    var bytesize;
    var bytes;
    var unit;
    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($filter) {
            bytesize = $filter('rxBytesConvert');
        });
    });

    it('should exist', function () {
        expect(bytesize).to.exist;
    });

    it('should convert 1000 to 1 KB', function () {
        bytes = 1000;
        expect(bytesize(bytes)).to.equal('1 KB');
    });

    it('should convert 1000000 to 1 MB', function () {
        bytes = 1000000;
        expect(bytesize(bytes)).to.equal('1 MB');
    });

    it('should convert 1250000 to 1.25 MB', function () {
        bytes = 1250000;
        expect(bytesize(bytes)).to.equal('1.25 MB');
    });

    it('should convert 1250000 to 1250 KB', function () {
        bytes = 1250000;
        unit = 'Kb';
        expect(bytesize(bytes, unit)).to.equal('1250 KB');
    });

    it('should convert 1250000 to 0.00 GB', function () {
        bytes = 1250000;
        unit = 'gB';
        expect(bytesize(bytes, unit)).to.equal('0.00 GB');
    });

    it('should convert 0 to 0 B', function () {
        bytes = 0;
        expect(bytesize(bytes)).to.equal('0 B');
    });

    it('should convert 0 with a MB unit to 0 MB', function () {
        bytes = 0;
        unit = 'MB';
        expect(bytesize(bytes, unit)).to.equal('0 MB');
    });

    it('should convert 0 with a TB unit to 0 TB', function () {
        bytes = 0;
        unit = 'TB';
        expect(bytesize(bytes, unit)).to.equal('0 TB');
    });

    it('should convert 0 with a PB unit to 0 PB', function () {
        bytes = 0;
        unit = 'PB';
        expect(bytesize(bytes, unit)).to.equal('0 PB');
    });

    it('should convert undefined to 0 B', function () {
        expect(bytesize()).to.equal('0 B');
    });

    it('should convert null to 0 B', function () {
        bytes = null;
        expect(bytesize(bytes)).to.equal('0 B');
    });

    it('should convert null with a MB unit to 0 MB', function () {
        bytes = null;
        unit = 'MB';
        expect(bytesize(bytes, unit)).to.equal('0 MB');
    });

    it('should ignore the unit if the unit is not valid', function () {
        bytes = 150000;
        unit = 'XB';
        expect(bytesize(bytes, unit)).to.equal('150 KB');
    });

    it('should convert data to PB if data is too large when unit is not given', function () {
        bytes = 12500000000000000000;
        expect(bytesize(bytes)).to.equal('12500 PB');
    });

    it('should convert data to PB if data is too large when unit is not valid', function () {
        bytes = 256000000000000000000000;
        unit = 'sB';
        expect(bytesize(bytes, unit)).to.equal('256000000 PB');
    });
});
