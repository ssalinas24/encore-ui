/*jshint node:true*/
var _ = require('lodash');
var rxBulkSelect = require('./index').rxBulkSelect;

/**
 * @function
 * @description rxBulkSelect exercises.
 * @exports exercise/rxBulkSelect
 * @returns {function} A function to be passed to mocha's `describe`.
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxBulkSelect} [options.instance={@link rxBulkSelect.initialize}] - Component to exercise.
 * @param {string[]} [options.batchActions=[]] - List of batch actions to exercise, will not run exercises if empty.
 * @param {number} [options.count=10] - Number of items in the table.
 * @example
 * describe('default exercises', encore.exercise.rxBulkSelect({
 *     instance: myPage.bulkSelect, // select one of many widgets from your page objects
 *     batchActions: ['Create', 'Read', 'Update', 'Delete']
 * }));
 */
exports.rxBulkSelect = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: rxBulkSelect.initialize(),
        count: 10,
        batchActions: []
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('has no selected rows, a hidden message, and a disabled batch actions link', function () {
            expect(component.anySelected()).to.eventually.be.false;
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        it('shows the message and enables the batch actions link when a row is selected', function () {
            component.row(0).select();
            expect(component.bulkMessage).to.eventually.match(/^1 \w+ is selected.$/);
            expect(component.isEnabled()).to.eventually.be.true;
        });

        it('updates the message as rows are selected', function () {
            component.selectByIndex([1, 2]);
            expect(component.bulkMessage).to.eventually.match(/^3 \w+s are selected.$/);
        });

        it('hides the message and disables the batch actions link when all rows are deselected', function () {
            component.deselectByIndex([0, 1, 2]);
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        it('selects all rows via the header checkbox', function () {
            var selExp = new RegExp('^' + options.count + ' \\w+s are selected.$');

            component.selectAllCheckbox.select();
            expect(component.allSelected()).to.eventually.be.true;
            expect(component.bulkMessage).to.eventually.match(selExp);
            expect(component.isEnabled()).to.eventually.be.true;
        });

        it('clears the selection via the header checkbox', function () {
            component.selectAllCheckbox.deselect();
            expect(component.anySelected()).to.eventually.be.false;
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        it('selects all rows via the button in the message', function () {
            var selExp = new RegExp('^' + options.count + ' \\w+s are selected.$');

            component.row(0).select();
            component.selectAll();
            expect(component.allSelected()).to.eventually.be.true;
            expect(component.selectAllCheckbox.isSelected()).to.eventually.be.true;
            expect(component.bulkMessage).to.eventually.match(selExp);
            expect(component.isEnabled()).to.eventually.be.true;
        });

        it('clears the selection via the button in the message', function () {
            component.clearSelections();
            expect(component.anySelected()).to.eventually.be.false;
            expect(component.selectAllCheckbox.isSelected()).to.eventually.be.false;
            expect(component.bulkMessage).to.eventually.be.null;
            expect(component.isEnabled()).to.eventually.be.false;
        });

        if (options.batchActions.length > 0) {
            it('should have a batch actions menu', function () {
                expect(component.batchActions.isPresent()).to.eventually.be.true;
            });

            it('should disable the batch actions menu when no items selected', function () {
                expect(component.batchActions.isEnabled()).to.eventually.be.false;
            });

            it('should enable the batch actions menu when an item is selected', function () {
                component.row(0).select();
                expect(component.batchActions.isEnabled()).to.eventually.be.true;
            });

            it('should expand the batch action menu when clicked', function () {
                component.batchActions.expand();
                expect(component.batchActions.isExpanded()).to.eventually.be.true;
            });

            it('should have the correct number of batch actions', function () {
                expect(component.batchActions.actionCount()).to.eventually.eql(options.batchActions.length);
            });

            _.each(options.batchActions, function (action) {
                it('should have the batch action "' + action + '"', function () {
                    expect(component.batchActions.hasAction(action)).to.eventually.be.true;
                });

                it('should be able to open the modal for batch action "' + action + '"', function () {
                    var modal = component.batchActions.action(action).openModal();
                    expect(modal.isDisplayed()).to.eventually.be.true;
                    modal.close();
                });
            });
        }
    };
};



/**
 * @function
 * @description rxCharacterCount exercises.
 * @exports exercise/rxCharacterCount
 * @returns {function} A function to be passed to mocha's `describe`.
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxCharacterCount} options.instance - Component to exercise.
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
            component = options.instance;
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



/**
 * @function
 * @description rxCollapse exercises.
 * @return {function} A function to be passed to mocha's `describe`.
 * @exports exercise/rxCollapse
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxCollapse} options.instance - Component to exercise.
 * @param {String} [options.title] - The title of the rxCollapse element.
 * @param {Boolean} [options.expanded=false] - Whether or not the rxCollapse element is currently expanded.
 * @example
 * describe('default exercises', encore.exercise.rxCollapse({
 *     instance: myPage.hiddenSection, // select one of many widgets from your page objects
 *     title: 'My Custom rxCollapse Element',
 *     expanded: true
 * }));
 */
exports.rxCollapse = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        title: undefined,
        expanded: false,
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should show the element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        it('should expand', function () {
            component.expand();
            expect(component.isCollapsed()).to.eventually.be.false;
            expect(component.isExpanded()).to.eventually.be.true;
        });

        it('should not expand again', function () {
            component.expand();
            expect(component.isCollapsed()).to.eventually.be.false;
            expect(component.isExpanded()).to.eventually.be.true;
        });

        it('should collapse', function () {
            component.collapse();
            expect(component.isCollapsed()).to.eventually.be.true;
            expect(component.isExpanded()).to.eventually.be.false;
        });

        it('should not collapse again', function () {
            component.collapse();
            expect(component.isCollapsed()).to.eventually.be.true;
            expect(component.isExpanded()).to.eventually.be.false;
        });

        it('should toggle', function () {
            component.toggle();
            expect(component.isCollapsed()).to.eventually.be.false;
            expect(component.isExpanded()).to.eventually.be.true;
        });

        if (!_.isUndefined(options.title)) {
            it('should show a custom title', function () {
                expect(component.title).to.eventually.equal(options.title);
            });
        } else {
            it('should show "See More" for the title', function () {
                component.collapse();
                expect(component.title).to.eventually.equal('See More');
            });

            it('should toggle between "See More" and "See Less"', function () {
                component.expand();
                expect(component.title).to.eventually.equal('See Less');
            });

            it('should toggle between "See Less" and "See More"', function () {
                component.collapse();
                expect(component.title).to.eventually.equal('See More');
            });
        }

        after(function () {
            // put it back according to the options
            options.expanded ? component.expand() : component.collapse();
        });

    };
};



/**
 * rxFieldName exercises.
 * @exports exercise/rxFieldName
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxFieldName} options.instance - Component to exercise.
 * @param {string} [options.visible=true] - Determines if the field name is visible.
 * @param {string} [options.present=true] - Determines if the field name is present in the DOM.
 * @param {string} [options.required=false] - Determines if the field name displays as a required field.
 */
exports.rxFieldName = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        visible: true,
        present: true,
        required: false
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        if (options.present === true) {
            it('should be present', function () {
                expect(component.isPresent()).to.eventually.be.true;
            });

            it('should have a symbol present', function () {
                expect(component.isSymbolPresent()).to.eventually.be.true;
            });
        } else {
            it('should not be present', function () {
                expect(component.isPresent()).to.eventually.be.false;
            });

            it('should not have a symbol present', function () {
                expect(component.isSymbolPresent()).to.eventually.be.false;
            });
        }

        if (options.required === true) {
            it('should have a symbol visible', function () {
                expect(component.isSymbolVisible()).to.eventually.be.true;
            });
        } else {
            it('should not have a symbol visible', function () {
                expect(component.isSymbolVisible()).to.eventually.be.false;
            });
        }
    };
};


