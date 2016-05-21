// Basic template description.
exports.description = 'Create an EncoreUI component\'s page object, end to end test, and exercise file';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Will ensure you have new test code styled in the proper way';

// The actual init template.
exports.template = function (grunt, init, done) {
    init.process({}, [
        // Prompt for these values.
        init.prompt('componentName', 'rxComponent'),
    ], function (err, props) {

        // Files to copy (and process).
        var files = init.filesToCopy(props);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props);

        // All done!
        done();
    });
};
