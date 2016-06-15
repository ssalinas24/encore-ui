describe('rxForm', function () {
    var scope, compile, template;

    beforeEach(function () {
        module('encore.ui.rxForm');
        module('encore.ui.utilities');
        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('rx-field', function () {
        describe('hierarchy validation', function () {
            var createDirective;

            beforeEach(function () {
                createDirective = function () {
                    helpers.createDirective(template, compile, scope);
                };
            });

            describe('when nested within rx-form-section', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section>' +
                            '<rx-field></rx-field>' +
                        '</rx-form-section>' +
                    '</form>';
                });

                it('should not error', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-form-section', function () {
                before(function () {
                    template = '<rx-field></rx-field>';
                });

                it('should error', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });
    });//rx-field
});//rxForm
