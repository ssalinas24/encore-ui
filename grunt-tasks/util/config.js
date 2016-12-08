module.exports = {
    dir: {
        app: 'src',
        bower: 'bower',
        build: 'build',
        dist: '<%= config.dir.docs %>/dist', // used for js/css files pushed to CDN/bower
        docs: 'build/1.x', // used for demo, coverage, and jsdocs files to go to gh-pages
        exportableStyles: '<%= config.dir.app %>/styles',
    },
    /* BOWER OUTPUT/DISTRIBUTION */
    dist: {
        fileName: 'encore-ui-<%= pkg.version %>',
        fileNameResp: 'encore-ui-resp-<%= pkg.version %>',
        fileNameTpl: 'encore-ui-tpls-<%= pkg.version %>'
    },
    server: {
        hostname: 'localhost',
        port: 9001
    },
    latestTag: '', // filled in by shipit task
    moduleName: 'encore.ui',
    modules: [], // filled in by modules task
    examples: {}, // filled in by examples task
    dependencies: ['cfp.hotkeys', 'ui.bootstrap'],
    meta: {
        modules: 'angular.module(\'<%= config.moduleName %>\', [<%= config.srcModules %>, ' +
            '\'<%= config.dependencies.join("\',\'") %>\']);',
        tplmodules: 'angular.module(\'<%= config.moduleName %>.tpls\', [<%= config.tplModules %>]);',
        all: 'angular.module(\'<%= config.moduleName %>\', ' +
            '[\'<%= config.moduleName %>.tpls\', <%= config.srcModules %>, ' +
            '\'<%= config.dependencies.join("\',\'") %>\']);',
        banner: [
            '/*',
            ' * <%= pkg.name %>',
            ' * <%= pkg.homepage %>\n',
            ' * Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
            ' * License: <%= pkg.license %>',
            ' */\n'
        ].join('\n')
    },
    css: {
        demoApp: 'css/demoApp.css',
        demos: 'css/demos.css',
        examples: 'css/examples.css',
        map: {
            encore: '<%= config.dist.fileName %>.css.map',
            encoreResp: '<%= config.dist.fileNameResp %>.css.map'
        }
    },
    tmp: {
        dir: 'tmp',
        less: {
            dir: '<%= config.tmp.dir %>/less',
            encore: '<%= config.tmp.less.dir %>/encore-ui.less',
            encoreResp: '<%= config.tmp.less.dir %>/encore-ui-resp.less',
            demos: '<%= config.tmp.less.dir %>/demos.less',
            examples: '<%= config.tmp.less.dir %>/examples.less'
        }
    },
    regex: {
        version: /-(?:\d+\.){2}\d+(?:-\d+)*/g // http://www.regexr.com/395kl
    }
};
