module.exports = {
    rxPageObjects: {
        src: ['src/**/*.page.js', 'src/**/*.exercise.js'],
        options: {
            destination: 'utils/rx-page-objects/doc/',
            private: false,
            configure: 'utils/rx-page-objects/jsdoc.conf.json'
        }
    }
};
