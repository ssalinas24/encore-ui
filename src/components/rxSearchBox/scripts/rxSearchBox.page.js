/*jshint node:true*/
var Page = require('astrolabe').Page;

/**
   @namespace
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
        @property {string} term - getter/setter for search value
        @description getter/setter for the search value
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
        @property {string} placeholder - retrieve placeholder value
     */
    placeholder: {
        get: function () {
            return this.txtSearch.getAttribute('placeholder');
        }
    },

    /**
        @property {boolean} isClearable - whether the element can be cleared
        @returns {Boolean}
     */
    isClearable: {
        value: function () {
            return this.btnClear.isPresent();
        }
    },

    /**
        @property {boolean} isSearchable - true unless disabled
        @returns {Boolean}
     */
    isSearchable: {
        value: function () {
            return this.txtSearch.getAttribute('disabled').then(function (disabled) {
                return disabled === null ? true : false;
            });
        }
    },

    /**
        @property {boolean} isDisplayed - whether the element is displayed
        @returns {Boolean} Whether the root element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    },

    /**
        @function
        @description Clear the value of the search box.
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

/**
   @exports encore.rxSearchBox
 */
exports.rxSearchBox = {

    /**
       @function
       @param {WebElement} rxSearchBoxElement - WebElement to be transformed into an rxSearchBoxElement object.
       @returns {rxSearchBox} Page object representing the rxSearchBox object.
     */
    initialize: function (rxSearchBoxElement) {
        rxSearchBox.rootElement = {
            get: function () { return rxSearchBoxElement; }
        };
        return Page.create(rxSearchBox);
    },

    /**
       @returns {rxSearchBox} Page object representing the _first_ rxSearchBox object found on the page.
    */
    main: (function () {
        rxSearchBox.rootElement = {
            get: function () { return $$('rx-search-box').first(); }
        };
        return Page.create(rxSearchBox);
    })()

};
