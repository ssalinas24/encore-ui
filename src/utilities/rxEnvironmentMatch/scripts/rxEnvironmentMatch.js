angular.module('encore.ui.utilities')
/**
 * @ngdoc filter
 * @name utilities.filter:rxEnvironmentMatch
 * @description
 * Checks if current environment matches target environment
 *
 * @example
 * <pre>
 * {{ 'production' | rxEnvironmentMatch }}
 * returns true if current environment is 'production', false otherwise
 *
 * {{ '!production' | rxEnvironmentMatch }}
 * returns false if current environment is 'production', true otherwise
 * </pre>
 */
.filter('rxEnvironmentMatch', function (rxEnvironment) {
    return function (environment) {
        // check to see if first character is negation indicator
        var isNegated = environment[0] === '!';

        // get name of environment to look for
        var targetEnvironmentName = isNegated ? environment.substr(1) : environment;

        var environmentMatches = rxEnvironment.envCheck(targetEnvironmentName);
        return isNegated ? !environmentMatches : environmentMatches;
    };
});
