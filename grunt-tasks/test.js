module.exports = function (grunt) {
    grunt.registerTask('test', 'Run tests', function (mode) {
        if (mode === 'debug') {
            grunt.task.run('karma:debug');
        } else {
            grunt.task.run('karma:single');
        }
    });
};
