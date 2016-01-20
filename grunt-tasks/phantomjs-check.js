var _ = require('lodash');

module.exports = function (grunt) {

    var phantomjs = require('grunt-lib-phantomjs').init(grunt);
    var hasErrors = false;

    phantomjs.on('error.onError', function () {
        hasErrors = true;
        grunt.log.error('Javascript errors were present on the Demo page');
        phantomjs.halt();
    });

    phantomjs.on('console', function (msg) {
        hasErrors = true;
        grunt.log.error('Console messages were present on the Demo page: ' + msg);
        phantomjs.halt();
    });

    phantomjs.on('fail.load', function(url) {
        grunt.log.error('PhantomJS unable to load URL.' + url);
        hasErrors = true;
        phantomjs.halt();
    });

    phantomjs.on('fail.timeout', function() {
        phantomjs.halt();
    });


    var spawn = function (done, encoreCategory, encoreModule) {
        var urlString = 'http://<%= config.server.hostname %>';
        if (grunt.config('config.server.port')) {
            urlString += ':<%= config.server.port %>/';
        }
        var url = grunt.template.process(urlString);
        if (!_.isUndefined(encoreModule)) {
            url += '#/' + encoreCategory +  '/' + encoreModule;
        }
        grunt.log.writeln('Checking ' + url + ' for console errors.');
        phantomjs.spawn(url, {
            options: {
                timeout: 5000,
            },
            done: function(err) {
                if (!(err || hasErrors)) {
                    grunt.log.ok();
                }
                done(err || !hasErrors);
            }
        });
    };

    grunt.registerTask('phantomjs-check',
        'Check demo page for Javascript errors',
        function (mode, categoryName, moduleName) {
            if (mode === 'allModules') {
                var tasks = [];
                grunt.task.requires('modules');
                // This first task loads up the front page of the Demo
                tasks.push('phantomjs-check:oneModule');

                _.forEach(grunt.config('config.demoModules'), function (module) {
                    tasks.push('phantomjs-check:oneModule:' + module.category + ':' + module.name);
                });
                grunt.log.ok('Configured modules for testing');
                grunt.task.run(tasks);
            } else if (mode === 'oneModule') {
                var done = this.async();
                spawn(done, categoryName, moduleName);
            }
        });
};
