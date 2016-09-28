angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:Environment
 * @description
 *
 * Allows defining environments and retrieving the current environment based on location
 *
 * ## Adding New Environments ##
 *
 * If necessary, you can add additional environments with `Environment.add()`.
 * This takes an object with three properties, `name`, `pattern` and `url`, where
 *
 * * name: The "friendly" name of your environment, like "local", "preprod", etc.
 * * pattern: A string or RegEx that the current path is matched against
 * * url: The URL pattern used to build URLs when using rxEnvironmentUrl
 *
 * As an example, if we didn't already have a `'preprod'` environment, we could
 * add it as follows:
 *
 * <pre>
 * Environment.add({
 *     // Matches only https://preprod.encore.rackspace.com
 *     name: 'preprod',
 *     pattern: /\/\/preprod.encore.rackspace.com/,
 *     url: '{{path}}'
 * });
 * </pre>
 *
 * For this demo application, we add a "Github Pages" environment, like this:
 *
 * <pre>
 * Environment.add({
 *     name: 'ghPages',
 *     pattern: '//rackerlabs.github.io',
 *     url: baseGithubUrl + '{{path}}'
 * });
 * </pre>
 *
 * @example
 * <pre>
 * Environment.get() // return environment object that matches current location
 * </pre>
 */
.service('Environment', function ($location, $rootScope, $log) {
    /*
     * This array defines different environments to check against.
     * It is prefilled with 'Encore' based environments
     * It can be overwritten if necessary via the returned 'environments' property
     *
     * @property {string} name The 'friendly' name of the environment
     * @property {string|RegEx} pattern The pattern to match the current path against
     * @property {string} url The url pattern used to build out urls for that environment.
     *                        See 'buildUrl' for more details
     */
    var environments = [{
        // Regexr: http://www.regexr.com/3de5m
        // http://localhost:3000/
        // http://localhost:9000/
        // http://localhost/
        // http://server/
        // http://encore.dev/
        // http://apps.server/
        name: 'local',
        pattern: /\/\/(?:\w+\.)?(localhost|server|(.*)\.dev)(:\d{1,4})?/,
        url: '//' + $location.host() + ($location.port() !== 80 ? ':' + $location.port() : '') + '/{{path}}'
    }, {
        // Matches only preprod and it's subdomains
        // Regexr: http://www.regexr.com/3eani
        // https://preprod.encore.rackspace.com
        // https://apps.preprod.encore.rackspace.com
        // https://cloud.preprod.encore.rackspace.com
        name: 'preprod',
        pattern: /\/\/(?:\w+\.)?preprod.encore.rackspace.com/,
        url: '{{path}}'
    }, {
        // This is anything with a host preceeding encore.rackspace.com
        // Regexr: http://www.regexr.com/3eanl
        // https://staging.encore.rackspace.com/
        // https://preprod.encore.rackspace.com/
        // https://apps.encore.rackspace.com
        // https://apps.staging.encore.rackspace.com
        // https://cloud.staging.encore.rackspace.com
        // https://apps.preprod.encore.rackspace.com/
        // https://cloud.preprod.encore.rackspace.com/
        name: 'unified-preprod',
        pattern: /\/\/(?:\w+\.)?(\w+\.)encore.rackspace.com/,
        url: '{{path}}'
    }, {
        // This is *all* environments
        // Regexr: http://www.regexr.com/3de5v
        // https://encore.rackspace.com/
        // https://staging.encore.rackspace.com/
        // https://preprod.encore.rackspace.com/
        // https://apps.encore.rackspace.com
        // https://apps.staging.encore.rackspace.com
        name: 'unified',
        pattern: 'encore.rackspace.com',
        url: '{{path}}'
    }, {
        // This is only production only
        // Regexr: http://www.regexr.com/3eal4
        // https://encore.rackspace.com/
        // https://apps.encore.rackspace.com
        // https://origin.encore.rackspace.com
        name: 'unified-prod',
        pattern: /\/\/(?:apps\.|origin\.)?encore.rackspace.com/,
        url: '{{path}}'
    }];

    /*
     * Checks if an environment has valid properties
     * @private
     * @param {object} environment The environment object to check
     * @returns {boolean} true if valid, false otherwise
     */
    var isValidEnvironment = function (environment) {
        return _.isString(environment.name) &&
            (_.isString(environment.pattern) || _.isRegExp(environment.pattern)) &&
            _.isString(environment.url);
    };

    var environmentPatternMatch = function (href, pattern) {
        if (_.isRegExp(pattern)) {
            return pattern.test(href);
        }

        return _.contains(href, pattern);
    };

    /*
     * Retrieves current environment
     * @public
     * @param {string} [href] The path to check the environment on. Defaults to $location.absUrl()
     * @returns {Object} The current environment (if found), else 'localhost' environment.
     */
    this.get = function (href) {
        // default to current location if href not provided
        href = href || $location.absUrl();

        var currentEnvironment = _.find(environments, function (environment) {
            return environmentPatternMatch(href, environment.pattern);
        });

        if (_.isUndefined(currentEnvironment)) {
            $log.warn('No environments match URL: ' + $location.absUrl());
            // set to default/first environment to avoid errors
            currentEnvironment = environments[0];
        }

        return currentEnvironment;
    };

    /*
     * Adds an environment to the front of the stack, ensuring it will be matched first
     * @public
     * @param {object} environment The environment to add. See 'environments' array for required properties
     */
    this.add = function (environment) {
        // do some sanity checks here
        if (isValidEnvironment(environment)) {
            // add environment, over riding all others created previously
            environments.unshift(environment);
        } else {
            $log.error('Unable to add Environment: defined incorrectly');
        }
    };

    /*
     * Replaces current environments array with new one
     * @public
     * @param {array} newEnvironments New environments to use
     */
    this.setAll = function (newEnvironments) {
        // validate that all new environments are valid
        if (newEnvironments.length > 0 && _.every(environments, isValidEnvironment)) {
            // overwrite old environments with new
            environments = newEnvironments;
        }
    };

    /*
     * Given an environment name, check if any of our registered environments
     * match it
     * @public
     * @param {string} [name] Environment name to check
     * @param {string} [href] Optional href to check against. Defaults to $location.absUrl()
     */
    this.envCheck = function (name, href) {
        href = href || $location.absUrl();
        var matchingEnvironments = _.filter(environments, function (environment) {
            return environmentPatternMatch(href, environment.pattern);
        });
        return _.contains(_.pluck(matchingEnvironments, 'name'), name);
    };

    var makeEnvCheck = function (name) {
        return function (href) { return this.envCheck(name, href); };
    };

    /* Whether or not we're in the `preprod` environment
     * @public
     */
    this.isPreProd = makeEnvCheck('preprod');

    /* Whether or not we're in `local` environment
     * @public
     */
    this.isLocal = makeEnvCheck('local');

    /* Whether or not we're in the `unified-preprod` environment
     * @public
     */
    this.isUnifiedPreProd = makeEnvCheck('unified-preprod');

    /* Whether or not we're in the `unified` environment
     * @public
     */
    this.isUnified = makeEnvCheck('unified');

    /* Whether or not we're in the `unified-prod` environment
     * @public
     */
    this.isUnifiedProd = makeEnvCheck('unified-prod');
});
