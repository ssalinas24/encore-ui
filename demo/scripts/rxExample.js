angular.module('demoApp')
.directive('rxExample', function ($http) {
    var MAX_PREVIEW_LINES = 10;

    function isExpandable (content) {
        var lineCount = content.trim().split('\n').length;
        return lineCount > MAX_PREVIEW_LINES;
    }//isExpandable()

    return {
        restrict: 'E',
        templateUrl: 'templates/rx-example.html',
        scope: {
            name: '@'
        },
        link: function (scope) {
            var baseName = 'examples/' + scope.name;
            var _canExpand = { markup: false, js: false, less: false };
            var _isExpanded = { markup: false, js: false, less: false };
            // markup not included b/c it's required for minimum functionality
            var _hasSource = { js: false, less: false };

            // used by ng-include and code-url
            scope.markupUrl = baseName + '.html';
            scope.javascriptUrl = baseName + '.js';
            scope.lessUrl = baseName + '.less';

            scope.isExpanded = function (ilk) {
                return _isExpanded[ilk];
            };

            scope.canExpand = function (ilk) {
                return _canExpand[ilk];
            };

            scope.hasSource = function (ilk) {
                return _hasSource[ilk];
            };

            scope.toggleExpanded = function (ilk) {
                _isExpanded[ilk] = !_isExpanded[ilk];
            };

            /* ===== Source Checks ===== */
            $http.get(scope.markupUrl).then(
                function (result) {
                    // Check Line Count
                    _canExpand.markup = isExpandable(result.data);
                }
            );//GET markupUrl

            $http.get(scope.javascriptUrl).then(
                function (result) {
                    _hasSource.js = true;
                    // Check Line Count
                    _canExpand.js = isExpandable(result.data);
                },
                function () {
                    _hasSource.js = false;
                }
            );//GET javascriptUrl

            $http.get(scope.lessUrl).then(
                function (result) {
                    _hasSource.less = true;
                    // Check Line Count
                    _canExpand.less = isExpandable(result.data);
                },
                function () {
                    _hasSource.less = false;
                }
            );//GET lessUrl
        }
    };
});
