angular
    .module('demoApp')
    .controller('guideController', function (
            $anchorScroll, $location, $routeParams, $templateCache, rxBreadcrumbsSvc) {

        var vm = this;

        vm.activate = activate;
        vm.guide = $routeParams.guide;
        vm.scrollTo = scrollTo;

        function activate () {
            var hash;
            setTitle();

            // If url includes an anchor link, scroll to it (because angular intercepts first hash for routing)
            if (hash = $location.hash()) {
                $anchorScroll(hash);
            }
        }

        function scrollTo (id) {
            $location.hash(id);
            $anchorScroll();
        };

        // Instead of setting a static title attribute for rxPage, pull the first header's content and use that
        function setTitle () {
            var title = document.querySelector('rx-page').querySelector('h1, h2, h3, h4, h5')
            vm.title = title.innerText;
            rxBreadcrumbsSvc.set([{
                name: vm.title
            }]);

            // Remove the now redundant title
            title.remove();

            // If the page is cached, the next time this runs, it will grab the incorrect data
            $templateCache.remove('guides/rendered/' + vm.guide + '.html');
        };
    });
