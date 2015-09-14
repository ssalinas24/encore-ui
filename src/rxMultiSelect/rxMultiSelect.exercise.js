var rxMultiSelect = require('./rxMultiSelect.page').rxMultiSelect;
var _ = require('lodash');

/**
   rxMultiSelect exercises.
   @exports encore.exercise.rxMultiSelect
   @param {Object} [options=] - Test options. Used to build valid tests.
   @param {rxMultiSelect} [options.instance=rxMultiSelect.main] - Component to exercise.
   @example
   ```js
   describe('default exercises', encore.exercise.rxMultiSelect({
       cssSelector: '.secondary-info rx-paginate', // select one of many widgets on page
   }));
   ```
 */
exports.rxMultiSelect = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        visible: true,
        disabled: false

       // instance: rxMultiSelect.main
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should start exercising defaults now');

    };
};

exports.rxMultiSelect = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        inputs: []
    });

    return function () {
        var component;

        before(function () {
            if (options.instance !== undefined) {
                component = options.instance;
            } else {
                component = rxMultiSelect.main;
            }

            if (options.cssSelector !== undefined) {
                console.warn('Deprecated exercise option `cssSelector` will be removed in favor of `instance`');
                component = rxMultiSelect.initialize($(options.cssSelector));
            }
        });

        it('hides the menu initially', function () {
            expect(component.isOpen()).to.eventually.be.false;
        });

        it('shows the menu when clicked', function () {
            component.openMenu();
            expect(component.isOpen()).to.eventually.be.true;
        });

        it('selects no options', function () {
            component.deselect(['Select All']);
            expect(component.selectedOptions).to.eventually.be.empty;
            expect(component.preview).to.eventually.equal('None');
        });

        it('selects a single option', function () {
            var input = _.first(options.inputs);
            component.select([input]);
            expect(component.selectedOptions).to.eventually.eql([input]);
            expect(component.preview).to.eventually.equal(input);
        });

        if (options.inputs.length > 2) {
            it('selects multiple options', function () {
                var inputs = options.inputs.slice(0, 2);
                component.select(inputs);
                expect(component.selectedOptions).to.eventually.eql(inputs);
                expect(component.preview).to.eventually.equal('2 Selected');
            });
        }

        it('selects all options', function () {
            component.select(['Select All']);
            expect(component.selectedOptions).to.eventually.eql(['Select All'].concat(options.inputs));
            expect(component.preview).to.eventually.equal('All Selected');
        });

        it('deselects all options', function () {
            component.deselect(['Select All']);
            expect(component.selectedOptions).to.eventually.be.empty;
            expect(component.preview).to.eventually.equal('None');
        });

        it('hides the menu when another element is clicked', function () {
            component.rootElement.element(by.xpath('../..')).click();
            expect(component.isOpen()).to.eventually.be.false;
        });

    };
};
