angular.module('demoApp')
.value('Examples', <%= JSON.stringify(config.examples, null, 4) %>);
