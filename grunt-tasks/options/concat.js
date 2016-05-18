var removeFromIndex = [
    '/*jshint node:true*/',
    'var _ = require(\'lodash\');',
    'var moment = require(\'moment\');',
    'var Page = require(\'astrolabe\').Page;\n'
];

var removeFromExercises = [
    '/*jshint node:true*/',
    'var _ = require(\'lodash\');'
];

module.exports = {
    dist: {
        options: {
            banner: '<%= config.meta.banner %><%= config.meta.modules %>\n'
        },
        src: [], //src filled in by build task
        dest: '<%= config.dir.dist %>/<%= config.dist.fileName %>.js'
    },
    distTpls: {
        options: {
            banner: '<%= config.meta.banner %><%= config.meta.all %>\n<%= config.meta.tplmodules %>\n'
        },
        src: [], //src filled in by build task
        dest: '<%= config.dir.dist %>/<%= config.dist.fileNameTpl %>.js'
    },
    rxPageObjects: {
        options: {
            // Replace all third-party requires with a single one up top
            banner: removeFromIndex.join('\n'),
            footer: '\nexports.exercise = require(\'./exercise\');',
            process: function (src) {
                removeFromIndex.forEach(function (toRemove) {
                    // a regex is faster, but this is less work for me
                    src = src.replace(toRemove, '');
                });
                return src;
            }
        },
        src: ['src/**/*.page.js'],
        dest: 'utils/rx-page-objects/index.js'
    },
    rxPageObjectsExercises: {
        options: {
            // Replace all third-party requires with a single one up top
            banner: removeFromExercises.join('\n'),
            process: function (src) {
                // replace all exercise require statements from src/ directory to index.js (published version)
                src = src.replace(/require\('\.\/(.\w+\.page)'\)(?:\.js)?/g, 'require(\'./index\')');
                removeFromExercises.forEach(function (toRemove) {
                    // a regex is faster, but this is less work for me
                    src = src.replace(toRemove, '');
                });
                return src;
            }
        },
        src: [
            'src/**/*.exercise.js',
        ],
        dest: 'utils/rx-page-objects/exercise.js'
    },
    tmpDemosLess: {
        options: {
            banner: '@import (reference) "vars";\n\n'
        },
        src: [
            'src/**/docs/*.demo.less'
        ],
        dest: '<%= config.tmp.less.demos %>'
    },
    tmpExamplesLess: {
        options: {
            banner: '.example {\n',
            footer: '\n}//.example'
        },
        src: [
            'src/**/examples/*.less',
            'demo/examples/*.less'
        ],
        dest: '<%= config.tmp.less.examples %>',
    },
    tmpEncoreLess: {
        // The `less` task can't properly create a source map when multiple input
        // files are present. We concat them all into a temp file here, and it
        // can work from that instead
        files: [
            /* Non-responsive Styles */
            {
                src: [
                    'src/**/*.less',
                    '!src/styles/*.less',
                    // exclude responsive, handled below
                    '!src/components/layout/responsive.less'
                ],
                dest: '<%= config.tmp.less.encore %>'
            },
            /* Responsive Styles */
            {
                src: [
                    'src/**/*.less',
                    '!src/styles/*.less'
                ],
                dest: '<%= config.tmp.less.encoreResp %>'
            }
        ]
    }
};
