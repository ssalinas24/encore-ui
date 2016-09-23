module.exports = function (grunt) {
    grunt.registerTask('shipit', 'Ships code to prod', function (versionType, arg) {
        var validTypes = ['major', 'minor', 'patch', 'premajor', 'preminor', 'prepatch', 'prerelease'];
        var tasks = [];

        if (validTypes.indexOf(versionType) > -1) {

            if (arg === 'hotfix' && versionType !== 'patch') {
                grunt.fatal('A hotfix release can only have a `patch` type. `major` and `minor` are not allowed');
            }
            // increment the version
            tasks.push('bump-only:' + versionType);

            // increment version in readme
            tasks.push('replace:readme');

            // build the code
            tasks.push('default');

            // commit version increment
            tasks.push('bump-commit');

            // push rx-page-objects to npm
            if (arg === 'hotfix') {
                tasks.push('rxPageObjects:hotfix');
            } else {
                tasks.push('rxPageObjects');
            }

            if (arg === 'updateDemo') {
                // update gh-pages branch, i.e. the demo app
                tasks.push('gh-pages:ghPages');
            }

            // update bower repo
            tasks.push('bower');

            // shipit squirrel
            tasks.push('squirrel');

            grunt.task.run(tasks);
        } else {
            grunt.fatal('Must pass in version type major/minor/patch. E.g. `grunt shipit:patch`');
        }
    });
};
