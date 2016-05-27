'use strict';

var _ = require('lodash');

var srcPath = require('path').join(__dirname, 'src');
var pageObjects = {};
var exercises = {};

/**
 * We're going to be iterating over every file in `src` for page object functionality.
 * This will take each `require`'d file and iterate over all it's exported members, and
 * add them to the `destination` (either the page objects, or the exercises).
 */
var addModule = (destination, moduleLocation) => {
    var module = require(moduleLocation);
    _.each(module, (functionality, exportedName) => destination[exportedName] = functionality);
    return destination;
};

require('fs').readdirSync(srcPath).forEach(file => {
    var destination = pageObjects;
    if (/.*exercise\.js$/.test(file)) {
        destination = exercises;
    }
    addModule(destination, `./src/${file}`);
});

pageObjects.exercise = exercises;
module.exports = pageObjects;
