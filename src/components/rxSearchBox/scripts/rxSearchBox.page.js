/*jshint node:true*/
var Page = require('astrolabe').Page;

/**
 * @namespace
 */
var rxSearchBox = {

    txtSearch: {
        get: function () {
            return this.rootElement.$('.rxSearchBox-input');
        }
    },

    btnClear: {
        get: function () {
            return this.rootElement.$('.rxSearchBox-clear');
        }
    },

    /**
     * @instance
     * @type {String}
     * @description Getter/setter for the search value.
     * @example
     * it('should update the search term', function () {
     *     var search = encore.rxSearchBox.initialize();
     *     search.term = 'Some query';
     *     expect(search.term).to.eventually.equal('Some query');
     * });
     */
    term: {
        get: function () {
            return this.txtSearch.getAttribute('value');
        },
        set: function (searchTerm) {
            this.txtSearch.clear();
            this.txtSearch.sendKeys(searchTerm);
        }
    },

    /**
     * @type {String}
     * @instance
     * @description The placeholder value that exists in the search box before
     * a user has typed in some text into it.
     * @example
     * it('should instruct users to search for users via the placeholder', function () {
     *     expect(encore.rxSearchBox.initialize().placeholder).to.eventually.equal('Search for a user...');
     * });
     */
    placeholder: {
        get: function () {
            return this.txtSearch.getAttribute('placeholder');
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the search box is clearable. To be clearable is determined
     * by the existence of the clear button next to the search box.
     * @returns {Boolean}
     */
    isClearable: {
        value: function () {
            return this.btnClear.isPresent();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the search box is searchable.
     * To make this check, {@link rxSearchBox#isDisabled} is called.
     * @returns {Boolean}
     */
    isSearchable: {
        value: function () {
            return this.isDisabled();
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the search box is disabled.
     * @returns {Boolean}
     */
    isDisabled: {
        value: function () {
            return this.txtSearch.getAttribute('disabled').then(function (disabled) {
                return disabled === null ? true : false;
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Whether or not the search box is displayed.
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
     * @description Clear the value of the search box using the clear button.
     * If no clear button is present with the search box, then nothing will happen.
     * @example
     * it('should only clear the textbox if it is explicitly clearable', function () {
     *     var search = encore.rxSearchBox.initialize();
     *     expect(search.isClearable()).to.eventually.be.false;
     *     search.term = 'Some query';
     *     search.clear();
     *     // there is no clear button, so nothing happens
     *     expect(search.term).to.eventually.equal('Some query');
     *     // this will always work, however
     *     search.term = '';
     *     expect(search.term).to.eventually.equal('');
     * });
     */
    clear: {
        value: function () {
            var page = this;
            this.isClearable().then(function (clearable) {
                if (clearable) {
                    page.btnClear.click();
                }
            });
        }
    }

};

exports.rxSearchBox = {

    /**
     * @function
     * @memberof rxSearchBox
     * @param {ElementFinder} rxSearchBoxElement - ElementFinder to be transformed into an rxSearchBoxElement object.
     * @returns {rxSearchBox}
     * @description Page object representing the rxSearchBox object.
     */
    initialize: function (rxSearchBoxElement) {
        if (rxSearchBoxElement === undefined) {
            rxSearchBoxElement = $('rx-search-box');
        }

        rxSearchBox.rootElement = {
            get: function () { return rxSearchBoxElement; }
        };
        return Page.create(rxSearchBox);
    },

    /**
     * @memberof rxSearchBox
     * @deprecated Use {@link rxSearchBox.initialize} without arguments instead.
     * @type {rxSearchBox}
     * @description Will return a page object representing the _first_ rxSearchBox object found on the page.
     */
    main: (function () {
        rxSearchBox.rootElement = {
            get: function () { return $$('rx-search-box').first(); }
        };
        return Page.create(rxSearchBox);
    })()

};
