describe('rxForm', function () {
    var scope, compile, template;

    beforeEach(function () {
        module('encore.ui.elements');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('rx-suffix', function () {
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
                                        '<rx-suffix>million</rx-suffix>' +
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
                before(function () {
                    template = '<rx-suffix></rx-suffix>';
                });

                it('should error', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });
    });//rx-suffix
});//rxForm