var rxMetadata = require('./index').rxMetadata;

/**
 * rxMetadata exercises
 * @exports exercise/rxMetadata
 * @param {Object} [options] Test options. Used to build valid tests.
 * @param {rxMetadata} [instance={@link rxMetadata.initialize}] Component to exercise.
 * @param {Boolean} [options.present=true] Determines if the metadata is present in the DOM.
 * @param {Boolean} [options.visible=true] Determines if the metadata is visible.
 * @param {Object} [options.transformFns] - Transformation functions to be passed to rxMetadata.
 * @param {Object} [options.terms] The expected label text of each metadata entry.
 * @example
 * describe('metadata', encore.exercise.rxMetadata({
 *     instance: myPage.accountOverviewMetadata,
 *     transformFns: {
 *         'Signup Date': function (elem) {
 *             return elem.getText().then(function (text) {
 *                 return new Date(text).valueOf();
 *             });
 *         },
 *         'Overdue Balance': function (elem) {
 *             return elem.getText().then(encore.rxMisc.currencyToPennies);
 *         },
 *         'Current Due': function (elem) {
 *             return elem.getText().then(encore.rxMisc.currencyToPennies);
 *         },
 *         'Expiration Date' function (elem) {
 *             return elem.getText().then(function (text) {
 *                 return new Date(text).valueOf();
 *             });
 *         }
 *     },
 *     terms: {
 *         'Signup Date': new Date('March 1st, 2011').valueOf(),
 *         'Overdue Balance': 13256,
 *         'Current Due': 64400,
 *         'Expiration Date': new Date('January 1st, 2021').valueOf()
 *     }
 * }));
 */
