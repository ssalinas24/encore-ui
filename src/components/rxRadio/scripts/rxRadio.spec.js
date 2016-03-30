describe('rxRadio', function () {
    var el, scope, compile, template;
    var parent;

    beforeEach(function () {
        module('encore.ui.rxRadio');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    afterEach(function () {
        el = null;
        parent = null;
    });

    describe('basic usage', function () {
        beforeEach(function () {
            template = '<input rx-radio />';
            el = helpers.createDirective(template, compile, scope);
        });

        it('should not have "disabled" attribute', function () {
            expect(el.attr('disabled')).to.not.exist;
        });

        describe('parent', function () {
            beforeEach(function () {
                parent = el.parent();
            });

            it('should have "rxRadio" class', function () {
                expect(parent.attr('class')).to.contain('rxRadio');
            });

            it('should not have "rx-disabled" class', function () {
                expect(parent.attr('class')).to.not.contain('rx-disabled');
            });
        });//parent
    });//basic usage

    describe('with "disabled" attribute', function () {
        beforeEach(function () {
            template = '<input rx-radio disabled>';
            el = helpers.createDirective(template, compile, scope);
        });

        describe('parent', function () {
            beforeEach(function () {
                parent = el.parent();
            });

            it('should be disabled', function () {
                expect(parent.attr('class')).to.contain('rx-disabled');
            });

            it('should have "rxRadio" class', function () {
                expect(parent.attr('class')).to.contain('rxRadio');
            });
        });
    });//"disabled"

    describe('when "ng-disabled"', function () {
        beforeEach(function () {
            template = '<input rx-radio ng-disabled="isDisabled" />';
            el = helpers.createDirective(template, compile, scope);
        });

        describe('is truthy', function () {
            beforeEach(function () {
                scope.isDisabled = true;
                scope.$digest();
            });

            it('should have "disabled" attribute', function () {
                expect(el.attr('disabled')).to.exist;
            });

            it('parent should have "rx-disabled" class', function () {
                expect(el.parent().attr('class')).to.contain('rx-disabled');
            });
        });

        describe('is falsey', function () {
            beforeEach(function () {
                scope.isDisabled = false;
                scope.$digest();
            });

            it('should not have "disabled" attribute', function () {
                expect(el.attr('disabled')).to.not.exist;
            });

            it('parent should not have "rx-disabled" class', function () {
                expect(el.parent().attr('class')).to.not.contain('rx-disabled');
            });
        });
    });//"ng-disabled"

    describe('when destroyed', function () {
        var wrapper;

        beforeEach(function () {
            template = '<div><input rx-radio ng-if="isDisplayed" /></div>';
            wrapper = helpers.createDirective(template, compile, scope);

            scope.isDisplayed = false;
            scope.$digest();
        });

        it('test wrapper should have 0 children', function () {
            expect(wrapper.children().length).to.eq(0);
        });
    });//when destroyed
});
