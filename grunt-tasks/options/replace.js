var config = require('../util/config');

module.exports = {
    'bower': {
        src: ['bower/*.css', 'bower/*.map', 'bower/*.js'],
        overwrite: true,
        replacements: [{
            from: config.regex.version,
            to: ''
        }]
    }
};
