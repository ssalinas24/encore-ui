/* jshint node: true */
describe('quarks:rxFeedbackController', function () {
    var ctrlScope, rootScope;
    var modalInstance;

    beforeEach(function () {
        // load module
        module('encore.ui.quarks');
    });

    describe('Expected Modal Behavior', function () {
        beforeEach(function () {
            modalInstance = {
                close: sinon.stub(),
                dismiss: sinon.stub()
            };

            inject(function ($rootScope, $controller) {
                rootScope = $rootScope;
                ctrlScope = $rootScope.$new();

                $controller('rxFeedbackController', {
                    $scope: ctrlScope,
                    $modalInstance: modalInstance,
                    $rootScope: $rootScope
                });

            });
        });

        it('should close on submit', function () {
            expect(modalInstance.close).to.have.not.have.beenCalled;
            ctrlScope.submit();
            expect(modalInstance.close).to.have.been.calledOnce;
        });

        it('should dismiss modal on cancel', function () {
            expect(modalInstance.dismiss).to.have.not.have.beenCalled;
            ctrlScope.cancel();
            expect(modalInstance.dismiss).to.have.been.calledOnce;
        });

        it('should dismiss modal on routeChange', function () {
            expect(modalInstance.dismiss).to.have.not.have.beenCalled;
            // fake a route change
            rootScope.$broadcast('$routeChangeSuccess');
            expect(modalInstance.dismiss).to.have.been.calledOnce;
        });
    });

    describe('FeedbackService Override', function () {
        var random;
        beforeEach(module(function ($provide) {
            random = Math.random();
            $provide.factory('FeedbackService', function () {
                return {
                    initialize: function (scope) {
                        scope.test = random;
                    }
                };
            });
        }));

        beforeEach(function () {
            modalInstance = {
                close: sinon.stub(),
                dismiss: sinon.stub()
            };

            inject(function ($rootScope, $controller) {
                rootScope = $rootScope;
                ctrlScope = $rootScope.$new();

                expect(ctrlScope.test).to.be.undefined;
                $controller('rxFeedbackController', {
                    $scope: ctrlScope,
                    $modalInstance: modalInstance,
                    $rootScope: $rootScope
                });

            });
        });

        it('should allow FeedbackService to modify scope', function () {
            expect(ctrlScope.test).to.eq(random);
        });
    });
});
