/**
 * This file is meant to be a bandaid while we remove our dependency
 * on ngBootstrap.  ngBootstrap 0.14.3 throws all sorts of console
 * warnings for renamed directives.  Rather than having all apps update
 * their code to correct the ngBootstrap warnings and update again
 * when we remove those dependencies, we'll disable the warnings and
 * work on the replacements for ngBoostrap directives. This way apps
 * will only need to update once (to rx-prefixed directives).
 */

// Components > typeahead
angular.module('ui.bootstrap.typeahead')
    .value('$typeaheadSuppressWarning', true);

// Components > tooltips
angular.module('ui.bootstrap.tooltip')
    .value('$tooltipSuppressWarning', true);

// Elements > Tabs
angular.module('ui.bootstrap.tabs')
    .value('$tabsSuppressWarning', true);

// Elements > Progress Bars
angular.module('ui.bootstrap.progressbar')
    .value('$progressSuppressWarning', true);

// Components > rxModalAction
angular.module('ui.bootstrap.modal')
    .value('$modalSuppressWarning', true);
