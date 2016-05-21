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