exports.rxMetadata = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: rxMetadata.initialize(),
        present: true,
        visible: true,
    });

    return function () {
        var component;

        before(function () {
            component = rxMetadata.initialize(options.instance.rootElement, options.transformFns);
        });

        it('should ' + (options.present ? 'be' : 'not be') + ' present', function () {
            expect(component.isPresent()).to.eventually.eq(options.present);
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should have every term present and in the correct order', function () {
            expect(component.terms).to.eventually.eql(Object.keys(options.terms));
        });

        _.forEach(options.terms, function (definition, term) {
            it('should have the correct definition for ' + term, function () {
                if (_.isObject(definition) || _.isArray(definition)) {
                    expect(component.term(term)).to.eventually.eql(definition);
                } else {
                    expect(component.term(term)).to.eventually.equal(definition);
                }
            });
        });

    };
};

var rxMultiSelect = require('./index').rxMultiSelect;

/**
 * rxMultiSelect exercises.
 * @exports exercise/rxMultiSelect
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxMultiSelect} [options.instance={@link rxMultiSelect.initialize}] - Component to exercise.
 * @param {Object} [options.inputs=[]] - The options of the select input.
 * @param {Object} [options.disabled=false] - Determines if the multiselect is disabled.
 * @param {Object} [options.valid=true] - Determines if the multiselect is valid.
 * @example
 * describe('default exercises', encore.exercise.rxMultiSelect({
 *     instance: myPage.subscriptionList, // select one of many widgets from your page objects
 *     inputs: ['Texas', 'California', 'Virginia', 'Georgia']
 * }));
 */
