/* jshint node: true */
describe('rxScreenshotSvc', function () {
    var rootScope, compile, scope, svc, el;
    var validTemplate = '<h1>Here is some content</h1>';

    beforeEach(function () {
        // load module
        module('encore.ui.utilities');

        // Inject in angular constructs
        inject(function ($rootScope, $compile, rxScreenshotSvc) {
            rootScope = $rootScope;
            scope = rootScope.$new();
            compile = $compile;
            svc = rxScreenshotSvc;
        });

        el = helpers.createDirective(validTemplate, compile, scope);
    });

    it('should exist', function () {
        expect(svc).to.exist;
    });

    it('should reject promise if html2canvas not available', function (done) {
        delete window.html2canvas;

        var promise = svc.capture();

        promise.catch(function (reason) {
            expect(reason).to.exist;

            done();
        });

        scope.$digest();
    });

    it('should capture a screenshot if dependencies exist', function (done) {
        window.html2canvas = function (target, options) {
            options.onrendered({
                toDataURL: function () {
                    return 'dataurl';
                }
            });
        };

        var promise = svc.capture(el[0]);

        promise.then(function (screenshot) {
            expect(screenshot).to.exist;

            done();
        });

        scope.$digest();
    });
});
