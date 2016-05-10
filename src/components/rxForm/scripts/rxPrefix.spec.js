describe('rxForm', function () {
    var scope, compile, template;

    beforeEach(function () {
        module('encore.ui.rxForm');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('rx-prefix', function () {
        describe('hierarchy validation', function () {
            var createDirective;

            beforeEach(function () {
                createDirective = function () {
                    helpers.createDirective(template, compile, scope);
                };
            });

            describe('when nested within rx-input', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section>' +
                            '<rx-field>' +
                                '<rx-field-content>' +
                                    '<rx-input>' +
                                        '<rx-prefix>$</rx-prefix>' +
                                    '</rx-input>' +
                                '</rx-field-content>' +
                            '</rx-field>' +
                        '</rx-form-section>' +
                    '</form>';
                });

                it('should not error', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-input', function () {
                beforeEach(function () {
                    template = '<rx-prefix></rx-prefix>';
                });

                it('should error', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });
    });//rx-prefix
});//rxForm
