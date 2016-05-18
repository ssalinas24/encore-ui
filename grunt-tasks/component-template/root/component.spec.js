describe('{%= name %}', function () {
    var scope, compile, rootScope, el;
    var validTemplate = '<{%= dashedName %}></{%= dashedName %}>';

    beforeEach(function () {
        // load module
        module('encore.ui.{%= name %}');

        // load templates
        module('templates/{%= name %}.html');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
        });

        el = helpers.createDirective(validTemplate, compile, scope);
    });

    it('shall not pass', function () {
        // Fail initial test to keep people honest
        expect(true).to.be.false;
    });
});
