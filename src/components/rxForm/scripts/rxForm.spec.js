describe('rxForm', function () {
    var scope, compile, template;

    beforeEach(function () {
        module('encore.ui.rxForm');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('rx-form', function () {
        describe('hierarchy validation', function () {
            var createDirective;

            beforeEach(function () {
                createDirective = function () {
                    helpers.createDirective(template, compile, scope);
                };
            });

            before(function () {
                template = '<form rx-form></form>';
            });

            it('should not throw error on creation', function () {
                expect(createDirective).to.not.throw(Error);
            });
        });
    });//rx-form
});//rxForm
