var {%= componentName %} = require('./{%= componentName %}.page').{%= componentName %};

/**
   {%= componentName %} exercises.
   @exports encore.exercise.{%= componentName %}
   @param {Object} [options=] - Test options. Used to build valid tests.
   @param {{%= componentName %}} [options.instance={%= componentName %}.initialize()] - Component to exercise.
   @example
   describe('default exercises', encore.exercise.{%= componentName %}({
       instance: myPageObject.{%= componentName %}, // select one of many widgets on page
   }));
 */
exports.{%= componentName %} = function (options) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        instance: {%= componentName %}.initialize()
    });

    return function () {
        var component;

        before(function () {
            component = options.instance;
        });

        it('should start exercising defaults now');

    };
};
