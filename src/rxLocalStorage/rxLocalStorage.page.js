var Page = require('astrolabe').Page;

exports.rxLocalStorage = Page.create({

    setItem: {
        value: function (key, value) {
            var command = function (key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            };
            this.driver.executeScript(command, key, value);
        }
    },

    getItem: {
        value: function (key) {
            var command = function (key) {
                return JSON.parse(localStorage.getItem(key));
            };
            return this.driver.executeScript(command, key);
        }
    },

    removeItem: {
        value: function (key) {
            var command = function (key) {
                localStorage.removeItem(key);
            };
            this.driver.executeScript(command, key);
        }
    },

    exists: {
        value: function (key) {
            var command = function (key) {
                return localStorage.getItem(key) !== null;
            };
            return this.driver.executeScript(command, key);
        }
    }

});