exports.rxMultiSelect = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: rxMultiSelect.initialize(),
        inputs: [],
        disabled: false,
        valid: true
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should hide the menu initially', function () {
            expect(component.isOpen()).to.eventually.be.false;
        });

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', function () {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });

        if (options.disabled) {
            it('should not show the menu when clicked', function () {
                component.openMenu();
                expect(component.isOpen()).to.eventually.be.false;
            });
        } else {
            it('should show the menu when clicked', function () {
                component.openMenu();
                expect(component.isOpen()).to.eventually.be.true;
            });

            it('should select all options', function () {
                component.select(['Select All']);
                expect(component.selectedOptions).to.eventually.eql(['Select All'].concat(options.inputs));
                expect(component.preview).to.eventually.equal('All Selected');
            });

            it('should select no options', function () {
                component.deselect(['Select All']);
                expect(component.selectedOptions).to.eventually.be.empty;
                expect(component.preview).to.eventually.equal('None');
            });

            it('should select a single option', function () {
                var input = _.first(options.inputs);
                component.select([input]);
                expect(component.selectedOptions).to.eventually.eql([input]);
                expect(component.preview).to.eventually.equal(input);
            });

            if (options.inputs.length > 2) {
                it('should select multiple options', function () {
                    var inputs = options.inputs.slice(0, 2);
                    component.select(inputs);
                    expect(component.selectedOptions).to.eventually.eql(inputs);
                    expect(component.preview).to.eventually.equal('2 Selected');
                });
            }

            it('should select all options', function () {
                component.select(['Select All']);
                expect(component.selectedOptions).to.eventually.eql(['Select All'].concat(options.inputs));
                expect(component.preview).to.eventually.equal('All Selected');
            });

            it('should deselect all options', function () {
                component.deselect(['Select All']);
                expect(component.selectedOptions).to.eventually.be.empty;
                expect(component.preview).to.eventually.equal('None');
            });

            it('should hide the menu when backdrop is clicked', function () {
                component.rootElement.$('.backdrop').click();
                expect(component.isOpen()).to.eventually.be.false;
            });
        }//if options.disabled

        it('hides the menu when another element is clicked', function () {
            $('body').click();
            expect(component.isOpen()).to.eventually.be.false;
        });
    };
};


var rxOptionTable = require('./index').rxOptionTable;

/**
 * @description rxOptionTable exercises.
 * @exports exercise/rxOptionTable
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxOptionTable} [options.instance={@link rxOptionTable.initialize}] - Component to exercise.
 * @param {string} [options.visible=true] - Determines if the option table is visible
 * @param {string} [options.empty=false] - Determines if the option table is empty
 */
exports.rxOptionTable = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: rxOptionTable.initialize(),
        visible: true,
        empty: false
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        if (options.empty) {
            it('should be empty', function () {
                expect(component.isEmpty()).to.eventually.be.true;
            });

            it('should have a "table empty" error message', function () {
                expect(component.emptyMessage).to.eventually.not.be.null;
            });
        } else {
            it('should not be empty', function () {
                expect(component.isEmpty()).to.eventually.be.false;
            });

            it('should not have a "table empty" error message', function () {
                expect(component.emptyMessage).to.eventually.be.null;
            });
        }
    };
};



/**
 * rxPaginate exercises.
 * @exports exercise/rxPaginate
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxPaginate} options.instance - Component to exercise.
 * @param {String} [options.pages=6] - Estimated page size in the pagination widget.
 * @param {Number[]} [options.pageSizes=[50, 200, 350, 500]] - Page sizes to validate.
 * @param {Number} [options.defaultPageSize=50] - Default page size on page load.
 * @param {Number} [options.invalidPageSize=45] - For testing resizing pagination to invalid items per page.
 * @example
 * describe('default exercises', encore.exercise.rxPaginate({
 *     instance: myPage.pagination, // select one of many pagination instances from your page objects
 *     pages: 20 // will exercise full functionality at 6, limited functionality at 2
 * }));
 */
