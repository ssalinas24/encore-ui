var Page = require('astrolabe').Page;
var URL = require('../node_modules/astrolabe/lib/astrolabe/utils/url'); // http://i.imgur.com/iCWOGrq.gif
var _ = require('lodash');

module.exports = Page.create({

    /**
     * @override
     * @description I needed this to *always* go to the designated component demo page
     * while using a `debug=true` flag. This exposes all facets of a demo component page,
     * which is required to reach full test coverage. For normal users, they shouldn't have
     * to see all eight or ten examples of a component -- one or two is sufficient. However, this
     * function over ride keeps all typical `.go` functionality intact from the latest release.
     * See the source for a link to the exact commit SHA that I borrowed the `.go` functionality from.
     */
    go: {
        value: function () {
            var url = new URL('');

            // stuplum/astrolabe/blob/963eb5001d7d3ce019a6ed66cec62ba2bb0d316b/lib/astrolabe/page.js#L10-L13
            _.each(arguments, function (arg) {
                if(_.isString(arg)) { url.addPath(arg); }
                if(_.isObject(arg)) { url.addParams(arg); }
            });

            url.addParams({ debug: true });

            browser.get(url.url);
        }
    },

    storeTokenButton: {
        get: function () {
            return $('button.storeToken');
        }
    },

    clearTokenButton: {
        get: function () {
            return $('button.clearToken');
        }
    }
});
