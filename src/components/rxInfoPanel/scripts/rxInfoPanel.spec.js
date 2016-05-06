// https://jira.rax.io/browse/FRMW-729
describe('rxInfoPanel', function () {
    var scope, compile, el;
    var infoPanelTemplate = '<rx-info-panel title="My Title">' +
                            'Some stuff inside the directive' +
                            '</rx-info-panel>';

    beforeEach(function () {
        // load module
        module('encore.ui.rxInfoPanel');

        // load templates
        module('templates/rxInfoPanel.html');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        el = helpers.createDirective(infoPanelTemplate, compile, scope);
    });

    it('should have created the element', function () {
        expect(el).to.be.ok;
    });

});
