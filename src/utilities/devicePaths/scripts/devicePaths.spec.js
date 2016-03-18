/* jshint node: true */

describe('devicePaths', function () {
    var dp;

    beforeEach(function () {
        // Load the directive's module
        module('encore.ui.utilities');

        // Inject in angular constructs
        inject(function (devicePaths) {
            dp = devicePaths;
        });
    });

    it('should exist', function () {
        expect(dp).to.exist;
    });
});
