describe('rxSearchBox', function () {
    var scope, isoScope, compile, el, template;

    beforeEach(function () {
        module('encore.ui.elements');
        module('templates/rxSearchBox.html');

        inject(function ($location, $rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });
    });

    describe('simple invokation', function () {
        beforeEach(function () {
            template = '<rx-search-box ng-model="testModel"></rx-search-box>';
            el = helpers.createDirective(template, compile, scope);
            isoScope = el.isolateScope();
        });

        describe('on $apply', function () {
            var applyFn;

            beforeEach(function () {
                applyFn = function () {
                    scope.$apply();
                };
            });

            describe('an undefined model', function () {
                beforeEach(function () {
                    scope.testModel = undefined;
                });

                it('should not throw error', function () {
                    expect(applyFn).to.not.throw(Error);
                });
            });

            describe('a null model', function () {
                beforeEach(function () {
                    scope.testModel = null;
                });

                it('should not throw error', function () {
                    expect(applyFn).to.not.throw(Error);
                });
            });

            describe('an empty string model', function () {
                beforeEach(function () {
                    scope.testModel = '';
                });

                it('should not throw error', function () {
                    expect(applyFn).to.not.throw(Error);
                });
            });

            describe('a non-empty string model', function () {
                beforeEach(function () {
                    scope.testModel = 'hiyoo';
                });

                it('should not throw error', function () {
                    expect(applyFn).to.not.throw(Error);
                });
            });
        });//on $apply

        describe('after $apply', function () {
            describe('an empty string model', function () {
                beforeEach(function () {
                    scope.testModel = '';
                    scope.$apply();
                });

                it('should have same searchVal as testModel', function () {
                    expect(isoScope.searchVal).to.eq(scope.testModel);
                });

                it('should not be clearable', function () {
                    expect(isoScope.isClearable).to.be.false;
                });

                it('should have default placeholder', function () {
                    expect(isoScope.rxPlaceholder).to.eq('Search...');
                });
            });

            describe('a non-empty string model', function () {
                beforeEach(function () {
                    scope.testModel = 'hiyoo';
                    scope.$apply();
                });

                it('should be clearable', function () {
                    expect(isoScope.isClearable).to.be.true;
                });

                describe('clearSearch()', function () {
                    beforeEach(function () {
                        isoScope.clearSearch();
                    });

                    it('should set searchVal to empty string', function () {
                        expect(isoScope.searchVal).to.be.empty;
                    });
                });//clearSearch()
            });
        });
    });//simple invokation

    describe('disabled invokation (with non-empty model value)', function () {
        beforeEach(function () {
            template = '<rx-search-box ng-model="testModel" ng-disabled="true"></rx-search-box>';
            scope.testModel = 'hiyoo';
            el = helpers.createDirective(template, compile, scope);
            isoScope = el.isolateScope();
            isoScope.$digest();
        });

        it('should not be clearable', function () {
            expect(isoScope.isClearable).to.be.false;
        });

        it('should have same searchVal as testModel', function () {
            expect(isoScope.searchVal).to.eq(scope.testModel);
        });
    });

    describe('with custom placeholder', function () {
        beforeEach(function () {
            template = '<rx-search-box ng-model="testModel" rx-placeholder="\'hiyoo\'"></rx-search-box>';
            el = helpers.createDirective(template, compile, scope);
            isoScope = el.isolateScope();
            isoScope.$digest();
        });

        it('should have expected rxPlaceholder', function () {
            expect(isoScope.rxPlaceholder).to.eq('hiyoo');
        });
    });
});
