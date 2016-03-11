/* jshint node: true */
describe('rxAttributes', function () {
    var scope, compile, el;
    var validTemplate = '<div rx-attributes="{\'my-custom-attr\': customAttrVal, \'ng-click\': noFunc}"></div>';

    beforeEach(function () {
        // load module
        module('encore.ui.rxAttributes');

        // Inject in angular constructs
        inject(function ($location, $rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        // here we define a custom attribute value, so that 'my-custom-attr' will be set to it
        scope.customAttrVal = 'yes';
        // we don't define 'noFunc', therefore 'ng-click' won't be added

        el = helpers.createDirective(validTemplate, compile, scope);
    });

    it('should add custom attribute if value defined', function () {
        expect(el.attr('my-custom-attr')).to.equal('yes');
    });

    it('should not custom attribute if value not defined', function () {
        expect(el.attr('ng-click')).to.not.exist;
    });
});
