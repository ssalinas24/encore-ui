describe('rxForm', function () {
    var el, scope, compile, template;

    beforeEach(function () {
        module('encore.ui.rxForm');
        module('templates/rxFormItem.html');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('(deprecated directive) rxFormItem', function () {
        var sandbox;
        var formInput = '<input type="text">';

        var createDirective = function (inputTemplate) {
            var formItemTemplate = '<rx-form-item label="Name"><%= input %></rx-form-item>';
            var html = _.template(formItemTemplate, {
                input: inputTemplate
            });

            return helpers.createDirective(html, compile, scope);
        };//createDirective()

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
            sandbox.stub(window.console, 'warn');

            el = createDirective(formInput);
        });

        afterEach(function () {
            sandbox.restore();
            el = null;
        });

        it('should emit deprecation warning in console', function () {
            template = '<rx-form-item></rx-form-item>';
            helpers.createDirective(template, compile, scope);

            expect(console.warn).to.be.calledOnce;
            expect(console.warn).to.be.calledWithMatch('DEPRECATION WARNING');
        });

        it('should render template correctly', function () {
            expect(el).to.not.be.empty;
            expect(el.find('input')).to.not.be.empty;
            expect(el.find('label').text()).to.contain('Name');
        });

        it('should not put text-area-label class on the element', function () {
            expect(el.find('div').hasClass('text-area-label')).to.be.false;
        });

        it('should link label to form input using unique id', function () {
            var uniqueId = el.find('label').eq(0).attr('for');

            expect(uniqueId).to.have.length.above(0);
            expect(el.find('input').eq(0).attr('id')).to.equal(uniqueId);
        });

        it('should gracefully fail if no input added', function () {
            el = createDirective('Some non-input text');

            var uniqueId = el.find('label').eq(0).attr('for');

            expect(uniqueId).to.be.undefined;
        });

        it('should link label to form input using field id', function () {
            el = createDirective('<input id="myId">');

            var uniqueId = el.find('label').eq(0).attr('for');

            expect(uniqueId).to.equal('myId');
        });

        it('should link to label to select box', function () {
            el = createDirective('<select id="myId"></select>');

            var uniqueId = el.find('label').eq(0).attr('for');

            expect(uniqueId).to.equal('myId');
        });

        it('should link to first input if multiple found', function () {
            el = createDirective('<select></select><input id="myId">');

            var uniqueId = el.find('label').eq(0).attr('for');
            var selectId = el.find('select').eq(0).attr('id');

            expect(uniqueId).to.not.equal('myId');
            expect(uniqueId).to.equal(selectId);
        });

        describe('textarea special case', function () {
            var oldFormInput;

            beforeEach(function () {
                oldFormInput = formInput;
                formInput = '<textarea>';
                el = createDirective(formInput);
            });

            afterEach(function () {
                formInput = oldFormInput;
            });
            it('should put text-area-label class on the main div', function () {
                expect(el.find('div').hasClass('text-area-label')).to.be.true;
            });
        });
    });
});
