describe('rxEnvironmentUrl', function () {
    var urlFilter, envSvc;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($filter, Environment) {
            urlFilter = $filter('rxEnvironmentUrl');
            envSvc = Environment;
        });
    });

    it('should allow you to build paths based on environment', function () {
        // create url information to build on
        var url = { tld: 'cloudatlas', path: 'cbs/servers' };

        // set environment to build from
        sinon.stub(envSvc, 'get').returns({
            url: '//staging.{{tld}}.encore.rackspace.com/{{path}}'
        });

        expect(urlFilter(url)).to.equal('//staging.cloudatlas.encore.rackspace.com/cbs/servers');
    });
});
