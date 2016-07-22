describe('directive:rxButton', function () {
    var el, scope, compile, button, isoScope;

    var btnTemplate =
        '<rx-button ' +
            'toggle-msg="Authenticating" ' +
            'default-msg="Login" ' +
            'toggle="status.loading" ' +
            'ng-disabled="status.disabled">' +
        '</rx-button>';

    beforeEach(function () {
        module('encore.ui.elements');
        module('templates/rxButton.html');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        scope.status = {
            loading: false,
            disabled: false
        };

        el = compile(btnTemplate)(scope);
        scope.$digest();

        isoScope = el.isolateScope();

        var firstButton = el.find('button')['0'];
        button = angular.element(firstButton);
    });

    afterEach(function () {
        el = null;
        button = null;
    });

    it('should set isDisabled to false', function () {
        expect(isoScope.isDisabled).to.be.false;
    });

    describe('element', function () {
        it('should not be empty', function () {
            expect(el).to.not.be.empty;
        });

        it('should contain at least one button', function () {
            expect(el.find('button')).to.not.be.empty;
        });
    });//element

    describe('button', function () {
        it('should not be hidden', function () {
            expect(button.hasClass('ng-hide')).to.be.false;
        });

        it('should have expected text', function () {
            expect(button.text().trim()).to.equal('Login');
        });

        it('should not be disabled', function () {
            expect(button.attr('disabled')).to.be.undefined;
        });
    });//button

    describe('when loading', function () {
        beforeEach(function () {
            scope.status.loading = true;
            scope.$digest();
        });

        it('should contain loading message', function () {
            expect(button.text().trim()).to.eq('Authenticating');
        });

        it('should display loading overlay', function () {
            expect(button.find('div').hasClass('ng-hide')).to.be.false;
        });

        it('should be disabled', function () {
            expect(button.attr('disabled')).to.eq('disabled');
        });
    });//when loading

    describe('when disabled', function () {
        beforeEach(function () {
            scope.status.disabled = true
            scope.$digest();
        });

        it('should set isDisabled to true', function () {
            expect(isoScope.isDisabled).to.be.true;
        });

        it('should disable the button', function () {
            expect(button.attr('disabled'), 'After setting `disable`').to.eq('disabled');
        });
    });//when disabled
});
