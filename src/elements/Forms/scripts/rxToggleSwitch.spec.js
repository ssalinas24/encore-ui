describe('directive:rxToggleSwitch', function () {
    var scope, timeout, compile, directiveScope, el, disabledEL, customEL, postHookEL, failedAsyncEL,
        validTemplate = '<rx-toggle-switch ng-model="model"></rx-toggle-switch>',
        disabledTemplate = '<rx-toggle-switch ng-model="model" disabled="true"></rx-toggle-switch>',
        postHookTemplate = '<rx-toggle-switch ng-model="model" post-hook="countMe(newVal, oldVal)"></rx-toggle-switch>',
        customTemplate =
            '<rx-toggle-switch ng-model="customModel" true-value="TEST" false-value="TEST-FALSY"></rx-toggle-switch>',
        failedAsyncTemplate =
            '<rx-toggle-switch ng-model="model" post-hook="failedAsync(initVal, finalVal)"></rx-toggle-switch>';

    beforeEach(function () {
        module('encore.ui.elements');
        module('templates/rxToggleSwitch.html');

        inject(function ($rootScope, $compile, $timeout) {
            timeout = $timeout;
            compile = $compile;
            scope = $rootScope.$new();
            scope.countMe = sinon.stub();
            scope.failedAsync = sinon.stub();

            scope.countMe.withArgs('TEST-FALSY', 'TEST').returns('custom');
            scope.model = true;

            scope.failedAsync.withArgs('TEST', 'TEST').returns('custom');
            scope.failedModel = false;
        });

        el = helpers.createDirective(validTemplate, compile, scope);
        el = helpers.getChildDiv(el, 'rx-toggle-switch', 'class');

        disabledEL = helpers.createDirective(disabledTemplate, compile, scope);
        disabledEL = helpers.getChildDiv(disabledEL, 'rx-toggle-switch', 'class');

        customEL = helpers.createDirective(customTemplate, compile, scope);
        customEL = helpers.getChildDiv(customEL, 'rx-toggle-switch', 'class');

        postHookEL = helpers.createDirective(postHookTemplate, compile, scope);
        postHookEL = helpers.getChildDiv(postHookEL, 'rx-toggle-switch', 'class');

        failedAsyncEL = helpers.createDirective(failedAsyncTemplate, compile, scope);
        failedAsyncEL = helpers.getChildDiv(failedAsyncEL, 'rx-toggle-switch', 'class');
    });

    afterEach(function () {
        el = null;
        disabledEL = null;
        directiveScope = null;
        customEL = null;
        postHookEL = null;
        failedAsyncEL = null;
    });

    it('should initialize the model value to the false value if undefined', function () {
        expect(scope.customModel).to.equal('TEST-FALSY');
    });

    it('should initialize the model value to the false value if it is not the true or false value', function () {
        scope.customModel = 'foo';
        helpers.createDirective(customTemplate, compile, scope);
        expect(scope.customModel).to.equal('TEST-FALSY');
    });

    it('should render template correctly', function () {
        expect(el).to.not.be.empty;
        expect(el.hasClass('rx-toggle-switch')).to.be.true;
        expect(el.hasClass('on')).to.be.true;
        expect(helpers.getChildDiv(el, 'knob', 'class')).not.be.empty;
    });

    it('should switch the model value when update is called', function () {
        directiveScope = el.scope();

        expect(el.hasClass('on')).to.be.true;

        expect(scope.model).to.be.true;
        directiveScope.update();
        scope.$apply();
        expect(scope.model).to.be.false;

        expect(el.hasClass('on')).to.be.false;
        sinon.assert.notCalled(scope.countMe);

        expect(scope.model).to.be.false;
        directiveScope.update();
        scope.$apply();
        expect(scope.model).to.be.true;

        expect(el.hasClass('on')).to.be.true;
    });

    it('should render disabled template correctly', function () {
        expect(disabledEL.attr('disabled')).to.not.be.empty;
    });

    it('should NOT switch the model value when switch is called (disabled)', function () {
        directiveScope = disabledEL.scope();

        expect(scope.model).to.be.true;
        directiveScope.update();
        scope.$apply();
        expect(scope.model).to.be.true;

        expect(disabledEL.hasClass('on')).to.be.true;
    });

    it('should render custom values template correctly', function () {
        directiveScope = customEL.scope();

        expect(scope.customModel).to.be.eq('TEST-FALSY');
        directiveScope.update();
        scope.$apply();
        expect(scope.customModel).to.be.eq('TEST');
    });

    it('should call posthook when updating value', function () {
        directiveScope = postHookEL.scope();

        expect(scope.model).to.be.true;
        directiveScope.update();
        timeout.flush(1);
        scope.$apply();
        expect(scope.model).to.be.false;
        sinon.assert.calledOnce(scope.countMe);
    });

    it('should attempt then fail to activate asychronous operation', function () {
        directiveScope = failedAsyncEL.scope();

        expect(scope.failedModel).to.be.false;
        directiveScope.update();
        timeout.flush(1);
        scope.$apply();
        expect(scope.failedModel).to.be.false;
        sinon.assert.calledOnce(scope.failedAsync);
    });
});
