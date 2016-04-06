angular.module('demoApp')
.directive('rxPermalink', function ($location) {
    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        template: '<a ng-href="{{permalinkUrl}}" class="permalink" id="{{permaId}}" ng-transclude></a>',
        link: function (scope, el, attr) {
            // Convert Text content to URL-safe string
            scope.permaId = el.text()
                .toLowerCase() // normalize to lowercase
                .replace(/[^0-9a-z]/gi, '-') // non-alphanumeric to hyphen
                .replace(/\-{2,}/g, '-'); // condense consecutive hyphens

            scope.permalinkUrl = '#' + $location.path() + '#' + scope.permaId;
        }
    };
});
