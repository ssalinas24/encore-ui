/* jshint node: true */
describe('rxModalForm', function () {
    var el, scope, compile, rootScope, timeout;

    var rxModalForm = '<rx-modal-form>${ fields }</rx-modal-form>';
    var hiddenInput = '<input type="hidden">';
    var disabledInput = '<input disabled="disabled">';
    var textInput = '<input type="text">';
    var autofocusInput = '<input type="text" autofocus>';
    var textarea = '<textarea></textarea>';
    var selectBox = '<select><option>foo</option></select>';

    beforeEach(function () {
        // The footers template must be loaded first because it is used in .run
        module('templates/rxModalFooters.html');

        module('encore.ui.quarks');
        module('encore.ui.rxModalAction');
        module('templates/rxModalActionForm.html');

        // Inject in angular constructs
        inject(function ($rootScope, $compile, $timeout) {
            rootScope = $rootScope;
            scope = $rootScope.$new();
            compile = $compile;
            timeout = $timeout;
        });
    });

    it('should inject the modal footers into the template', function () {
        var formHtml = _.template(rxModalForm, {
            fields: textInput + textarea
        });

        el = helpers.createDirective(formHtml, compile, scope);

        expect(el.children('div.modal-footer').children().attr('ng-switch')).to.equal('state');
    });

    it('should focus on first tabbable element', function () {
        var formHtml = _.template(rxModalForm, {
            fields: textInput + textarea
        });

        el = helpers.createDirective(formHtml, compile, scope);

        var input = el.find('input')[0];
        var secondFocusable = el.find('textarea')[0];

        sinon.spy(input, 'focus');
        sinon.spy(secondFocusable, 'focus');

        timeout.flush();

        expect(input.focus).to.be.calledOnce;

        // should only focus the first element
        expect(secondFocusable.focus).to.not.be.called;
    });

    it('should focus on select and textareas', function () {
        // going to re-use this for our different elements
        var focusable;

        var formHtml = _.template(rxModalForm, {
            fields: textarea
        });

        el = helpers.createDirective(formHtml, compile, scope);

        focusable = el.find('textarea')[0];

        sinon.spy(focusable, 'focus');

        timeout.flush();

        expect(focusable.focus).to.be.calledOnce;

        // now check the select box
        formHtml = _.template(rxModalForm, {
            fields: selectBox
        });

        el = helpers.createDirective(formHtml, compile, scope);

        focusable = el.find('select')[0];

        sinon.spy(focusable, 'focus');

        timeout.flush();

        expect(focusable.focus).to.be.calledOnce;
    });

    it('should not focus on hidden input element', function () {
        var formHtml = _.template(rxModalForm, {
            fields: hiddenInput + textInput
        });

        el = helpers.createDirective(formHtml, compile, scope);

        var inputs = el.find('input');

        sinon.spy(inputs[0], 'focus');
        sinon.spy(inputs[1], 'focus');

        timeout.flush();

        expect(inputs[0].focus).to.not.be.called;
        expect(inputs[1].focus).to.be.calledOnce;
    });

    it('should not focus on disabled input element', function () {
        var formHtml = _.template(rxModalForm, {
            fields: disabledInput + textInput
        });

        el = helpers.createDirective(formHtml, compile, scope);

        var inputs = el.find('input');

        sinon.spy(inputs[0], 'focus');
        sinon.spy(inputs[1], 'focus');

        timeout.flush();

        expect(inputs[0].focus).to.not.be.called;
        expect(inputs[1].focus).to.be.calledOnce;
    });

    it('should prioritize elements with an autofocus attribute', function () {
        var formHtml = _.template(rxModalForm, {
            fields: textInput + autofocusInput
        });

        el = helpers.createDirective(formHtml, compile, scope);

        var inputs = el.find('input');

        sinon.spy(inputs[0], 'focus');
        sinon.spy(inputs[1], 'focus');

        timeout.flush();

        expect(inputs[0].focus).to.not.be.called;
        expect(inputs[1].focus).to.be.calledOnce;
    });

    describe('when a default focus is specified', function () {
        var focus;

        beforeEach(function () {
            focus = sinon.spy(HTMLElement.prototype, 'focus');
        });

        afterEach(function () {
            focus.restore();
        });

        it('should focus on cancel button when specified', function () {
            var rxModalForm = '<rx-modal-form default-focus="${defaultFocus}">${ fields }</rx-modal-form>';
            var formHtml = _.template(rxModalForm, {
                fields: textInput + textarea + selectBox,
                defaultFocus: 'cancel'
            });

            // The state must be manually written since the modal was not created via rxModalAction
            scope.state = 'editing';
            el = helpers.createDirective(formHtml, compile, scope);

            timeout.flush();

            // should only focus the specified element
            expect(focus).to.have.been.calledOnce;
            expect(focus.firstCall.thisValue.tagName).to.equal('BUTTON');
            expect(focus.firstCall.thisValue.classList.contains('cancel')).to.be.true;

        });

        it('should focus on submit button when specified', function () {
            var rxModalForm = '<rx-modal-form default-focus="${defaultFocus}">${ fields }</rx-modal-form>';
            var formHtml = _.template(rxModalForm, {
                fields: textInput + textarea + selectBox,
                defaultFocus: 'submit'
            });

            // The state must be manually written since the modal was not created via rxModalAction
            scope.state = 'editing';
            el = helpers.createDirective(formHtml, compile, scope);

            timeout.flush();

            // should only focus the specified element
            expect(focus).to.have.been.calledOnce;
            expect(focus.firstCall.thisValue.tagName).to.equal('BUTTON');
            expect(focus.firstCall.thisValue.classList.contains('submit')).to.be.true;

        });

        it('should focus on First Tabbable when anything else is specified', function () {
            var rxModalForm = '<rx-modal-form default-focus="${defaultFocus}">${ fields }</rx-modal-form>';
            var formHtml = _.template(rxModalForm, {
                fields: textInput + textarea + selectBox,
                defaultFocus: 'foo'
            });

            el = helpers.createDirective(formHtml, compile, scope);

            timeout.flush();

            // should only focus the specified element
            expect(focus).to.have.been.calledOnce;
            expect(focus.firstCall.thisValue.tagName).to.equal('INPUT');
        });
    });

    it('should not throw errors if no focusable elements are found', function () {
        var formHtml = _.template(rxModalForm, {
            fields: ''
        });

        var test = function () {
            helpers.createDirective(formHtml, compile, scope);
            timeout.flush();
        };

        expect(test).to.not.throw('focus');
    });
});
