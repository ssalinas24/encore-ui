var _ = require('lodash');
var rxOptionTable = require('./rxOptionTable.page').rxOptionTable;

/**
 * @description rxOptionTable exercises.
 * @exports exercise/rxOptionTable
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxOptionTable} [options.instance=rxOptionTable.initialize] - Component to exercise.
 * @param {string} [options.cssSelector] - **DEPRECATED**: Fallback selector string to initialize widget with.
 * @param {string} [options.visible=true] - Determines if the option table is visible
 * @param {string} [options.empty=false] - Determines if the option table is empty
 */
exports.rxOptionTable = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        visible: true,
        empty: false
    });

    return function () {
        var component;

        before(function () {
            if (options.instance !== undefined) {
                component = options.instance;
            } else {
                component = rxOptionTable.initialize();
            }

            if (options.cssSelector !== undefined) {
                console.warn('Deprecated exercise option `cssSelector` will be removed in favor of `instance`');
                component = rxOptionTable.initialize($(options.cssSelector));
            }
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        if (options.empty) {
            it('should be empty', function () {
                expect(component.isEmpty()).to.eventually.be.true;
            });

            it('should have a "table empty" error message', function () {
                expect(component.emptyMessage).to.eventually.not.be.null;
            });
        } else {
            it('should not be empty', function () {
                expect(component.isEmpty()).to.eventually.be.false;
            });

            it('should not have a "table empty" error message', function () {
                expect(component.emptyMessage).to.eventually.be.null;
            });
        }
    };
};