exports.rxPaginate = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        pages: 6,
        pageSizes: [50, 200, 350, 500],
        defaultPageSize: 50,
        invalidPageSize: 45
    });

    return function () {
        var pagination;

        before(function () {
            pagination = options.instance;
        });

        beforeEach(function () {
            encore.rxMisc.scrollToElement(pagination.rootElement, { positionOnScreen: 'bottom' });
        });

        if (options.pages > 1) {
            it('should navigate forward one page at a time', function () {
                pagination.next();
                expect(pagination.page).to.eventually.equal(2);
            });

            it('should navigate backwards one page at a time', function () {
                pagination.previous();
                expect(pagination.page).to.eventually.equal(1);
            });

            it('should navigate to the last page', function () {
                pagination.page.then(function (page) {
                    var firstPage = page;
                    pagination.last();
                    encore.rxMisc.scrollToElement(pagination.rootElement, { positionOnScreen: 'bottom' });
                    expect(pagination.page).to.eventually.be.above(firstPage);
                    pagination.first();
                });
            });
        }

        if (options.pages > 5) {
            it('should jump forward to page 6 using pagination', function () {
                pagination.page = 6;
                expect(pagination.page).to.eventually.equal(6);
            });

            it('should jump backward to page 2 using pagination', function () {
                pagination.page = 2;
                expect(pagination.page).to.eventually.equal(2);
                pagination.page = 1;
            });
        }

        it('should not allow navigating `next` the last page', function () {
            expect(pagination.next).to.throw(pagination.NoSuchPageException);
        });

        it('should allow attempting to navigate to the last page when already on the last page', function () {
            pagination.last();
            pagination.page.then(function (page) {
                pagination.last();
                expect(pagination.page).to.eventually.equal(page);
            });
        });

        it('should navigate to the first page', function () {
            pagination.first();
            expect(pagination.page).to.eventually.equal(1);
        });

        it('should not allow navigating `prev` the first page', function () {
            expect(pagination.previous).to.throw(pagination.NoSuchPageException);
        });

        it('should allow attempting to navigate to the first page when already on the first page', function () {
            pagination.first();
            expect(pagination.page).to.eventually.equal(1);
        });

        it('should have all available page sizes', function () {
            expect(pagination.pageSizes).to.eventually.eql(options.pageSizes);
        });

        it('should highlight the current items per page selection', function () {
            expect(pagination.pageSize).to.eventually.equal(options.defaultPageSize);
        });

        it('should list the lower bounds of the shown items currently in the table', function () {
            expect(pagination.shownItems.first).to.eventually.equal(1);
        });

        it('should list the upper bounds of the shown items currently in the table', function () {
            expect(pagination.shownItems.last).to.eventually.not.be.above(options.defaultPageSize);
        });

        it('should know the total number of pages without visiting it', function () {
            pagination.totalPages.then(function (totalPages) {
                pagination.last();
                encore.rxMisc.scrollToElement(pagination.rootElement, { positionOnScreen: 'bottom' });
                expect(pagination.page).to.eventually.equal(totalPages);
                pagination.first();
            });
        });

        if (options.pageSizes.length > 1) {

            it('should switch to a different items per page', function () {
                pagination.pageSize = options.pageSizes[1];
                expect(pagination.pageSize).to.eventually.equal(options.pageSizes[1]);
                pagination.pageSize = options.pageSizes[0];
            });

            if (options.pages > 1) {
                it('should put the user back on the first page after resizing the items per page', function () {
                    pagination.page = 2;
                    pagination.pageSize = options.pageSizes[1];
                    expect(pagination.page).to.eventually.equal(1);
                    pagination.pageSize = options.pageSizes[0];
                });
            }

        }

        it('should not fail to match the lower bounds of the shown items even if not displayed', function () {
            expect(pagination.shownItems.first).to.eventually.equal(1);
        });

        // execute only if the greatest items per page setting can contain all items
        if (_.first(options.pageSizes) * options.pages < _.last(options.pageSizes)) {

            it('should not fail to match the upper bounds of the shown items even if not displayed', function () {
                pagination.pageSize = _.last(options.pageSizes);
                pagination.shownItems.total.then(function (totalItems) {
                    expect(pagination.shownItems.last).to.eventually.equal(totalItems);
                    pagination.pageSize = options.defaultPageSize;
                });
            });
        }

        if (options.invalidPageSize) {

            it('should not allow selecting an unavailable items per page', function () {
                var fn = function () {
                    var pageSizeFn = pagination.__lookupSetter__('pageSize');
                    return protractor.promise.fulfilled(pageSizeFn.call(pagination, options.invalidPageSize));
                };
                expect(fn()).to.be.rejectedWith(pagination.NoSuchItemsPerPage);
            });

        }

    };
};



