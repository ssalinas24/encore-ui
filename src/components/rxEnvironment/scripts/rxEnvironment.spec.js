/* jshint node: true */
describe('rxEnvironment', function () {
    var envSvc, location, log;

    beforeEach(function () {
        // load module
        module('encore.ui.rxEnvironment');

        // Inject in angular constructs
        inject(function ($location, $rootScope, Environment, $log) {
            location = $location;
            envSvc = Environment;
            log = $log;
        });

        sinon.stub(location, 'absUrl');
    });

    afterEach(function () {
        location.absUrl.restore();
    });

    it('should warn and return first environment if no environment found', function () {
        location.absUrl.returns('http://nonsense');

        sinon.spy(log, 'warn');

        expect(envSvc.get().name).to.equal('local');
        expect(log.warn).to.be.calledOnce;
    });

    it('should get current environment based on location passed in', function () {
        // test local
        expect(envSvc.get('http://localhost:9001').name).to.equal('local');

        // test staging
        expect(envSvc.get('http://staging.encore.rackspace.com').name).to.equal('unified-preprod');

        // test prod
        expect(envSvc.get('http://encore.rackspace.com').name).to.equal('unified');

        // test unified-preprod
        expect(envSvc.get('http://randenv.encore.rackspace.com').name).to.equal('unified-preprod');

        // test unified
        expect(envSvc.get('http://encore.rackspace.com').name).to.equal('unified');
    });

    it('should get current environment based on location.absUrl', function () {
        // test local
        location.absUrl.returns('http://localhost:9001');
        expect(envSvc.get().name).to.equal('local');
        expect(envSvc.isLocal(), 'isLocal localhost:9001').to.be.true;
        expect(envSvc.isPreProd(), 'test for preprod when environment is local').to.be.false;

        // test preprod
        location.absUrl.returns('http://preprod.encore.rackspace.com');
        expect(envSvc.get().name).to.equal('preprod');
        expect(envSvc.isPreProd(), 'isPreProd for preprod.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedPreProd(), 'test for unified-preprod when environment is preprod').to.be.true;

        // test staging
        location.absUrl.returns('http://staging.encore.rackspace.com');
        expect(envSvc.get().name).to.equal('unified-preprod');
        expect(envSvc.isUnifiedPreProd(), 'isUnifiedPreProd for staging.encore.rackspace.com').to.be.true;
        expect(envSvc.isUnified(), 'test for unified when environment is unified-preprod').to.be.true;

        // test unified
        location.absUrl.returns('http://encore.rackspace.com');
        expect(envSvc.get().name).to.equal('unified');
        expect(envSvc.isUnified(), 'isUnified for encore.rackspace.com').to.be.true;
        expect(envSvc.isUnifiedProd(), 'isUnifiedProd for encore.rackspace.com').to.be.true;
        expect(envSvc.isLocal(), 'test for local when environment is unified').to.be.false;
    });

    it('should allow defining a new environment', function () {
        // test w/ simple string
        envSvc.add({
            name: 'custom',
            pattern: '//custom',
            url: 'custom'
        });
        location.absUrl.returns('http://custom');
        expect(envSvc.get().name).to.equal('custom');

        // test w/ regexp (matches http://craziness.*.com/)
        envSvc.add({
            name: 'crazy',
            pattern: /\/\/craziness\..*\.com\//,
            url: 'crazy'
        });
        location.absUrl.returns('http://craziness.anything.yeah.com/some/path');
        expect(envSvc.get().name).to.equal('crazy');
    });

    it('should throw error on bad environment', function () {
        sinon.spy(log, 'error');
        // left off some values
        envSvc.add({
            name: 'custom'
        });

        expect(log.error).to.be.calledOnce;
    });

    it('should allow you to completely overwrite defined environments', function () {
        envSvc.setAll([{
            name: 'custom',
            pattern: /./,
            url: 'mycustomurl'
        }]);

        expect(envSvc.get().name).to.equal('custom');
    });
});
