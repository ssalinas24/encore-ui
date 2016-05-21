var environment = encore.rxEnvironment;

describe('rxEnvironment', function () {

    before(function () {
        demoPage.go('#/components/rxEnvironment');
    });

    it('should be on localhost', function () {
        expect(environment.isLocalhost()).to.eventually.be.true;
    });

    it('should get the original environment', function () {
        expect(environment.original()).to.eventually.equal('localhost');
    });

    it('should match the current environment', function () {
        expect(environment.current()).to.eventually.equal('localhost');
    });

    it('should not change the original environment', function () {
        browser.get('http://rackerlabs.github.io/encore-ui/#/overview');
        expect(environment.original()).to.eventually.equal('localhost');
    });

    it('should change the current environment', function () {
        expect(environment.current()).to.eventually.equal('staging');
    });

    it('should be on staging', function () {
        expect(environment.isStaging()).to.eventually.be.true;
    });

    it('should still say the original location is localhost', function () {
        expect(environment.isStaging({ useBaseUrl: true })).to.eventually.be.false;
    });

});