/**
 * @description rxRadio exercises
 * @exports exercise/rxRadio
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxRadio} options.instance - Component to exercise.
 * @param {Boolean} [options.disabled=false] - Whether or not the radio button is disabled at the start of the exercise.
 * @param {Boolean} [options.selected=false] - Whether or not the radio button is selected at the start of the exercise.
 * @param {Boolean} [options.visible=true] - Whether or not the radio button is visible at the start of the exercise.
 * @param {Boolean} [options.valid=true] - Whether or not the radio button is valid at the start of the exercise.
 */
exports.rxRadio = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        selected: false,
        visible: true,
        valid: true
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should be present', function () {
            expect(component.isPresent()).to.eventually.be.true;
        });

        it('should be a radio button', function () {
            expect(component.isRadio()).to.eventually.be.true;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should ' + (options.disabled ? 'be' : 'not be') + ' disabled', function () {
            expect(component.isDisabled()).to.eventually.eq(options.disabled);
        });

        it('should ' + (options.selected ? 'be' : 'not be') + ' selected', function () {
            expect(component.isSelected()).to.eventually.eq(options.selected);
        });

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', function () {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });
    };
};



/**
 * @description rxSearchBox exercises.
 * @see rxSearchBox
 * @exports exercise/rxSearchBox
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxSearchBox} options.instance - Component to exercise.
 * @param {Boolean} [options.disabled=false] - Determines if the search box is disabled at the start of the exercise.
 * @param {String} [options.placeholder='Search...'] - Expected placeholder value.
 * @example
 * describe('default exercises', encore.exercise.rxSearchBox({
 *     instance: myPage.searchText, // select one of many widgets from your page objects
 *     placeholder: 'Filter by name...'
 * }));
 */
exports.rxSearchBox = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        placeholder: 'Search...'
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should show the element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        if (options.placeholder) {
            it('should have a placeholder', function () {
                expect(component.placeholder).to.eventually.equal(options.placeholder);
            });
        }

        if (options.disabled) {
            describe('when disabled', function () {
                it('should not display the clear button', function () {
                    expect(component.isClearable()).to.eventually.be.false;
                });

                it('should not be searchable', function () {
                    expect(component.isSearchable()).to.eventually.be.false;
                });
            });//when disabled
        } else {
            describe('when enabled', function () {
                it('should be searchable', function () {
                    expect(component.isSearchable()).to.eventually.be.true;
                });

                it('should update the search term', function () {
                    component.term = 'testing';
                    expect(component.term).to.eventually.equal('testing');
                });

                it('should be clearable', function () {
                    expect(component.isClearable()).to.eventually.be.true;
                });

                it('should clear the search term', function () {
                    component.clear();
                    expect(component.term).to.eventually.equal('');
                });

                it('should not be clearable', function () {
                    expect(component.isClearable()).to.eventually.be.false;
                });
            });//when enabled
        }
    };
};



/**
 * @description rxSelect exercises.
 * @see rxSelect
 * @exports exercise/rxSelect
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxSelect} options.instance - Component to exercise.
 * @param {Boolean} [options.disabled=false] - Determines if the select is disabled
 * @param {Boolean} [options.visible=true] - Determines if the select is visible
 * @param {Boolean} [options.valid=true] - Determines if the select is valid
 * @param {String} [selectedText] - The expected selected text of the dropdown.
 */
exports.rxSelect = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        visible: true,
        valid: true
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should be present', function () {
            expect(component.isPresent()).to.eventually.be.true;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should ' + (options.disabled ? 'be' : 'not be') + ' disabled', function () {
            expect(component.isDisabled()).to.eventually.eq(options.disabled);
        });

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', function () {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });

        if (options.selectedText) {
            it('should have the correct selected option already chosen', function () {
                expect(component.selectedOption.text).to.eventually.equal(options.selectedText);
            });
        }
    };
};

