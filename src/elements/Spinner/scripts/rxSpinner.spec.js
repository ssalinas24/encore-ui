describe('rxSpinner', function () {
    var scope, compile, el, template;

    beforeEach(function () {
        // load module
        module('encore.ui.elements');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('with default spinner template', function () {
        beforeEach(function () {
            template = '<div rx-spinner toggle="toggle"></div>';
            el = helpers.createDirective(template, compile, scope);
            scope.$digest();
        });

        describe('when toggled', function () {
            beforeEach(function () {
                scope.toggle = true;
                scope.$digest();
            });

            it('should render a normal spinner', function () {
                expect(el.children()).to.have.lengthOf(1);
                expect(el.children()[0].getAttribute('class')).to.not.match(/ dark /);
            });
        });//toggled

        describe('when not toggled', function () {
            beforeEach(function () {
                scope.toggle = false;
                scope.$digest();
            });

            it('should not render a spinner', function () {
                expect(el.children()).to.have.lengthOf(0);
            });
        });//not toggled
    });//default spinner

    describe('with dark spinner template', function () {
        beforeEach(function () {
            template = '<div rx-spinner="dark" toggle="toggle"></div>';
            el = helpers.createDirective(template, compile, scope);
        });

        describe('when toggled', function () {
            beforeEach(function () {
                scope.toggle = true;
                scope.$digest();
            });

            it('should render a dark spinner', function () {
                expect(el.children()).to.have.lengthOf(1);
                expect(el.children()[0].getAttribute('class')).to.match(/ dark /);
            });
        });//toggled

        describe('when not toggled', function () {
            beforeEach(function () {
                scope.toggle = false;
                scope.$digest();
            });

            it('should not render a spinner', function () {
                expect(el.children()).to.have.lengthOf(0);
            });
        });//not toggled
    });//dark spinner
});
