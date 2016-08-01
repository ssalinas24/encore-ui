describe('rxForm', function () {
    var scope, compile, template;

    beforeEach(function () {
        module('encore.ui.elements');
        module('templates/rxFieldName.html');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('rx-field-name', function () {
        describe('hierarchy validation', function () {
            var createDirective;

            beforeEach(function () {
                createDirective = function () {
                    helpers.createDirective(template, compile, scope);
                };
            });

            describe('when nested within rx-field', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section>' +
                            '<rx-field>' +
                                '<rx-field-name>Name</rx-field-name>' +
                            '</rx-field>' +
                        '</rx-form-section>' +
                    '</form>';
                });

                it('should not throw error when created', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-field', function () {
                before(function () {
                    template = '<rx-field-name></rx-field-name>';
                });

                it('should throw error when created', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });
    });//rx-field-name
});//rxForm
