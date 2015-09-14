/*jshint node:true*/
var Page = require('astrolabe').Page;

/**
   @namespace
 */
var rxMultiSelect = {

    /**
       @function
       @returns {Boolean} Whether the root element is currently displayed.
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    }

};

/**
   @exports encore.rxMultiSelect
 */
exports.rxMultiSelect = {

    /**
       @function
       @param {WebElement} rxMultiSelectElement - WebElement to be transformed into an rxMultiSelectElement object.
       @returns {rxMultiSelect} Page object representing the rxMultiSelect object.
     */
    initialize: function (rxMultiSelectElement) {
        rxMultiSelect.rootElement = {
            get: function () { return rxMultiSelectElement; }
        };
        return Page.create(rxMultiSelect);
    },

    /**
       @returns {rxMultiSelect} Page object representing the _first_ rxMultiSelect object found on the page.
    */
    main: (function () {
        rxMultiSelect.rootElement = {
            get: function () { return $('#rxMultiSelect'); }
        };
        return Page.create(rxMultiSelect);
    })()

};
