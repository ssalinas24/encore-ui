describe('utilities:rxFavicon', function () {
    var scope, compile, el, envSvc, log;

    var paths = {
        prod: 'prod.png',
        staging: 'staging.png',
        local: 'local.png'
    };

    var baseTemplate = _.template('<link rel="icon" type="image/png" href="<%= prod %>"' +
        ' rx-favicon="{ staging: \'<%= staging %>\', local: \'<%= local %>\' }" />');

    var allTemplate = baseTemplate(paths);

    var stagingTemplate = baseTemplate({
        prod: paths.prod,
        staging: paths.staging,
        local: ''
    });

    var localTemplate = baseTemplate({
        prod: paths.prod,
        local: paths.local,
        staging: ''
    });

    beforeEach(function () {
        // load modules
        module('encore.ui.utilities');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile, Environment, $log) {
            scope = $rootScope.$new();
            compile = $compile;
            envSvc = Environment;
            log = $log;
        });
    });

    afterEach(function () {
        if (envSvc.get.restore) {
            envSvc.get.restore();
        }
        el = null;
    });

    it('should use prod path in prod environment', function () {
        // set to prod environment
        sinon.stub(envSvc, 'get').returns({
            name: 'unified-prod'
        });

        el = helpers.createDirective(allTemplate, compile, scope);

        expect(el.attr('href')).to.equal(paths.prod);
    });

    it('should use staging path in staging environment', function () {
        // set to staging environment
        sinon.stub(envSvc, 'get').returns({
            name: 'unified-preprod'
        });

        el = helpers.createDirective(allTemplate, compile, scope);

        expect(el.attr('href')).to.equal(paths.staging);
    });

    it('should use local path in local environment', function () {
        // set to local environment
        sinon.stub(envSvc, 'get').returns({
            name: 'local'
        });

        el = helpers.createDirective(allTemplate, compile, scope);

        expect(el.attr('href')).to.equal(paths.local);
    });

    it('should get fallback to prod environment if staging not set', function () {
        // set to staging environment
        sinon.stub(envSvc, 'get').returns({
            name: 'unified-preprod'
        });

        el = helpers.createDirective(localTemplate, compile, scope);

        expect(el.attr('href')).to.equal(paths.prod);
    });

    it('should get fallback to staging environment if local not set', function () {
        // set to local environment
        sinon.stub(envSvc, 'get').returns({
            name: 'local'
        });

        el = helpers.createDirective(stagingTemplate, compile, scope);

        expect(el.attr('href')).to.equal(paths.staging);
    });

    it('should log warning if attribute not an object', function () {
        var badTemplate = '<link rx-favicon="somePath.png">';

        // set to local environment
        sinon.spy(log, 'warn');

        el = helpers.createDirective(badTemplate, compile, scope);

        expect(log.warn).to.be.calledOnce;
    });
});
