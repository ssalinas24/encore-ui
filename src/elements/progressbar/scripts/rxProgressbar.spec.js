describe('rxProgressbar', function () {
    var $scope, isoScope, $compile, el, template;

    beforeEach(function () {
        module('encore.ui.elements');
        module('templates/rxProgressbar.html');

        inject(function ($rootScope, _$compile_) {
            $scope = $rootScope.$new();
            $compile = _$compile_;
        });

        el = helpers.createDirective(template, $compile, $scope);
        isoScope = el.isolateScope();
    });

    describe('static template', function () {
        describe('simple template', function () {
            beforeEach(function () {
                template = '<rx-progressbar value="22"></rx-progressbar>';

                el = helpers.createDirective(template, $compile, $scope);
                isoScope = el.isolateScope();
            });

            it('should set max to 100', function () {
                expect(isoScope.max).to.equal(100);
            });

            it('should set value to 22', function () {
                expect(isoScope.value).to.equal(22);
            });
        });//simple template

        describe('with max attribute', function () {
            beforeEach(function () {
                template = '<rx-progressbar value="42" max="50"></rx-progressbar>';

                el = helpers.createDirective(template, $compile, $scope);
                isoScope = el.isolateScope();
            });

            it('should set max to 50', function () {
                expect(isoScope.max).to.equal(50);
            });

            it('should set value to 42', function () {
                expect(isoScope.value).to.equal(42);
            });
        });//with max attribute
    });//static template

    describe('dynamic template', function () {
        beforeEach(function () {
            template = '<rx-progressbar value="val" max="max"></rx-progressbar>';

            $scope.val = 22;
            $scope.max = 50;

            el = helpers.createDirective(template, $compile, $scope);
            isoScope = el.isolateScope();
        });

        it('should have percent set to 44', function () {
            expect(isoScope.percent).to.equal(44);
        });

        describe('changing max to 100', function () {
            beforeEach(function () {
                $scope.max = 100;
                $scope.$digest();
            });

            it('should have percent of 22', function () {
                expect(isoScope.percent).to.equal(22);
            });
        });

        describe('changing val to 33', function () {
            beforeEach(function () {
                $scope.val = 33;
                $scope.$digest();
            });

            it('should have percent of 66', function () {
                expect(isoScope.percent).to.equal(66);
            });
        });
    });
});
