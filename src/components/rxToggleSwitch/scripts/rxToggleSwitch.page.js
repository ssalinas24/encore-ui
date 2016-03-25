var Page = require('astrolabe').Page;

/**
 * @namespace
 * @description Functionality around interacting with toggle switches.
 */
var rxToggleSwitch = {
    btnToggleSwitch: {
        get: function () {
            return this.rootElement.$('.rx-toggle-switch');
        }
    },

    /**
     * @function
     * @instance
     * @description Whether the root element is currently displayed.
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
     * @description Whether or not the switch component is currently set to the "on" position.
     * @returns {Boolean}
     */
    isEnabled: {
        value: function () {
            return this.btnToggleSwitch.getAttribute('class').then(function (classes) {
                return classes.split(' ').indexOf('on') > -1;
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Toggles the switch to the "on" position. If the toggle switch is already
     * set to this position, nothing happens.
     * @example
     * it('should enable the switch', function () {
     *     var switch = encore.rxToggleSwitch.initialize();
     *     expect(switch.isEnabled()).to.eventually.be.false;
     *     switch.enable();
     *     expect(switch.isEnabled()).to.eventually.be.true;
     *     switch.enable(); // does nothing the second time it is called
     *     expect(switch.isEnabled()).to.eventually.be.true;
     * });
     */
    enable: {
        value: function () {
            var page = this;
            return this.isDisabled().then(function (disabled) {
                if (disabled) {
                    page.btnToggleSwitch.click();
                }
            });
        }
    },

    /**
     * @todo Rename this function. This sounds like it checks for `ng-disable` on the directive.
     * @function
     * @instance
     * @description Whether or not the switch component is currently set to the "off" position.
     * @returns {Boolean}
     */
    isDisabled: {
        value: function () {
            return this.isEnabled().then(function (enabled) {
                return !enabled;
            });
        }
    },

    /**
     * @function
     * @instance
     * @description Toggles the switch to the "off" position. If the toggle switch is already
     * set to this position, nothing happens.
     * @example
     * it('should disable the switch', function () {
     *     var switch = encore.rxToggleSwitch.initialize();
     *     expect(switch.isEnabled()).to.eventually.be.true;
     *     switch.disable();
     *     expect(switch.isEnabled()).to.eventually.be.false;
     *     switch.disable(); // does nothing the second time it is called
     *     expect(switch.isEnabled()).to.eventually.be.false;
     * });
     */
    disable: {
        value: function () {
            var page = this;
            return this.isEnabled().then(function (enabled) {
                if (enabled) {
                    page.btnToggleSwitch.click();
                }
            });
        }
    },

    /**
     * @instance
     * @description The current text of the switch.
     * @type {String}
     * @example
     * it('should toggle to the "on" position', function () {
     *     var switch = encore.rxToggleSwitch.initialize();
     *     switch.enable();
     *     expect(switch.text).to.eventually.equal('ON');
     * });
     */
    text: {
        get: function () {
            return this.btnToggleSwitch.$('span').getText();
        }
    }
};

exports.rxToggleSwitch = {
    /**
     * @function
     * @memberof rxToggleSwitch
     * @param {ElementFinder} rxToggleSwitchElement -
     * ElementFinder to be transformed into an rxToggleSwitchElement object.
     * @returns {rxToggleSwitch} Page object representing the {@link rxToggleSwitch} object.
     */
    initialize: function (rxToggleSwitchElement) {
        rxToggleSwitch.rootElement = {
            get: function () { return rxToggleSwitchElement; }
        };
        return Page.create(rxToggleSwitch);
    }
};
