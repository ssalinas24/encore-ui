var path = require('path');
var _ = require('lodash');

module.exports = function (grunt) {
    var markdown = require('marked');

    function enquote (str) {
        return '\'' + str + '\'';
    }

    //Common encore.ui module containing all modules for src and templates
    //findModule: Adds a given module to config
    function findModule (category, name) {
        if (_.isUndefined(name)) {
            return;
        }

        function parseMarkdown (text) {
            return markdown(text);
        }


        var globBase = ['src', category, name].join('/');
        var _srcFiles = grunt.file.expand([
            globBase + '.module.js', // category manifests
            globBase + '/' + name + '.module.js', // component manifests (legacy)
            globBase + '/scripts/!(*.spec).js' // Load additional scripts
        ]);
        var _tplFiles = grunt.file.expand([ globBase + '/*.tpl.html' ]);
        var _tplJsFiles = grunt.file.expand([ 'templates/' + name + '/templates/*.html' ]);
        var _docMdFiles = grunt.file.expand(globBase + '/*.md');
        var _docJsFiles = grunt.file.expand([
            globBase + '/docs/*.js',
            globBase + '/docs/examples/**/*.js'
        ]);
        var _docHtmlFiles = grunt.file.expand(globBase + '/docs/*.html');
        var _docLessFiles = grunt.file.expand(globBase + '/*.less');

        var _moduleName = ['encore', 'ui'];
        if (category == 'components') {
            _moduleName.push(name);
        } else {
            _moduleName.push(category);
        }

        // Fetch Module Metadata
        var metadataJson = globBase + '/' + name + '.meta.json';
        var metadata = {};
        if (grunt.file.exists(metadataJson)) {
            metadata = grunt.file.readJSON(metadataJson);
        }

        // Using Metadata as a base, add on additional information
        var module = _.defaults(metadata, {
            name: name,
            moduleName: enquote(_moduleName.join('.')),
            category: category,
            description: '',
            stability: 'experimental', // should be set by <module>.meta.json
            keywords: [], // should be set by <module>.meta.json
            displayName: name, // should be set by <module>.meta.json
            isLegacy: false, // TODO: to be removed with last of components
            hasApi: true,
            isCategory: (category == name),
            srcFiles: _srcFiles,
            tplFiles: _tplFiles,
            tplJsFiles: _tplJsFiles,
            docs: { // TODO: replace with <rx-example>
                md: _docMdFiles.map(grunt.file.read).map(parseMarkdown).join('\n'),
                js: _docJsFiles.map(grunt.file.read).join('\n'),
                html: _docHtmlFiles.map(grunt.file.read).join('\n'),
                less: _docLessFiles.map(grunt.file.read).join('\n')
            }
        });

        grunt.config('config.modules', grunt.config('config.modules').concat(module));
    }//findModule

    grunt.registerTask('modules', 'Auto-discover EncoreUI modules and load their details into config', function () {
        // Iterate over source modules to build config.modules
        grunt.file
            .expand({ cwd: 'src/' }, ['*/*.module.js', '**/*.meta.json'])
            .forEach(function (modPath) {
                var pathArr = modPath.split('/');

                // accounts for src/:category/:module/<module>.module.js
                var category = pathArr[0];
                var mod = pathArr[1];

                // account for src/:category/<category>.module.js
                var splitMod = mod.split('.');
                if (splitMod.length > 0) {
                    mod = splitMod[0];
                }

                findModule(category, mod);
            });

        /* sorted modules array for various filtering */
        var sortedModules = _.sortBy(grunt.config('config.modules'), function (mod) {
            return mod.name.toLowerCase();
        });

        var categoryModules = _.filter(sortedModules, { isCategory: true });
        var nonCategoryModules = _.filter(sortedModules, { isCategory: false });
        var modules = categoryModules.concat(nonCategoryModules);

        /* Determine modules with source files */
        // used by config.meta.(modules|all)
        var jsModules = _.filter(modules, function (module) {
            return module.srcFiles.length > 0;
        });
        grunt.config('config.srcModules', _.pluck(jsModules, 'moduleName'));

        /* Determine modules with templates */
        // used by config.meta.tplmodules
        var tplModules = _.pluck(modules, 'tplJsFiles').filter(function (tpls) {
            return tpls.length > 0;
        });
        grunt.config('config.tplModules', tplModules.map(function (tpls) {
            // remove first two directories from template paths
            return tpls.map(function (tplPath) {
                var templatePath = tplPath.split(path.sep) // convert path string to array
                    .slice(2) // ignore first two directories
                    .join(path.sep); // convert back to path string

                // return a single-quoted string
                return enquote(templatePath);
            });
        }));

        // Set the concat task to concatenate the given src modules
        var srcFiles = _.pluck(modules, 'srcFiles'); // OK

        // Prepend override files in order to achieve custom functionality outside of the encore ecosystem
        srcFiles = [ 'src/domainOverride.js' ].concat(srcFiles);


        grunt.config('concat.dist.src', grunt.config('concat.dist.src').concat(srcFiles));

        // Set the concat-with-templates task to concat the given src & tpl modules
        var tplJsFiles = _.pluck(modules, 'tplJsFiles'); // OK
        grunt.config('concat.distTpls.src', grunt.config('concat.distTpls.src').concat(srcFiles).concat(tplJsFiles));
    });
};
