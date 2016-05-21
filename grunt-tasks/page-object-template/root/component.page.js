/**
 * @description Properties and methods describing a {{%= componentName %}} element.
 * @namespace
 */
var {%= componentName %} = {

    /**
     * @description Whether the root element is currently displayed.
     * @function
     * @returns {Boolean}
     * @example
     * it('should show the {%= componentName %} element by default', function () {
     *     expect(encore.{%= componentName %}.initialize().isDisplayed()).to.eventually.be.true;
     * });
     */
    isDisplayed: {
        value: function () {
            return this.rootElement.isDisplayed();
        }
    }

};

exports.{%= componentName %} = {

    /**
     * @function
     * @memberof {{%= componentName %}}
     * @description Creates a page object from a DOM element representing a {{%= componentName %}} element.
     * @param {ElementFinder} {%= componentName %}Element - WebElement to be transformed into an {%= componentName %}Element object.
     * @returns {{%= componentName %}}
     */
    initialize: function ({%= componentName %}Element) {
        {%= componentName %}.rootElement = {
            get: function () { return {%= componentName %}Element; }
        };
        return Page.create({%= componentName %});
    }

};
