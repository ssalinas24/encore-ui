var _ = require('lodash');

var rxForm = require('./rxForm.page').rxForm;

/**
 * rxFieldName exercises.
 * @exports exercise/rxFieldName
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxFieldName} options.instance - Component to exercise.
 * @param {string} [options.cssSelector] - **DEPRECATED**: Fallback selector string to initialize widget with.
 * @param {string} [options.visible=true] - Determines if the field name is visible.
 * @param {string} [options.present=true] - Determines if the field name is present in the DOM.
 * @param {string} [options.required=false] - Determines if the field name displays as a required field.
 */
exports.rxFieldName = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        visible: true,
        present: true,
        required: false
    });

    return function () {
        var component;

        before(function () {
            if (options.instance !== undefined) {
                component = options.instance;
            }

            if (options.cssSelector !== undefined) {
                console.warn('Deprecated exercise option `cssSelector` will be removed in favor of `instance`');
                component = rxForm.fieldName.initialize($(options.cssSelector));
            }
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        if (options.present === true) {
            it('should be present', function () {
                expect(component.isPresent()).to.eventually.be.true;
            });

            it('should have a symbol present', function () {
                expect(component.isSymbolPresent()).to.eventually.be.true;
            });
        } else {
            it('should not be present', function () {
                expect(component.isPresent()).to.eventually.be.false;
            });

            it('should not have a symbol present', function () {
                expect(component.isSymbolPresent()).to.eventually.be.false;
            });
        }

        if (options.required === true) {
            it('should have a symbol visible', function () {
                expect(component.isSymbolDisplayed()).to.eventually.be.true;
            });
        } else {
            it('should not have a symbol visible', function () {
                expect(component.isSymbolDisplayed()).to.eventually.be.false;
            });
        }
    };
};
