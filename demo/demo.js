function genericRouteController (breadcrumbs) {
    return function (rxBreadcrumbsSvc, Environment, $interpolate) {
        if (breadcrumbs === undefined) {
            breadcrumbs = [{
                name: '',
                path: ''
            }]
        }

        breadcrumbs.forEach(function (breadcrumb) {
            if (breadcrumb.path) {
                breadcrumb.path = $interpolate(Environment.get().url)({ path: breadcrumb.path });
            }
        });

        rxBreadcrumbsSvc.set(breadcrumbs);
    }
}

angular.module('demoApp', ['encore.ui', 'ngRoute'])
.controller('componentCtrl', function ($scope, rxBreadcrumbsSvc, $routeParams, component) {
    rxBreadcrumbsSvc.set([{
            path: '#/components',
            name: 'Components'
        }, {
            name: component.name
        }]);

    $scope.component = component;
})
.config(function ($routeProvider, rxStatusTagsProvider) {
    $routeProvider
        .when('/', {
            redirectTo: '/overview'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: genericRouteController()
        })
        .when('/overview', {
            templateUrl: 'overview.html',
            controller: genericRouteController()
        })
        /* Legacy Styleguide */
        .when('/styleguide/basics', {
            templateUrl: 'styleguide/basics.html',
            controller: genericRouteController([{
                name: 'Style Guide'
            }])
        })
        /* Layouts */
        .when('/styleguide/layouts', {
            templateUrl: 'styleguide/layouts.html',
            controller: genericRouteController([{
                name: 'Layouts'
            }])
        })
        .when('/styleguide/layouts/1', {
            templateUrl: 'styleguide/layout-1.html',
            controller: genericRouteController([{
                name: 'Layouts', path: '#/styleguide/layouts'
            }, {
                name: 'Detail Page'
            }])
        })
        .when('/styleguide/layouts/2', {
            templateUrl: 'styleguide/layout-2.html',
            controller: genericRouteController([{
                name: 'Layouts', path: '#/styleguide/layouts'
            }, {
                name: 'Data Table'
            }])
        })
        .when('/styleguide/layouts/3', {
            templateUrl: 'styleguide/layout-3.html',
            controller: genericRouteController([{
                name: 'Layouts', path: '#/styleguide/layouts'
            }, {
                name: 'Create Form'
            }])
        })
        .when('/styleguide/buttons', {
            templateUrl: 'styleguide/buttons.html',
            controller: genericRouteController([{
                name: 'Style Guide', path: '#/styleguide/basics'
            }, {
                name: 'Buttons'
            }])
        })
        .when('/styleguide/tables', {
            templateUrl: 'styleguide/tables.html',
            controller: genericRouteController([{
                name: 'Style Guide', path: '#/styleguide/basics'
            }, {
                name: 'Tables'
            }])
        })
        .when('/styleguide/forms', {
            templateUrl: 'styleguide/forms.html',
            controller: genericRouteController([{
                name: 'Style Guide', path: '#/styleguide/basics'
            }, {
                name: 'Forms'
            }])
        })
        .when('/styleguide/modals', {
            templateUrl: 'styleguide/modals.html',
            controller: genericRouteController([{
                name: 'Style Guide', path: '#/styleguide/basics'
            }, {
                name: 'Modals'
            }])
        })
        /* Layouts */
        .when('/layout/collapsible', {
            templateUrl: 'layout/collapsible.html',
            controller: genericRouteController([{
                name: 'Collapsible'
            }])
        })
        /* Style Pages */
        .when('/styles/color', {
            templateUrl: 'styles/color.html',
            controller: genericRouteController([{
                name: 'Color'
            }])
        })
        .when('/styles/wells', {
            templateUrl: 'styles/wells.html',
            controller: genericRouteController([{
                name: 'Wells'
            }])
        })
        /* Component Pages */
        .when('/components', {
            templateUrl: 'components.html',
            controller: 'componentsController as vm'
        })
        .when('/component/:component', {
            redirectTo: function (routeParams) {
                return '/components/' + routeParams.component;
            }
        })
        .when('/components/:component', {
            controller: 'componentCtrl',
            templateUrl: 'component-template.html',
            resolve: {
                'component': function ($route, components) {
                    return _.find(components, {
                        'name': $route.current.params.component
                    });
                }
            }
        })
        /* Guide Pages */
        .when('/guides/:guide', {
            controller: 'guideController as vm',
            templateUrl: 'guides/guideViewer.html'
        });

    // Define a custom status tag for use in the rxBreadcrumbs demo
    rxStatusTagsProvider.addStatus({
        key: 'demo',
        class: 'alpha-status',
        text: 'Demo Tag'
    });
})
.run(function ($rootScope, $window, $location, $anchorScroll, $interpolate,
               Environment, rxBreadcrumbsSvc, rxPageTitle) {
    var baseGithubUrl = '//rackerlabs.github.io/encore-ui/';
    Environment.add({
        name: 'ghPages',
        pattern: /\/\/rackerlabs.github.io/,
        url: baseGithubUrl + '{{path}}'
    });

    rxBreadcrumbsSvc.setHome($interpolate(Environment.get().url)({ path: '#/overview' }), 'Overview');

    var demoNav = [
        {
            type: 'no-title',
            children: [
                {
                    href: '#/overview',
                    linkText: 'Overview'
                }
            ]
        },
        {
            title: 'Design Styleguide',
            children: [
                {
                    href: '#/styleguide/basics',
                    linkText: 'Basics',
                    children: [
                        {
                            href: '#/styleguide/basics#typography',
                            linkText: 'Typography'
                        },
                        {
                            href: '#/styleguide/basics#flexbox-grid',
                            linkText: 'Flexbox Grid'
                        },
                        {
                            href: '#/styleguide/basics#heading-title-styles',
                            linkText: 'Header & Title Styles'
                        },
                        {
                            href: '#/styleguide/basics#date-formatting',
                            linkText: 'Date Formatting'
                        },
                        {
                            href: '#/styleguide/basics#descriptions-metadata',
                            linkText: 'Descriptions & Metadata'
                        },
                        {
                            href: '#/styleguide/basics#no-data',
                            linkText: 'No Data to Display'
                        },
                        {
                            href: '#/styleguide/basics#lists',
                            linkText: 'Lists'
                        },
                        {
                            href: '#/styleguide/basics#helper-classes',
                            linkText: 'Helper classes'
                        },
                        {
                            href: '#/styleguide/basics#progress-bars',
                            linkText: 'Progress bars'
                        }
                    ]
                },
                {
                    href: '#/styleguide/layouts',
                    linkText: 'Layouts',
                    children: [
                        {
                            href: '#/styleguide/layouts',
                            linkText: 'Grids'
                        },
                        {
                            href: '#/styleguide/layouts',
                            linkText: 'Sample Layouts',
                            children: [
                                {
                                    href: '#/styleguide/layouts/1',
                                    linkText: 'Layout 1: Detail Page'
                                },
                                {
                                    href: '#/styleguide/layouts/2',
                                    linkText: 'Layout 2: Data Table'
                                },
                                {
                                    href: '#/styleguide/layouts/3',
                                    linkText: 'Layout 3: Create Form'
                                }
                            ]
                        }
                    ]
                },
                {
                    href: '#/styleguide/buttons',
                    linkText: 'Buttons & Links',
                    children: [
                        {
                            href: '#/styleguide/buttons',
                            linkText: 'Customizing Buttons'
                        },
                        {
                            href: '#/styleguide/buttons#colors',
                            linkText: 'Using Colors and Icons'
                        }
                    ]
                },
                {
                    href: '#/styleguide/tables',
                    linkText: 'Tables',
                    children: [
                        {
                            href: '#/styleguide/tables',
                            linkText: 'Basics'
                        },
                        {
                            href: '#/styleguide/tables#directives',
                            linkText: 'Directives'
                        },
                        {
                            href: '#/styleguide/tables#designpatterns',
                            linkText: 'Design Patterns'
                        },
                        {
                            href: '#/styleguide/tables#roadmap',
                            linkText: 'UI Roadmap / Possible Future-work'
                        }
                    ]
                },
                {
                    href: '#/styleguide/forms',
                    linkText: 'Forms',
                    children: [
                        {
                            href: '#/styleguide/forms',
                            linkText: 'Directives'
                        },
                        {
                            href: '#/styleguide/forms#designpatterns',
                            linkText: 'Design Patterns within Encore'
                        },
                        {
                            href: '#/styleguide/forms#roadmap',
                            linkText: 'UI Roadmap / Possible Future-work'
                        }
                    ]
                },
                {
                    href: '#/styleguide/modals',
                    linkText: 'Modals',
                    children: [
                        {
                            href: '#/styleguide/modals',
                            linkText: 'Basic Usage'
                        },
                        {
                            href: '#/styleguide/modals#designpatterns',
                            linkText: 'Design Best Practices'
                        },
                        {
                            href: '#/styleguide/modals#roadmap',
                            linkText: 'UI Roadmap / Possible Future-work'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Layout',
            children: [
                {
                    href: '#/layout/collapsible',
                    linkText: 'Collapsible'
                }
            ]
        },
        {
            title: 'Style',
            children: [
                {
                    href: '#/styles/color',
                    linkText: 'Color'
                },
                {
                    href: '#/styles/wells',
                    linkText: 'Wells'
                }
            ]
        },
        {
            title: 'Components',
            children: [
                {
                    href: '#/components',
                    linkText: 'All Components'
                }
            ]
        }
    ];

    $rootScope.demoNav = demoNav;

    rxPageTitle.setSuffix(' - EncoreUI');

    $rootScope.$on('$routeChangeSuccess', function() {
        if ($location.hash()) {
            $anchorScroll();
        } else {
            $window.scrollTo(0,0);
        }
    });
})
.directive('rxPrism', function ($timeout, $http) {
    return {
        restrict: 'E',
        template: '<pre><code class="language-{{language}}" ng-transclude></code></pre>',
        scope: {
            language: '@',
            codeUrl: '@',

        },
        transclude: true,
        link: function (scope, el) {
            // delay execution of Prism until ng bindings have completed
            $timeout(function () {
                var code = el.find('code')[0];
                if (scope.codeUrl) {
                    $http.get(scope.codeUrl).then(function (result) {
                        code.textContent = result.data;
                        Prism.highlightElement(code);
                    });
                } else {
                    Prism.highlightElement(code);
                }
            }, 0);
        }
    };
})

.directive('alwaysInvalid', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attrs, ctrl) {
            ctrl.$setValidity('alwaysInvalid', false);
        }
    };
})

// Used for drawing the Demo and Markup tabs in the styleguide
.directive('rxStyleguide', function () {
    return {
        restrict: 'E',
        templateUrl: 'styleguide/rx-styleguide.html',
        scope: {
            codeUrl: '@'
        }
    };
})

// Used by the Tables styleguide page to show pagination
.controller('tablePaginateExampleController', function ($scope, PageTracking) {
    $scope.pager = PageTracking.createInstance();
    $scope.people = [
        { name: 'Patrick Deuley', occupation: 'Design Chaplain' },
        { name: 'Hussam Dawood', occupation: 'Cat Lover' }
    ];
})

// Used by the Tables styleguide page to show nested content
.controller('tableNestedExampleCtrl', function ($scope) {
    $scope.people = [
        { name: 'Patrick Deuley', occupation: 'Design Chaplain', pets: [
            { name: 'Shelly', animal: 'Turtle', age: 1 },
            { name: 'Spike', animal: 'Porcupine', age: 10 }
        ] },
        { name: 'Hussam Dawood', occupation: 'Cat Lover', pets: [
            { name: 'Sassy', animal: 'Cat', age: 6 }
        ] }
    ];
})

// Used by the Tables styleguid page to show table with filtering capabilities
.controller('tableWithFilteringCtrl', function ($scope, PageTracking) {
    $scope.people = [
        { name: 'Patrick Deuley', occupation: 'Design Chaplain' },
        { name: 'Hussam Dawood', occupation: 'Cat Lover' },
        { name: 'Kevin Lamping', occupation: 'Framework Father' },
        { name: 'Glynnis Ritchie', occupation: 'Serif Sheriff' },
        { name: 'Freddy Knuth', occupation: 'Venezuelan Hurricane' },
        { name: 'Chris Cantu', occupation: 'Texan Tornado' },
    ];
})

// Used by the Layout 2 styleguide page to show pagination
.controller('layout2StyleguideCtrl', function ($scope, PageTracking) {
    $scope.pager = PageTracking.createInstance();
    $scope.people = [
        { name: 'Patrick Deuley', occupation: 'Design Chaplain', number: 1, status: 'ACTIVE' },
        { name: 'Hussam Dawood', occupation: 'Cat Lover', number: 2, status: 'DISABLED' },
        { name: 'Kevin Lamping', occupation: 'Framework Father', number: 3, status: 'ERROR' },
        { name: 'Glynnis Ritchie', occupation: 'Serif Sheriff', number: 4, status: 'INFO' },
        { name: 'Freddy Knuth', occupation: 'Venezuelan Hurricane', number: 5, status: 'WARNING' },
        { name: 'Chris Cantu', occupation: 'Texan Tornado', number: 6, status: 'PENDING' },
    ];
})

// Used by the Customizing Buttons styleguide page
.controller('customButtonsStyleguideCtrl', function ($scope, $timeout) {
    $scope.status = {
        loading: false,
        disable: false
    };

    $scope.clickMe = function () {
        $scope.status.loading = true;
        $timeout(function () {
            $scope.status.loading = false;
        }, 4000);
    };
})
.controller('commentBoxStyleguideCtrl', function ($scope) {
    $scope.comment = '';
})

// Used by the Filters styleguide page to show a collapsible region
.controller('collapseFilterExampleCtrl', function ($scope) {
    $scope.filter = { region: '' };

    $scope.regions = [
        { name: 'DFW', city: 'Dallas-Fort Worth' }, { name: 'ORD', city: 'Chicago' },
        { name: 'IAD', city: 'Northern Virginia' }, { name: 'LON', city: 'London' },
        { name: 'HKG', city: 'Hong Kong' }, { name: 'SYD', city: 'Sydney' }
    ];

    $scope.servers = [
        { name: 'General1-1', ram: '1 GB', cpu: 1, disk: '20GB SSD', region: 'DFW'},
        { name: 'General1-2', ram: '2 GB', cpu: 2, disk: '40GB SSD', region: 'ORD'},
        { name: 'General1-4', ram: '4 GB', cpu: 4, disk: '80GB SSD', region: 'IAD'},
        { name: 'General1-8', ram: '8 GB', cpu: 8, disk: '160GB SSD', region: 'LON'},
        { name: 'I/O1-15', ram: '15 GB', cpu: 4, disk: '40GB SSD', region: 'HKG'},
        { name: 'I/O1-30', ram: '30 GB', cpu: 8, disk: '40GB SSD', region: 'SYD'}
    ];
})

.controller('formsDisabledExamplesCtrl', function ($scope) {
    // intentionally left blank
    $scope.txtDisabled = 'Disabled Text Input';
    $scope.selDisabled = 'disabled';
    $scope.radDisabled = 1;
    $scope.chkDisabledOne = true;
    $scope.chkDisabledTwo = false;
    $scope.togDisabledOn = true;
    $scope.togDisabledOff = false;
    $scope.txtAreaDisabled = 'Disabled Textarea';
})

.controller('formsInvalidExamplesCtrl', function ($scope) {
    // intentionally left blank
    $scope.txtInvalid = 'Invalid text input';
    $scope.selInvalid = 'invalid';
    $scope.radInvalid = 1;
    $scope.chkInvalidOne = true;
    $scope.chkInvalidTwo = false;
    $scope.togInvalidOn = true;
    $scope.togInvalidOff = false;
    $scope.txtAreaInvalid = 'Invalid Value';
})

.controller('formsAutoSaveExampleController', function ($scope, rxAutoSave) {
    $scope.forms = { autosave: '' };
    rxAutoSave($scope, 'forms');
})

.controller('formsManualSaveExampleController', function ($scope, $timeout, rxNotify) {
    $scope.saving = false;
    $scope.save = function () {
        $scope.saving = true;
        rxNotify.clear('page');
        $timeout(function () {
            $scope.saving = false;
            $scope.lastSaved = Date.now();
            rxNotify.add('Data successfully saved!', {
                type: 'success'
            });
        }, 1000);
    };
});
