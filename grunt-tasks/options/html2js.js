var path = require('path');

var srcDirs = [
    'src/atoms',
    'src/components',
    'src/molecules',
    'src/elements'
];
var exportFiles = srcDirs.map(function (dir) {
    return {
        expand: true,
        cwd: dir,
        src: ['**/templates/*.html'],
        dest: 'templates'
    };
});

module.exports = {
    dist: {
        options: {
            module: false, // no bundle module for all the html2js templates
            htmlmin: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeComments: true
            },
            // remove folder name from path
            rename: function (moduleName) {
                return moduleName.split(path.sep) // convert path to array
                    .slice(2) // ignore first two directories (:category/:name)
                    .join(path.sep); // convert back to path string
            }
        },
        files: exportFiles
    }
};
