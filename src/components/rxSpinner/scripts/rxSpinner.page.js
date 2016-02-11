var Page = require('astrolabe').Page;

exports.rxSpinner = Page.create({
    rxSpinnerElement: {
        get: function () {
            return element(by.id('rxSpinnerElement'));
        }
    }
});