var rxTags = require('./index').rxTags;

/**
 * rxTags exercises
 * @exports exercise/rxTags
 * @param {Object} [options] - Test options. Used to build valid tests.
 * @param {rxTags} [options.instance=rxTags.initialize()] - Component to Exercise.
 * @param {string} options.sampleText - A tag that can be added.
 * @example
 * describe('default exercises', encore.exercise.rxTags({
 *     instance: encore.rxTags.initialize('.demo rx-tags') // select one of many widgets on page
 *     sampleText: 'Tag text to use when creating and testing your tags'
 * }));
 */
exports.rxTags = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        sampleText: undefined
    });

    return function () {
        var component, tag, numTags;

        before(function () {
            if (options.instance !== undefined) {
                component = options.instance;
            } else {
                component = rxTags.initialize();
            }

            component.count().then(function (num) {
                numTags = num;
            });
        });

        if (!_.isUndefined(options.sampleText)) {
            describe('after adding tag', function () {
                before(function () {
                    tag = component.addTag(options.sampleText);
                });

                it('should have expected value', function () {
                    expect(tag.text).to.eventually.equal(options.sampleText);
                });

                it('should increment total tags by 1', function () {
                    expect(component.count()).to.eventually.equal(numTags + 1);
                });

                it('should not focus last tag', function () {
                    expect(tag.isFocused()).to.eventually.be.false;
                });

                describe('and clicking the tag X', function () {
                    before(function () {
                        tag.remove();
                    });

                    it('should no longer exist', function () {
                        expect(tag.exists()).to.eventually.be.false;
                    });

                    it('should decrement total tags by 1', function () {
                        expect(component.count()).to.eventually.equal(numTags);
                    });
                });
            });

            describe('after adding temporary tag for removal', function () {
                before(function () {
                    tag = component.addTag(options.sampleText);
                });

                describe('and typing backspace from input', function () {
                    before(function () {
                        component.sendBackspace();
                    });

                    it('should focus the last tag', function () {
                        expect(tag.isFocused()).to.eventually.be.true;
                    });

                    describe('and typing backspace with focused tag', function () {
                        before(function () {
                            tag.sendBackspace();
                        });

                        it('should no longer exist', function () {
                            expect(component.byText(options.sampleText).exists()).to.eventually.be.false;
                        });

                        it('should decrement count by 1', function () {
                            expect(component.count()).to.eventually.equal(numTags);
                        });
                    });
                });
            });
        }
    };
};



