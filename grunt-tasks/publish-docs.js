module.exports = function (grunt) {
    var description = '(re)Publish documentation without release.';

    grunt.registerTask('publishDocs', description, function () {
        grunt.task.run([
            'default', // build assets
            'gh-pages:ghPages' // push to GitHub Pages
        ]);
    });
};
