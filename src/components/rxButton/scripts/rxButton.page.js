var Page = require('astrolabe').Page;

var rxButton = {};

exports.rxButton = {
    initialize: function (rxButtonElement) {
        rxButton.rootElement = {
            get: function () { return rxButtonElement; }
        };
        return Page.create(rxButton);
    }
};
