// Basic template description.
exports.description = 'Create an EncoreUI component, including unit tests and documentation.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'All new components must follow the Encore UI CSS & JS Standards';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function (grunt, init, done) {
    init.process({}, [
        // Prompt for these values.
        init.prompt('name'),
        init.prompt('description'),
        {
            name: 'stability',
            message: 'Component Stability Index (0-5)',
            default: '1',
            warning: '0=Deprecated, 1=Experimental, 2=Unstable, 3=Stable, 4=API Frozen, 5=Locked',
            validator: /^[0-5]{1}$/
        },
        // TODO maybe add prompts for if directive/controller/service?
    ], function (err, props) {
        // convert camelCase to dashes
        props.dashedName = props.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

        // convert stability index into human-readable name
        var stabilities = ['deprecated', 'experimental', 'unstable', 'stable', 'frozen', 'locked'];
        props.stabilityName = stabilities[props.stability];

        // Files to copy (and process).
        var files = init.filesToCopy(props);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props);

        // All done!
        done();
    });
};
