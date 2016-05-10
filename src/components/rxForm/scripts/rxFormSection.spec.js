describe('rxForm', function () {
    var scope, compile, template;

    beforeEach(function () {
        module('encore.ui.rxForm');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('rx-form-section', function () {
        describe('hierarchy validation', function () {
            var createDirective;

            beforeEach(function () {
                createDirective = function () {
                    helpers.createDirective(template, compile, scope);
                };
            });

            describe('when nested within rx-form', function () {
                before(function () {
                    template = '<form rx-form>' +
                        '<rx-form-section></rx-form-section>' +
                    '</form>';
                });

                it('should not error', function () {
                    expect(createDirective).to.not.throw(Error);
                });
            });

            describe('when not nested within rx-form', function () {
                before(function () {
                    template = '<rx-form-section></rx-form-section>';
                });

                it('should error', function () {
                    expect(createDirective).to.throw(Error);
                });
            });
        });
    });//rx-form-section
});//rxForm
