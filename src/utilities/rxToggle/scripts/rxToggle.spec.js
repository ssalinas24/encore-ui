describe('rxToggle', function () {
    var scope, compile, el;
    var validTemplate = '<button rx-toggle="vacillate">Vacillate!</button>';
    var validTemplateNested = '<button rx-toggle="nested.val">Nested Vacillate!</button>';

    beforeEach(function () {
        // load module
        module('encore.ui.utilities');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    it('should toggle a property on click', function () {
        el = helpers.createDirective(validTemplate, compile, scope);

        helpers.clickElement(el);
        expect(scope.vacillate).to.be.true;

        helpers.clickElement(el);
        expect(scope.vacillate).to.be.false;

        helpers.clickElement(el);
        expect(scope.vacillate).to.be.true;
    });

    it('should toggle a nested property on click', function () {
        el = helpers.createDirective(validTemplateNested, compile, scope);

        helpers.clickElement(el);
        expect(scope.nested.val).to.be.true;

        helpers.clickElement(el);
        expect(scope.nested.val).to.be.false;

        helpers.clickElement(el);
        expect(scope.nested.val).to.be.true;
    });
});
