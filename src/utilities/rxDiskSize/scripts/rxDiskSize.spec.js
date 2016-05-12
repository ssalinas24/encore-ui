describe('rxDiskSize', function () {
    var disksize;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($filter) {
            disksize = $filter('rxDiskSize');
        });
    });

    it('should exist', function () {
        expect(disksize).to.exist;
    });

    it('should convert 100 to 100 GB', function () {
        var size = 100;
        expect(disksize(size)).to.equal('100 GB');
    });

    it('should convert 1000 to 1 TB', function () {
        var size = 1000;
        expect(disksize(size)).to.equal('1 TB');
    });

    it('should convert 1000000 to 1 PB', function () {
        var size = 1000000;
        expect(disksize(size)).to.equal('1 PB');
    });

    it('should convert 500 with a GB unit specified to 500 GB', function () {
        var size = 500;
        var unit = 'GB';
        expect(disksize(size, unit)).to.equal('500 GB');
    });

    it('should convert 5000 with a TB unit specified to 5 TB', function () {
        var size = 5000;
        var unit = 'TB';
        expect(disksize(size, unit)).to.equal('5 TB');
    });

    it('should convert 5000000 with a PB unit specified to 5 PB', function () {
        var size = 5000000;
        var unit = 'PB';
        expect(disksize(size, unit)).to.equal('5 PB');
    });

    it('should convert 0 to 0 GB', function () {
        var size = 0;
        expect(disksize(size)).to.equal('0 GB');
    });

    it('should convert 0 with a GB unit to 0 GB', function () {
        var size = 0;
        var unit = 'GB';
        expect(disksize(size, unit)).to.equal('0 GB');
    });

    it('should convert 0 with a TB unit to 0 TB', function () {
        var size = 0;
        var unit = 'TB';
        expect(disksize(size, unit)).to.equal('0 TB');
    });

    it('should convert 0 with a PB unit to 0 PB', function () {
        var size = 0;
        var unit = 'PB';
        expect(disksize(size, unit)).to.equal('0 PB');
    });

    it('should convert undefined to 0 GB', function () {
        expect(disksize()).to.equal('0 GB');
    });

    it('should convert null to 0 GB', function () {
        expect(disksize()).to.equal('0 GB');
    });
});
