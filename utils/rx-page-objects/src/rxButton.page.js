var Page = require('astrolabe').Page;

/**
 * @namespace
 * @deprecated rxButton will be removed in EncoreUI 4.0.0
 */
var rxButton = {};

exports.rxButton = {
    initialize: function (rxButtonElement) {
        console.warn (
            'DEPRECATED: rxButton will be removed in EncoreUI 4.0.0'
        );
        rxButton.rootElement = {
            get: function () { return rxButtonElement; }
        };
        return Page.create(rxButton);
    }
};
