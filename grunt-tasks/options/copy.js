var _ = require('lodash');
var grunt = require('grunt');
var path = require('path');
var config = require('../util/config');

module.exports = {
    /* Process template files for building demo app. */
    demohtml: {
        options: {
            process: grunt.template.process
        },
        // files should be any that require processing
        // via grunt.template
        files: [{
            expand: true,
            cwd: 'demo/',
            src: [
                'index.html',
                'templates/**/*.html',
                'scripts/**/*.js' // only scripts we control
            ],
            dest: '<%= config.dir.docs %>'
        }]
    },
    /* Copy additional assets required for demo app. */
    demoassets: {
        files: [{
            expand: true,
            cwd: 'demo/',
            src: [
                'css/*.css',
                'images/**/*',
                'bower_components/**/*'
            ],
            dest: '<%= config.dir.docs %>'
        }]
    },
    /* Copy polyfils for demo app. */
    demopolyfills: {
        files: [
            {
                src: 'utils/browser-helpers.js',
                dest: '<%= config.dir.docs %>/scripts/browser-helpers.js'
            }
        ]
    },
    /* Copy examples for demo app. */
    demoExamples: {
        files: [
            {
                flatten: true,
                expand: true,
                src: [
                    'src/**/examples/*',
                    'demo/examples/*'
                ],
                dest: '<%= config.dir.docs %>/examples/'
            }
        ]
    },
    coverage: {
        files: [{
            expand: true,
            src: [
                'Phantom*/**/*'
            ],
            cwd: 'coverage/',
            dest: '<%= config.dir.docs %>/coverage/',
            // remove 'Phantom ...' from path
            rename: function (dest, src) {
                var templatePath = src.split(path.sep) // convert src to array
                    .slice(1) // remove the first directory ('Phantom ...')
                    .join(path.sep); // convert back to path string

                // return dest + the rest of the path as a string
                return dest + templatePath;
            }
        }]
    },
    rxPageObjectsDocs: {
        expand: true,
        cwd: 'utils/rx-page-objects/doc/',
        src: '**',
        dest: '<%= config.dir.build %>/rx-page-objects/'
    },
    bower: {
        files: [
            {
                expand: true,
                cwd: '<%= config.dir.dist %>/',
                src: '**/*',
                dest: '<%= config.dir.bower %>/',
                // remove version number from file names
                rename: function (dest, src) {
                    // will catch the following
                    // -0.10.11.min.js
                    // -0.9.22.css
                    // -0.1.1.js
                    // -10.11.11.min.js
                    var strippedVersion = src.replace(config.regex.version, '');

                    return dest + strippedVersion;
                }
            }, {
                src: 'bower.json',
                dest: '<%= config.dir.bower %>/bower.json'
            }, {
                expand: true,
                cwd: '<%= config.dir.exportableStyles %>/',
                src: '*.less',
                dest: '<%= config.dir.bower %>/less/'
            }
        ]
    }
};
