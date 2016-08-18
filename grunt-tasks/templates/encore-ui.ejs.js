angular.module('encore.ui', [
    'cfp.hotkeys',
    'ui.bootstrap',
    'encore.ui.tpls',
    <%= _.uniq(config.srcModules).join(',\n    ') %>
])
angular.module('encore.ui.tpls', [
    <%= _.sortBy(_.flatten(config.tplModules)).join(',\n    ') %>
]);