/**
 * @description rxToggleSwitch exercises.
 * @see rxToggleSwitch
 * @exports exercise/rxToggleSwitch
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxToggleSwitch} options.instance - Component to exercise.
 * @param {Boolean} [options.disabled=false] - Determines if the switch can be toggled.
 * @param {Boolean} [options.toggledAtStart=null] -
 * Beginning state of toggle switch. The value will be detected automatically if not given.
 * @param {Boolean} [options.toggledAtEnd=null]
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
        enabled: true,
        toggledAtStart: null, // begins 'OFF'
        toggledAtEnd: null // ends 'ON'
    });

    return function () {
        var component;
        var toggledAtStart;
        var toggledAtEnd;

        var positionAsText = function (isEnabled) {
            return isEnabled ? 'ON' : 'OFF';
        };

        var toggle = function () {
            return component.isToggled().then(function (toggled) {
                toggled ? component.toggleOff() : component.toggleOn();
            });
        };

        before(function () {
            component = options.instance;
            component.isToggled().then(function (isToggled) {
                // use option if available, otherwise use detected state
                toggledAtStart = _.isNull(options.toggledAtStart) ? isToggled : options.toggledAtStart;

                // use option if available, otherwise use inverse of toggledAtStart
                toggledAtEnd = _.isNull(options.toggledAtEnd) ? !toggledAtStart : options.toggledAtEnd;
            });
        });

        it('should show the element', function () {
            expect(component.isDisplayed()).to.eventually.be.true;
        });

        it('should' + (options.enabled ? '' : ' not') + ' be enabled', function () {
            expect(component.isEnabled()).to.eventually.equal(options.enabled);
        });

        if (!options.enabled) {
            it('should not change state when clicked', function () {
                toggle();
                expect(component.isToggled()).to.eventually.equal(toggledAtStart);
                expect(component.text).to.eventually.equal(positionAsText(toggledAtStart));
            });
        } else {
            it('should begin in the ' + positionAsText(toggledAtStart) + ' state', function () {
                expect(component.text).to.eventually.equal(positionAsText(toggledAtStart));
            });

            it('should change to ' + positionAsText(toggledAtEnd) + ' when clicked', function () {
                toggle();
                expect(component.isToggled()).to.eventually.equal(toggledAtEnd);
                expect(component.text).to.eventually.equal(positionAsText(toggledAtEnd));
            });

            it('should return to the ' + positionAsText(toggledAtStart) + ' when clicked again', function () {
                toggle();
                expect(component.isToggled()).to.eventually.equal(toggledAtStart);
                expect(component.text).to.eventually.equal(positionAsText(toggledAtStart));
            });
        }

    };
};



/**
 * @function
 * @description rxCheckbox exercises
 * @exports exercise/rxCheckbox
 * @returns {function} A function to be passed to mocha's `describe`.
 * @param {Object} options - Test options. Used to build valid tests.
 * @param {rxCheckbox} options.instance - Component to exercise.
 * @param {Boolean} [options.disabled=false] - Whether the checkbox is disabled at the start of the exercise
 * @param {Boolean} [options.selected=false] - Whether the checkbox is selected at the start of the exercise
 * @param {Boolean} [options.visible=true] - Whether the checkbox is visible at the start of the exercise
 * @param {Boolean} [options.valid=true] - Whether the checkbox is valid at the start of the exercise
 */
exports.rxCheckbox = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        disabled: false,
        selected: false,
        visible: true,
        valid: true
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should be present', function () {
            expect(component.isPresent()).to.eventually.be.true;
        });

        it('should be a checkbox', function () {
            expect(component.isCheckbox()).to.eventually.be.true;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', function () {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        it('should ' + (options.disabled ? 'be' : 'not be') + ' disabled', function () {
            expect(component.isDisabled()).to.eventually.eq(options.disabled);
        });

        it('should ' + (options.selected ? 'be' : 'not be') + ' selected', function () {
            expect(component.isSelected()).to.eventually.eq(options.selected);
        });

        if (options.disabled) {
            it('should not respond to selecting and unselecting', function () {
                component.isSelected().then(function (selected) {
                    selected ? component.deselect() : component.select();
                    expect(component.isSelected()).to.eventually.equal(selected);
                    // even though it "doesn't respond to selecting and unselecting"
                    // attempt to put it back anyway in case it did actually respond.
                    // that way nobody accidentally submits a swapped checkbox after
                    // running these exercises.
                    selected ? component.select() : component.deselect();
                    expect(component.isSelected()).to.eventually.equal(selected);
                });
            });
        } else {
            it('should respond to selecting and unselecting', function () {
                component.isSelected().then(function (selected) {
                    selected ? component.deselect() : component.select();
                    expect(component.isSelected()).to.eventually.not.equal(selected);
                    // exercises should never alter the state of a page.
                    // always put it back when you're done.
                    selected ? component.select() : component.deselect();
                    expect(component.isSelected()).to.eventually.equal(selected);
                });
            });
        }

        it('should ' + (options.valid ? 'be' : 'not be') + ' valid', function () {
            expect(component.isValid()).to.eventually.eq(options.valid);
        });
    };
};
