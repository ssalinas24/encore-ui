var path = require('path');
var _ = require('lodash');

module.exports = function (grunt) {
    /**
     * @description Group asset globs by their example name
     *
     * @param {Object} assets
     * memoized object for use in a `reduce()` callback
     * @param {String} assetPath
     * Path to a source file that belongs to an example
     *
     * @returns {Object}
     * Object whose values are file paths associated with an example.
     *
     * Should result in something like:
     * 'foo.bar': [
     *     '/path/to/foo.bar.html',
     *     '/path/to/foo.bar.js',
     *     '/path/to/foo.bar.less'
     * ]
     */
    function groupAssets (assets, assetPath) {
        var exampleName = path.basename(assetPath, path.extname(assetPath));

        if (!assets[exampleName]) {
            assets[exampleName] = [];
        }

        assets[exampleName].push(assetPath);

        return assets;
    }

    /**
     * @description
     * Build JSON object containing raw source code for markup, JavaScript,
     * and LESS.
     *
     * @returns {Object}
     * Output should look something like this:
     * {
     *     'foo.bar': {
     *         markup: '<h1>Hi, I'm FooBar Markup</h1>'
     *     }
     * }
     *
     * **NOTE:** JavaScript and LESS are not always present
     */
    function buildExamples () {
        var examples = {};

        var metadata = grunt.file.expand([
            'src/**/examples/*',
            'demo/examples/*'
        ]).reduce(groupAssets, {});

        // Iterate over grouped file paths to build example objects that contain
        // markup, javascript, and less content for loading via rxExample
        //
        // Objects should result in an something that looks like:
        // {
        //   markup: '...',
        //   javascript: '...', // Optional
        //   less: '...' // Optional
        // }
        for (key in metadata) {
            if (examples[key]) {
                throw new Error(`Examples for '${key}' already defined.`);
            }

            var example = {};

            metadata[key].forEach(function (filePath) {
                var fileContent = grunt.file.read(filePath);
                var ext = path.extname(filePath);

                switch (ext) {
                    case '.html':
                        example.markup = fileContent;
                        break;
                    case '.js':
                        example.javascript = fileContent;
                        break;
                    case '.less':
                        example.less = fileContent;
                        break;
                    default:
                        throw new Error(`Unknown file extension: ${ext}`);
                        break;
                }
            });

            examples[key] = example;
        }

        return examples;
    }//findExamples

    grunt.registerTask('examples', 'Auto-discover EncoreUI examples and load their assets into a JSON file.', function () {
        grunt.config('config.examples', buildExamples());
    });
};
