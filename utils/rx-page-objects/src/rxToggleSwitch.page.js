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
     *     var mySwitch = encore.rxToggleSwitch.initialize();
     *     expect(mySwitch.isEnabled()).to.eventually.be.false;
     *     mySwitch.enable();
     *     expect(mySwitch.isEnabled()).to.eventually.be.true;
     *     mySwitch.enable(); // does nothing the second time it is called
     *     expect(mySwitch.isEnabled()).to.eventually.be.true;
     * });
     */
    enable: {
        value: function () {
            var page = this;
            return this.isEnabled().then(function (enabled) {
                if (!enabled) {
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
     *
     * **DEPRECATED** Check inverse of `isEnabled()` instead.
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
     *     var mySwitch = encore.rxToggleSwitch.initialize();
     *     expect(mySwitch.isEnabled()).to.eventually.be.true;
     *     mySwitch.disable();
     *     expect(mySwitch.isEnabled()).to.eventually.be.false;
     *     mySwitch.disable(); // does nothing the second time it is called
     *     expect(mySwitch.isEnabled()).to.eventually.be.false;
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
     * @deprecated
     * @instance
     * @description The current text of the switch.
     *
     * **DEPRECATED**: Use {@link rxToggleSwitch#getText} instead.
     */
    text: {
        get: function () {
            return this.getText();
        }
    },

    /**
     * @instance
     * @function
     * @description The current text of the switch.
     * @example
     * it('should toggle to the "on" position', function () {
     *     var mySwitch = encore.rxToggleSwitch.initialize();
     *     mySwitch.enable();
     *     expect(mySwitch.getText()).to.eventually.equal('ON');
     * });
     * @returns {Promise<String>}
     */
    getText: {
        value: function () {
            return this.btnToggleSwitch.$('span').getText();
        }
    }
};

exports.rxToggleSwitch = {
    /**
     * @function
     * @memberof rxToggleSwitch
     * @param {ElementFinder} [rxToggleSwitchElement=$('rx-toggle-switch')] -
     * ElementFinder to be transformed into an rxToggleSwitchElement object.
     * @returns {rxToggleSwitch} Page object representing the {@link rxToggleSwitch} object.
     */
    initialize: function (rxToggleSwitchElement) {
        if (rxToggleSwitchElement === undefined) {
            rxToggleSwitchElement = $('rx-toggle-switch');
        }

        rxToggleSwitch.rootElement = {
            get: function () { return rxToggleSwitchElement; }
        };
        return Page.create(rxToggleSwitch);
    },

    /**
     * @deprecated Use {@link rxToggleSwitch.initialize} without arguments instead.
     * @memberof rxToggleSwitch
     * @description Page object representing the _first_ rxToggleSwitch object found on the page.
     * @type {rxToggleSwitch}
     */
    main: (function () {
        rxToggleSwitch.rootElement = {
            get: function () { return $('rx-toggle-switch'); }
        };
        return Page.create(rxToggleSwitch);
    })()
};
