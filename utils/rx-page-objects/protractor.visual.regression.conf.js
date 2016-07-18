var config = {

    baseUrl: 'http://localhost:9001',

    framework: 'mocha',

    snappit: {
        screenshotsDirectory: '../../screenshots',
        threshold: 5,
        defaultResolutions: [[768, 1024], [1024, 768]], // tablet
        cicd: {
            serviceAccount: {
                userName: 'comeatmebro',
                userEmail: 'comeatmebro@users.noreply.github.com',
                teamId: 442108
            },
            screenshotsRepo: 'https://github.com/rackerlabs/encore-ui-screenshots',
            projectRepo: 'https://github.com/rackerlabs/encore-ui'
        }
    },

    specs: [
        '../visual-regression/**/*.midway.js'
    ],

    capabilities: {
        browserName: 'firefox'
    },

    allScriptsTimeout: 30000,

    params: {},

    onPrepare: function () {
        expect = require('chai').use(require('chai-as-promised')).expect;
        demoPage = require('../demo.page.js');
        encore = require('./index');
        browser.driver.manage().window().setSize(1366, 768); // laptop
        screenshot = require('snappit-mocha-protractor');
    },

    mochaOpts: {
        enableTimeouts: false,
        reporter: 'spec',
        slow: 10000,
        ui: 'bdd'
    },

    seleniumAddress: 'http://localhost:4444/wd/hub'
};

exports.config = config;
