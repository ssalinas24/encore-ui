module.exports = {
    demoHtml: {
        src: 'demo/index.html',
    },
    karmaConfig: {
        src: ['grunt-tasks/options/karma.js'],
        devDependencies: true,
        ignorePath: '../../',
        fileTypes: {
            js: {
                block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                detect: {
                    js: /['"](.+)['"],/gi
                },
                replace: {
                    js: '\'{{filePath}}\','
                }
            }
        }
    }
};