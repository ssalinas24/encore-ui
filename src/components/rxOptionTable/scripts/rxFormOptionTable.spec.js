describe('rxOptionTable', function () {
    var scope, compile;

    beforeEach(function () {
        module('encore.ui.rxOptionTable');
        module('templates/rxOptionTable.html');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('directive:rxFormOptionTable (deprecated)', function () {
        var sandbox;
        var template = '<rx-form-option-table></rx-form-option-table>';

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
            sandbox.stub(window.console, 'warn');

            helpers.createDirective(template, compile, scope);
        });

        afterEach(function () {
            // restore the environment as it was before
            sandbox.restore();
        });

        it('should emit a deprecation warning in the console', function () {
            expect(console.warn).to.be.calledOnce;
            expect(console.warn).to.be.calledWithMatch('DEPRECATION WARNING');
        });
    });
});
