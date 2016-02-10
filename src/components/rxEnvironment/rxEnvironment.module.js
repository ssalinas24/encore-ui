/**
 * @ngdoc overview
 * @name rxEnvironment
 * @description
 * # rxEnvironment Component
 *
 * Component built to detect and provide the current environment (e.g. dev, staging, prod)
 *
 * ## Current Environments ##
 *
 * This service defines the following Encore specific environments:
 *
 * * **local** - http://localhost:port and http://server:port
 * * **preprod** - http://preprod.encore.rackspace.com
 * * **unified-preprod** - https://*.encore.rackspace.com
 * * **unified** - All environments including https://encore.rackspace.com
 * * **unified-prod** - Only https://encore.rackspace.com
 *
 * Please note that we've made an assumption that staging/preprod/prod environments
 * will all end with `encore.rackspace.com`. Try to avoid using
 * `staging.encore.myNewProduct.rackspace.com` for new products, and instead set
 * up your system as `encore.rackspace.com/myNewProduct`.
 *
 * ## Checking Current Environment ##
 *
 * The `Environment` service contains methods for checking if we are currently in
 * one of the five listed environments, namely:
 *
 * * `Environment.isLocal()`
 * * `Environment.isPreProd()`
 * * `Environment.isUnifiedPreProd()`
 * * `Environment.isUnified()`
 * * `Environment.isUnifiedProd()`
 *
 * The normal procedure is to assume that your code is running in local or staging,
 * and take special actions if `Environment.isPreProd()` or
 * `Environment.isUnifiedProd()` are `true`.
 *
 * ## Overlapping Environments ##
 *
 * Keep in mind that the environments we define are not mutually exclusive. For
 * instance, if we're at `http://preprod.encore.rackspace.com`, then we are in
 * the `preprod` environment, the `unified-preprod` environment, and `unified-prod`.
 *
 * When you want to check if you're in one of the custom environments, you can
 * use `envCheck()`, i.e.: `Environment.envCheck('ghPages')`
 *
 * ## A Warning About rxEnvironmentUrl ##
 * `rxEnvironmentUrl` can be used for building full URLs, based on the current
 * environment. For now, you should consider it as deprecated. It has problems
 * with overlapping environments, and could potentially generate the wrong URL.
 *
 * ## A Warning About `Environment.get().name` ##
 * You might find older Encore code that uses `Environment.get().name` to get
 * the name of the current environment. This pattern should be avoided,
 * specifically because of the overlapping environment issue discussed above.
 * If you call `Environment.get().name`, it will just return the first matching
 * environment in the list of environments, even if we're overlapping and have
 * multiple environments. Instead, check explicitly with
 * `Environment.isLocal()`, `Environment.isPreProd()`, etc., or
 * use `Environment.envCheck('local')`
 *
 * ## Directives
 * * {@link rxEnvironment.directive:rxEnvironment rxEnvironment}
 */
angular.module('encore.ui.rxEnvironment', [
    'ngSanitize',
    'encore.ui.quarks'
]);
