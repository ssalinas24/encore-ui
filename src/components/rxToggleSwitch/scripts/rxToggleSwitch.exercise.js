var _ = require('lodash');

/**
 * @description rxToggleSwitch exercises.
 * @see rxToggleSwitch
 * @exports exercise/rxToggleSwitch
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxToggleSwitch} options.instance - Component to exercise.
 * @param {Boolean} [options.disabled=false] - Determines if the switch can be toggled.
 * @param {Boolean} [options.enabledAtStart=null] -
 * Beginning state of toggle switch. The value will be detected automatically if not given.
 * @param {Boolean} [options.enabledAtEnd=null]
 * End state of toggle switch. The value will be detected automatically if not given.
 * @example
 * describe('default exercises', encore.exercise.rxToggleSwitch({
 *     instance: myPage.emailPreference // select one of many widgets from your page objects
 * }));
 */
exports.rxToggleSwitch = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        enabledAtStart: null, // begins 'OFF'
        enabledAtEnd: null // ends 'ON'
    });

    return function () {
        var component;
        var enabledAtStart;
        var enabledAtEnd;

        var getText = function (isEnabled) {
            return isEnabled ? 'ON' : 'OFF';
        };

        var toggle = function () {
            return component.isEnabled().then(function (enabled) {
                enabled ? component.disable() : component.enable();
            });
        };

        before(function () {
            component = options.instance;
            component.isEnabled().then(function (isEnabled) {
                // use option if available, otherwise use detected state
                enabledAtStart = _.isNull(options.enabledAtStart) ? isEnabled : options.enabledAtStart;

                // use option if available, otherwise use inverse of enabledAtStart
                enabledAtEnd = _.isNull(options.enabledAtEnd) ? !enabledAtStart : options.enabledAtEnd;
            });
        });

        it('should show the element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        if (options.disabled) {
            it('does not change state when clicked', function () {
                toggle();
                expect(component.isEnabled()).to.eventually.equal(enabledAtStart);
                expect(component.text).to.eventually.equal(getText(enabledAtStart));
            });
        } else {
            it('begins in the ' + getText(enabledAtStart) + ' state', function () {
                expect(component.text).to.eventually.equal(getText(enabledAtStart));
            });

            it('changes to ' + getText(enabledAtEnd) + ' when clicked', function () {
                toggle();
                expect(component.isEnabled()).to.eventually.equal(enabledAtEnd);
                expect(component.text).to.eventually.equal(getText(enabledAtEnd));
            });

            it('returns to the ' + getText(enabledAtStart) + ' when clicked again', function () {
                toggle();
                expect(component.isEnabled()).to.eventually.equal(enabledAtStart);
                expect(component.text).to.eventually.equal(getText(enabledAtStart));
            });
        }

    };
};
