/**
 * @description Properties and methods describing a {{%= name %}} element.
 * @namespace
 */
var {%= name %} = {

    /**
     * @function
     * @returns {Boolean} Whether the root element is currently displayed.
     * @example
     * it('should show the {{%= name %}} element by default', function () {
     *     expect(encore.{{%= name %}}.initialize().isDisplayed()).to.eventually.be.true;
     * });
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    }

};

exports.{%= name %} = {

    /**
     * @function
     * @memberof {{%= name %}}
     * @description Creates a page object from a DOM element representing a {{%= name %}} element.
     * @param {ElementFinder} {%= name %}Element - WebElement to be transformed into an {%= name %}Element object.
     * @returns {{%= name %}}
     */
    initialize: function ({%= name %}Element) {
        {%= name %}.rootElement = {
            get: function () { return {%= name %}Element; }
        };
        return Page.create({%= name %});
    }

};
