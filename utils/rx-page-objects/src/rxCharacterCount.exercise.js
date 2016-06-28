var _ = require('lodash');
var rxCharacterCount = require('./rxCharacterCount.page').rxCharacterCount;

/**
 * @function
 * @description rxCharacterCount exercises.
 * @exports exercise/rxCharacterCount
 * @returns {function} A function to be passed to mocha's `describe`.
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxCharacterCount} [options.instance={@link rxCharacterCount.initialize}] - Component to exercise.
 * @param {String} [options.cssSelector] - DEPRECATED: Fallback selector string to initialize widget with.
 * @param {Number} [options.maxCharacters=254] - The total number of characters allowed.
 * @param {Number} [options.nearLimit=10] - The number of remaining characters needed to trigger the "near-limit" class.
 * @param {Boolean} [options.ignoreInsignificantWhitespace=false] - Whether or not the textbox ignores leading and
 * trailing whitespace when calculating the remaining character count.
 * @param {Boolean} [options.highlight=false] - Determines if text over the limit should be highlighted.
 * @example
 * describe('default exercises', encore.exercise.rxCharacterCount({
 *     instance: myPage.submission // select one of many widgets from your page objects
 *     maxCharacters: 25,
 *     nearLimit: 12,
 *     ignoreInsignificantWhitespace: false
 * }));
 */
exports.rxCharacterCount = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        maxCharacters: 254,
        nearLimit: 10,
        ignoreInsignificantWhitespace: true,
        highlight: false
    });

    return function () {
        var component;

        before(function () {
            if (options.instance !== undefined) {
                component = options.instance;
            } else {
                component = rxCharacterCount.main;
            }

            if (options.cssSelector !== undefined) {
                console.warn('Deprecated exercise option `cssSelector` will be removed in favor of `instance`');
                component = rxCharacterCount.initialize($(options.cssSelector));
            }
        });

        it('should show element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        it('should update the remaining number of characters left when you insert text', function () {
            component.comment = 'Foo';
            expect(component.remaining).to.eventually.equal(options.maxCharacters - 3);
        });

        it('should erase all text and replace it with new text on update', function () {
            component.comment = 'Bar';
            expect(component.comment).to.eventually.equal('Bar');
        });

        it('should not set the near-limit class on an empty text box', function () {
            component.comment = '';
            expect(component.isNearLimit()).to.eventually.be.false;
        });

        it('should have ' + options.maxCharacters + ' remaining characters by default', function () {
            expect(component.remaining).to.eventually.equal(options.maxCharacters);
        });

        it('should not set the over-limit class on an empty text box', function () {
            expect(component.isOverLimit()).to.eventually.be.false;
        });

        var belowNearLimitLength = options.maxCharacters + 1 - options.nearLimit;
        it('should not set the near-limit class when ' + belowNearLimitLength + ' characters are entered', function () {
            component.comment = Array(belowNearLimitLength).join('a');
            expect(component.isNearLimit()).to.eventually.be.false;
        });

        var atNearLimitLength = options.maxCharacters + 2 - options.nearLimit;
        it('should set the near-limit class when ' + atNearLimitLength + ' characters are entered', function () {
            component.comment = Array(atNearLimitLength).join('a');
            expect(component.isNearLimit()).to.eventually.be.true;
        });

        var aboveNearLimitLength = options.maxCharacters + 3 - options.nearLimit;
        it('should set the near-limit class when ' + aboveNearLimitLength + ' characters are entered', function () {
            component.comment = Array(aboveNearLimitLength).join('a');
            expect(component.isNearLimit()).to.eventually.be.true;
        });

        var atLimit = options.maxCharacters + 1;
        it('should not set the over-limit class when ' + atLimit + ' characters are entered', function () {
            component.comment = Array(atLimit).join('a');
            expect(component.isOverLimit()).to.eventually.be.false;
        });

        it('should have zero remaining characters', function () {
            expect(component.remaining).to.eventually.equal(0);
        });

        var overLimit = options.maxCharacters + 2;
        it('should set the over-limit class when ' + overLimit + ' characters are entered', function () {
            component.comment = Array(overLimit).join('a');
            expect(component.isOverLimit()).to.eventually.be.true;
        });

        it('should display a negative number when the over-limit class is reached', function () {
            expect(component.remaining).to.eventually.equal(-1);
        });

        var whitespace = '    leading and trailing whitespace    ';
        var whitespaceLength = whitespace.length;
        var trimmedLength = whitespace.trim().length;
        if (options.ignoreInsignificantWhitespace) {
            it('should ignore insignificant leading and trailing whitespace', function () {
                component.comment = whitespace;
                expect(component.remaining).to.eventually.equal(options.maxCharacters - trimmedLength);
            });
        } else {
            it('should count insignificant leading and trailing whitespace', function () {
                component.comment = whitespace;
                expect(component.remaining).to.eventually.equal(options.maxCharacters - whitespaceLength);
            });
        }

        if (options.highlight) {
            describe('highlighting', function () {

                it('should not show any highlights on an empty text box', function () {
                    // A space is used because the `input` event is not fired by clear() or sendKeys('')
                    component.comment = ' ';
                    expect(component.overLimitText).to.eventually.equal('');
                });

                it('should not highlight any characters when ' + atLimit + ' characters are entered', function () {
                    component.comment = Array(atLimit).join('a');
                    expect(component.overLimitText).to.eventually.equal('');
                });

                it('should highlight a single characters when ' + overLimit + ' characters are entered', function () {
                    component.comment = Array(overLimit).join('a');
                    expect(component.overLimitText).to.eventually.equal('a');
                });

                it('should clear the over-limit text highlighting when the text is reduced', function () {
                    component.comment = 'a';
                    expect(component.overLimitText).to.eventually.equal('');
                });

            });
        }

        after(function () {
            component.comment = '';
        });

    };
};
