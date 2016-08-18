module.exports = {
    // Both dist and distTpls will contain the same content, to retain
    // backward compatibility
    dist: {
        options: {
            banner: '<%= config.banner %>\n',
            process: true
        },
        src: [], //src filled in by 'modules' task
        dest: '<%= config.dir.dist %>/<%= config.dist.fileName %>.js'
    },
    distTpls: { // TODO: Remove in 3.0.0
        options: {
            banner: '<%= config.banner %>\n',
            process: true
        },
        src: [], //src filled in by 'modules' task
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
