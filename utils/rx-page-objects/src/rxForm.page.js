var Page = require('astrolabe').Page;
var _ = require('lodash');

var rxMisc = require('./rxMisc.page').rxMisc;
var rxSelect = require('./rxSelect.page').rxSelect;
var rxRadio = require('./rxRadio.page').rxRadio;
var rxCheckbox = require('./rxCheckbox.page').rxCheckbox;

/**
 * @namespace
 */
var rxFieldName = {
    eleRequiredSymbol: {
        get: function () {
            return this.rootElement.$('.required-symbol');
        }
    },

    eleContent: {
        get: function () {
            return this.rootElement.$('.rx-field-name-content');
        }
    },

    /**
     * @function
     * @instance
     * @deprecated
     * @description Whether or not a required field currently displays a red asterisk next to it.
     *
     * **DEPRECATED** Use `isSymbolDisplayed()` instead.
     * @returns {Boolean}
     */
    isSymbolVisible: {
        value: function () {
            return this.isSymbolDisplayed();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not a required field currently displays a red asterisk next to it.
     * @returns {Boolean}
     */
    isSymbolDisplayed: {
        value: function () {
            return this.eleRequiredSymbol.isDisplayed();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the required symbol is present in the DOM.
     * @returns {Boolean}
     */
    isSymbolPresent: {
        value: function () {
            return this.eleRequiredSymbol.isPresent();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the field is currently displayed.
     * @returns {Boolean}
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the field is currently present on the page.
     * @returns {Boolean}
     */
    isPresent: {
        value: function () {
            return this.rootElement.isPresent();
        }
    }
};//rxFieldName

/**
 * @namespace rxForm
 */
exports.rxForm = {
    /**
     * @namespace
     */
    textField: {
        /**
         * @function
         * @description
         * Generates a getter and a setter for a text field on your page.
         * Text fields include text boxes, text areas, anything that responds to `.clear()` and `.sendKeys()`.
         * @param {ElementFinder} elem - The ElementFinder for the text field.
         * @returns {Object} A getter and a setter to be applied to a text field in a page object.
         *
         * @example
         * var yourPage = Page.create({
         *     plainTextbox: rxForm.textField.generateAccessor(element(by.model('username')));
         * });
         *
         * it('should fill out the text box', function () {
         *     yourPage.plainTextbox = 'My Username'; // setter
         *     expect(yourPage.plainTextbox).to.eventually.equal('My Username'); // getter
         * });
         */
        generateAccessor: function (elem) {
            return {
                get: function () {
                    return elem.getAttribute('value');
                },
                set: function (input) {
                    elem.clear();
                    elem.sendKeys(input);
                }
            };
        }
    },

    form: {
        /**
         * @private
         * @description
         * This is an alias to the new `rxForm.fill`, which was formally `rxForm.form.fill`.
         * It is kept here to remain backwards compatible with previous versions of the library.
         */
        fill: function (reference, formData) {
            exports.rxForm.fill(reference, formData);
        }
    },

    /**
     * @description
     * Set `value` in `formData` to the page object's current method `key`.
     * Aids in filling out form data via javascript objects.
     * For an example of this in use, see [encore-ui's end to end tests]{@link http://goo.gl/R7Frwv}.
     * @param {Object} reference - Context to evaluate under as `this` (typically, `this`).
     * @param {Object} formData - Key-value pairs of deeply-nested form items, and their values to fill.
     *
     * @example
     * var yourPage = Page.create({
     *     form: {
     *         set: function (formData) {
     *             rxForm.fill(this, formData);
     *         }
     *     },
     *
     *     aTextbox: encore.rxForm.textField.generateAccessor(element(by.model('textbox'))),
     *
     *     aRadioButton: encore.rxRadio.generateAccessor(element(by.model('radioButton'))),
     *     anotherRadioButton: encore.rxRadio.generateAccessor(element(by.model('radioButton_1'))),
     *
     *     aSelectDropdown: encore.rxSelect.generateAccessor(element(by.model('dropdown')));
     *
     *     aModule: {
     *         // this is now a namespace within your page object
     *         get hasMethods() {
     *             return encore.rxForm.textField.generateAccessor(element(by.model('internalTextbox')))
     *         },
     *
     *         deepNesting: {
     *             // namespace within a namespace
     *             get might() {
     *                 return encore.rxForm.textField.generateAccessor(element(by.model('nested')))
     *             }
     *         }
     *     }
     *
     * });
     *
     * yourPage.form = {
     *     aTextbox: 'My Name',
     *     aRadioButton: true,
     *     aSelectDropdown: 'My Choice'
     *     aModule: {
     *         hasMethods: 'Can Accept Input Too',
     *         deepNesting: {
     *             might: 'be overkill at this level'
     *         }
     *     }
     * };
     * // executing the above would execute all `setter` methods of your form to equal the values listed above.
     */
    fill: function (reference, formData) {
        var next = this;
        var page = reference;
        _.forEach(formData, function (value, key) {
            if (_.isPlainObject(value)) {
                // There is a deeply-nested function call in the form.
                reference = page[key];
                next.fill(reference, value);
            } else {
                page[key] = value;
            }
        });
    },

    //TODO: split out into exports.rxFieldName (src/rxFieldName.page.js)
    /**
     * @namespace
     */
    fieldName: {
        /**
         * @function
         * @param {ElementFinder} rxFieldNameElement -
         * ElementFinder to be transformed into an rxFieldNameElement object.
         * @returns {rxFieldName} Page object representing the rxFieldName object.
         */
        initialize: function (rxFieldNameElement) {
            rxFieldName.rootElement = {
                get: function () { return rxFieldNameElement; }
            };
            return Page.create(rxFieldName);
        }
    },

    /* eslint-disable space-before-function-paren */ // https://github.com/eslint/eslint/issues/5520

    /**
     * @description **ALIASED**: Directly uses {@link rxCheckbox}.
     * @property {Function} initialize - {@link rxCheckbox.initialize}
     * @property {Function} generateAccessor - {@link rxCheckbox.generateAccessor}
     */
    checkbox: {
        get initialize() { return rxCheckbox.initialize; },
        get generateAccessor() { return rxCheckbox.generateAccessor; }
    },

    /**
     * @description **ALIASED**: Directly uses {@link rxRadio}.
     * @property {Function} initialize - {@link rxRadio.initialize}
     * @property {Function} generateAccessor - {@link rxRadio.generateAccessor}
     */
    radioButton: {
        get initialize() { return rxRadio.initialize; },
        get generateAccessor() { return rxRadio.generateAccessor; }
    },

    /**
     * @description **ALIASED**: Directly uses {@link rxDropdown}.
     * @property {Function} initialize - {@link rxDropdown.initialize}
     * @property {Function} generateAccessor - {@link rxDropdown.generateAccessor}
     */
    dropdown: {
        get initialize() { return rxSelect.initialize; },
        get generateAccessor() { return rxSelect.generateAccessor; }
    },

    /* eslint-enable space-before-function-paren */

    /**
     * @deprecated
     * @function
     * @description
     * **ALIASED**: Please use {@link rxMisc.currencyToPennies} instead.
     * This function will be removed in a future release of the EncoreUI framework.
     */
    currencyToPennies: function (currencyString) {
        return rxMisc.currencyToPennies(currencyString);
    },

    /**
     * @deprecated
     * @function
     * @description
     * **ALIASED**: Please use {@link rxMisc.slowClick} instead.
     * This function will be removed in a future release of the EncoreUI framework.
     */
    slowClick: function (elem) {
        return rxMisc.slowClick(elem);
    }
};
