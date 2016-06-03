var _ = require('lodash');
var rxSelect = require('./rxSelect.page').rxSelect;

/**
 * @description rxSelect exercises.
 * @see rxSelect
 * @exports exercise/rxSelect
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxSelect} options.instance - Component to exercise.
 * @param {string} [options.cssSelector] - DEPRECATED: Fallback selector string to initialize widget with.
 * @param {Boolean} [options.disabled=false] - Determines if the select is disabled
 * @param {Boolean} [options.visible=true] - Determines if the select is visible
 * @param {Boolean} [options.valid=true] - Determines if the select is valid
 * @param {String} [selectedText] - The expected selected text of the dropdown.
 */
exports.rxSelect = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        visible: true,
        valid: true
    });

    return function () {
        var component;

        before(function () {
            if (options.instance !== undefined) {
                component = options.instance;
            }

            if (options.cssSelector !== undefined) {
                console.warn('Deprecated exercise option `cssSelector` will be removed in favor of `instance`');
                component = rxSelect.initialize($(options.cssSelector));
            }
        });

        it('should be present', function () {
            expect(component.isPresent()).to.eventually.be.true;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should ' + (options.disabled ? 'be' : 'not be') + ' disabled', function () {
            expect(component.isEnabled()).to.eventually.eq(!options.disabled);
        });

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', function () {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });

        if (options.selectedText) {
            it('should have the correct selected option already chosen', function () {
                expect(component.selectedOption.text).to.eventually.equal(options.selectedText);
            });
        }
    };
};
