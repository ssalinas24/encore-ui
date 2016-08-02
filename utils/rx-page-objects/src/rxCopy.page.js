'use strict';

var Tooltip = require('./tooltip.page').Tooltip;

/* CSS HIERARCHY
 * ----------------------------------------
 * rx-copy <-- rxCopyElement for constructor
 *   div.rxCopy__wrapper
 *     span.rxCopy__text
 *     div.rxCopy__action (ng-click, tooltip anchor)
 *       i.fa-clipboard (waiting)
 *       i.fa-check (success)
 *       i.fa-times (fail)
 *
 * STATES:
 * ----------------------------------------
 * - waiting
 * - success/fail
 */


/**
 * @class
 */
class rxCopy {
    /**
     * @param {ElementFinder} rxCopyElement
     * ElementFinder to be transformed into an rxCopy page object
     */
    constructor (rxCopyElement) {
        this.rootElement = rxCopyElement;

        // "Private" (undocumented) selectors
        this.eleAction = this.rootElement.$('.rxCopy__action');
        this.eleText = this.rootElement.$('.rxCopy__text');
        this.icoCheck = this.rootElement.$('.fa-check');
        this.icoClipboard = this.rootElement.$('.fa-clipboard');
        this.icoTimes = this.rootElement.$('.fa-times');
    }//constructor

    /**
     * @description (READ-ONLY)
     * Tooltip associated with rxCopy element
     * @type {Tooltip}
     */
    get tooltip () {
        this._hoverOverAction();
        // instantiate a new Tooltip from the newly added DOM element
        return new Tooltip(this.rootElement.$('.rxCopy__tooltip'));
    }//get tooltip()

    /**
     * @description (READ-ONLY) Plain text to copy.
     * @returns {Promise<String>}
     */
    getText () {
        return this.eleText.getText();
    }

    /**
     * @description Trigger a click on the icon
     * @example
     * var element = new encore.rxCopy($('.myCopyText'));
     * element.copy();
     *
     * @returns {Promise}
     */
    copy () {
        this._hoverOverAction();
        return this.eleAction.click();
    }//copy()

    /**
     * @description Whether or not the element is waiting for interaction
     * @returns {Promise<Boolean>}
     */
    isWaiting () {
        return this.icoClipboard.isPresent();
    }

    /**
     * @description Whether or not the copy succeeded.
     * @returns {Promise<Boolean>}
     */
    isSuccessful () {
        return this.icoCheck.isPresent();
    }

    /**
     * @description Whether or not the copy failed.
     * @returns {Promise<Boolean>}
     */
    isFailed () {
        return this.icoTimes.isPresent();
    }

    /**
     * @private
     * @description Perform a mouse hover over the clickable action element.
     */
    _hoverOverAction () {
        browser.actions().mouseMove(this.eleAction).perform();
    }
}//rxCopy

exports.rxCopy = rxCopy;
