describe('rxModalFooter', function () {
    var scope, compile, addFooter;

    var footerHtml = '<rx-modal-footer state="testState">foo</rx-modal-footer>';

    beforeEach(function () {
        module('encore.ui.elements');

        module(function ($provide) {
            addFooter = sinon.stub();
            $provide.value('rxModalFooterTemplates', { add: addFooter });
        });

        // Inject in angular constructs
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    it('should wrap the content in a modal-footer div', function () {
        helpers.createDirective(footerHtml, compile, scope);
        expect(addFooter.firstCall.args[1]).to.equal(
            '<div ng-switch-when="testState">foo</div>'
        );
    });

    it('should save the template with its state', function () {
        helpers.createDirective(footerHtml, compile, scope);
        expect(addFooter).to.have.been.calledOnce;
        expect(addFooter.firstCall.args[0]).to.equal('testState');
    });

    it('should set the global option to false by default', function () {
        helpers.createDirective(footerHtml, compile, scope);
        expect(addFooter.firstCall.args[2]).to.eql({ global: false });
    });

    it('should set the global option to true if the attribute is present', function () {
        var footerHtml = '<rx-modal-footer state="testState" global>foo</rx-modal-footer>';
        helpers.createDirective(footerHtml , compile, scope);
        expect(addFooter.firstCall.args[2]).to.eql({ global: true });
    });
});
