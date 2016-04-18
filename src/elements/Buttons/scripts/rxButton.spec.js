describe('rxButton', function () {
    describe('directive:rxButton', function () {
        var el, scope, compile,
            btnTemplate =
            '<rx-button ' +
                'toggle-msg="Authenticating" ' +
                'default-msg="Login" ' +
                'toggle="status.loading" ' +
                'disable="status.disable">' +
            '</rx-button>';

        beforeEach(function () {
            module('encore.ui.elements');
            module('templates/rxButton.html');

            inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                compile = $compile;
            });

            el = compile(btnTemplate)(scope);
            scope.$digest();
        });

        afterEach(function () {
            el = null;
        });

        function getButton (el) {
            var buttons = el.find('button');
            return angular.element(buttons['0']);
        }

        it('should render template correctly', function () {
            expect(el).not.be.empty;
            expect(el.find('button')).not.be.empty;

            var button = getButton(el);
            expect(button.text().trim()).to.equal('Login');
            expect(button.attr('disabled')).to.be.empty;
        });

        it('should render toggle message, animation and disable button', function () {
            var button = getButton(el);
            expect(button.hasClass('ng-hide')).to.be.false;

            scope.status = { loading: true, disable: false };
            scope.$digest();

            expect(button.text().trim()).to.eq('Authenticating');
            expect(button.find('div').hasClass('ng-hide')).to.be.false;
            expect(button.attr('disabled')).to.eq('disabled');
        });

        it('should disable the button when `disable` changes', function () {
            var button = getButton(el);
            expect(button.hasClass('ng-hide')).to.be.false;

            scope.status = { loading: false, disable: false };
            scope.$digest();
            expect(button.attr('disabled'), 'Before setting `disable`').to.be.undefined;

            scope.status.disable = true;
            scope.$digest();
            expect(button.attr('disabled'), 'After setting `disable`').to.eq('disabled');
        });
    });
});
