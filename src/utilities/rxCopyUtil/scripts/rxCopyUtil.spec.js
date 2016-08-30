describe('rxCopyUtil', function () {
    var sandbox;
    var $window, rxCopyUtil;
    // <div>hiyoo</div>
    var divNode = document.createElement('div', { text: 'hiyoo' });

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (_$window_, _rxCopyUtil_) {
            $window = _$window_;
            rxCopyUtil = _rxCopyUtil_;
        });

        sandbox = sinon.sandbox.create();
        sandbox.spy(document, 'createRange');
        sandbox.spy($window, 'getSelection');
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe('.selectNodeText()', function () {
        beforeEach(function () {
            rxCopyUtil.selectNodeText(divNode);
        });

        it('should call document.createRange()', function () {
            expect(document.createRange).to.be.called;
        });

        it('should call $window.getSelection()', function () {
            expect($window.getSelection).to.be.called;
        });
    });//.selectNodeText()

    describe('.execCopy()', function () {
        var passFn, failFn;

        beforeEach(function () {
            passFn = sandbox.spy();
            failFn = sandbox.spy();
        });

        describe('for functional browsers', function () {
            describe('when successful', function () {
                beforeEach(function () {
                    sandbox.stub(document, 'execCommand', function () {
                        return true;
                    });
                });

                it('should call passFn', function () {
                    expect(passFn).to.not.be.called;
                    rxCopyUtil.execCopy(passFn, failFn);
                    expect(passFn).to.be.called;
                });

                it('should not call failFn', function () {
                    expect(failFn).to.not.be.called;
                    rxCopyUtil.execCopy(passFn, failFn);
                    expect(failFn).to.not.be.called;
                });
            });//when successful

            describe('when unsuccessful', function () {
                beforeEach(function () {
                    sandbox.stub(document, 'execCommand', function () {
                        return false;
                    });
                });

                it('should call failFn', function () {
                    expect(failFn).to.not.be.called;
                    rxCopyUtil.execCopy(passFn, failFn);
                    expect(failFn).to.be.called;
                });

                it('should not call passFn', function () {
                    expect(passFn).to.not.be.called;
                    rxCopyUtil.execCopy(passFn, failFn);
                    expect(passFn).to.not.be.called;
                });
            });//when unsuccessful
        });//functional browsers

        describe('for non-functional browsers', function () {
            beforeEach(function () {
                // mock errored exec
                sandbox.stub(document, 'execCommand', function () {
                    throw Error;
                });
            });

            it('should call failFn', function () {
                expect(failFn).to.not.be.called;
                rxCopyUtil.execCopy(passFn, failFn);
                expect(failFn).to.be.called;
            });

            it('should not call passFn', function () {
                expect(passFn).to.not.be.called;
                rxCopyUtil.execCopy(passFn, failFn);
                expect(passFn).to.not.be.called;
            });
        });//non-functional browsers
    });//.execCopy()
});
