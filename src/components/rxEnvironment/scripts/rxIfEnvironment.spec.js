describe('rxIfEnvironment', function () {
    var scope, compile, envSvc, _location, setUrl,
        stagingMsg = 'Show if staging',
        prodMsg = 'Show if not prod',
        stagingTemplate = '<div rx-if-environment="unified-preprod">' + stagingMsg + '</div>',
        notProdTemplate = '<div rx-if-environment="!unified-preprod">' + prodMsg + '</div>';

    beforeEach(function () {
        // load module
        module('encore.ui.rxEnvironment');

        inject(function ($rootScope, $compile, $location, Environment) {
            scope = $rootScope.$new();
            compile = $compile;
            envSvc = Environment;
            _location = $location;

            setUrl = function (url) {
                sinon.stub(_location, 'absUrl').returns(url);
            };
        });

        // override get functionality so we can customize environment
        sinon.stub(envSvc, 'get');
    });

    it('should show if environment matches', function () {
        setUrl('https://staging.encore.rackspace.com');
        var el = helpers.createDirective(stagingTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.false;
    });

    it('should hide if environment does not match', function () {
        setUrl('https://localhost:9000');
        var el = helpers.createDirective(stagingTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.true;
    });

    it('should hide if negated environment matches', function () {
        setUrl('https://staging.encore.rackspace.com');
        var el = helpers.createDirective(notProdTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.true;
    });

    it('should show if negated environment does not match', function () {
        setUrl('https://localhost:9000');
        var el = helpers.createDirective(notProdTemplate, compile, scope);
        expect(el.hasClass('ng-hide')).to.be.false;
    });
});
