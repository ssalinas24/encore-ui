describe('elements:rxTimePicker', function () {
    var scope, isoScope, compile, renderDirective;
    var beforeModelValue, beforeDisplayValue;
    var spyOpenPopup, spyClosePopup;
    var template;

    beforeEach(function () {
        module('encore.ui.utilities');
        module('encore.ui.elements');
        module('templates/rxTimePicker.html');
        module('templates/rxButton.html');

        inject(function ($rootScope, $compile) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        scope.specIsDisabled = false; // enabled by default
        template = '<rx-time-picker ng-disabled="specIsDisabled" ng-model="specModel"></rx-time-picker>';

        renderDirective = function (dirScope) {
            var directive = helpers.createDirective(template, compile, dirScope);
            isoScope = directive.isolateScope();

            spyOpenPopup = sinon.spy(isoScope, 'openPopup');
            spyClosePopup = sinon.spy(isoScope, 'closePopup');

            return directive;
        };//renderDirective()
    });

    describe('with blank value', function () {
        beforeEach(function () {
            scope.specModel = '';
            renderDirective(scope);
            beforeDisplayValue = isoScope.displayValue;
            beforeModelValue = scope.specModel;
        });

        it('should set isPickerVisible to false', function () {
            expect(isoScope.isPickerVisible).to.be.false;
        });

        it('should set displayValue to blank', function () {
            expect(isoScope.displayValue).to.be.blank;
        });

        describe('openPopup()', function () {
            beforeEach(function () {
                isoScope.openPopup();
            });

            it('should set isPickerVisible to true', function () {
                expect(isoScope.isPickerVisible).to.be.true;
            });

            it('should set hour to blank', function () {
                expect(isoScope.hour).to.eq('');
            });

            it('should set minutes to blank', function () {
                expect(isoScope.minutes).to.eq('');
            });

            it('should set period to AM', function () {
                expect(isoScope.period).to.eq('AM');
            });

            it('should set offset to +00:00', function () {
                expect(isoScope.offset).to.eq('+00:00');
            });

            describe('after updating picker values', function () {
                beforeEach(function () {
                    isoScope.hour = '10';
                    isoScope.minutes = '15';
                    isoScope.period = 'PM';
                    isoScope.offset = '+04:00';
                });

                describe('closePopup()', function () {
                    beforeEach(function () {
                        isoScope.closePopup();
                    });

                    it('should set isPickerVisible to false', function () {
                        expect(isoScope.isPickerVisible).to.be.false;
                    });

                    it('should not change the model value', function () {
                        expect(scope.specModel).to.eq(beforeModelValue);
                    });

                    it('should not change the display value', function () {
                        expect(isoScope.displayValue).to.eq(beforeDisplayValue);
                    });
                });//closePopup()
            });//after updating picker values
        });//openPopup()

        describe('togglePopup()', function () {
            beforeEach(function () {
                isoScope.togglePopup();
            });

            it('should call openPopup()', function () {
                expect(spyOpenPopup).to.have.been.called;
            });

            describe('called again', function () {
                beforeEach(function () {
                    isoScope.togglePopup();
                });

                it('should call closePopup()', function () {
                    expect(spyClosePopup).to.have.been.called;
                });
            });
        });//togglePopup()

        describe('when disabled', function () {
            beforeEach(function () {
                scope.specIsDisabled = true;
            });

            describe('togglePopup()', function () {
                beforeEach(function () {
                    isoScope.togglePopup();
                });

                it('should leave isPickerVisible false', function () {
                    expect(isoScope.isPickerVisible).to.be.true;
                });
            });//togglePopup()
        });//disabled
    });//with blank value

    /* AM value with negative UTC offset */
    describe('with value "09:15-07:00', function () {
        beforeEach(function () {
            scope.specModel = '09:15-07:00';
            renderDirective(scope);
            beforeDisplayValue = isoScope.displayValue;
            beforeModelValue = scope.specModel;
        });

        it('should set expected display value', function () {
            expect(isoScope.displayValue).to.eq('09:15 (UTC-0700)');
        });

        describe('openPopup()', function () {
            beforeEach(function () {
                isoScope.openPopup();
            });

            it('should set hour to 9', function () {
                expect(isoScope.hour).to.eq('9');
            });

            it('should set minutes to 15', function () {
                expect(isoScope.minutes).to.eq('15');
            });

            it('should set period to AM', function () {
                expect(isoScope.period).to.eq('AM');
            });

            it('should set offset to -07:00', function () {
                expect(isoScope.offset).to.eq('-07:00');
            });

            describe('after updating picker values', function () {
                beforeEach(function () {
                    isoScope.hour = '4';
                    isoScope.minutes = '30';
                    isoScope.period = 'PM';
                    isoScope.offset = '+00:00';
                });

                describe('submitPopup()', function () {
                    beforeEach(function () {
                        isoScope.submitPopup();
                    });

                    it('should change the model value', function () {
                        expect(scope.specModel).to.not.eq(beforeModelValue);
                    });

                    it('should change the display value', function () {
                        expect(isoScope.displayValue).to.not.eq(beforeDisplayValue);
                    });

                    it('should call closePopup()', function () {
                        expect(spyClosePopup).to.have.been.called;
                    });
                });
            });//updating form values
        });//openPopup()
    });//AM value with -UTC

    /* PM value with positive UTC offset */
    describe('with value 17:45+10:00', function () {
        beforeEach(function () {
            scope.specModel = '17:45+10:00';
            renderDirective(scope);
        });

        it('should set expected display value', function () {
            expect(isoScope.displayValue).to.eq('17:45 (UTC+1000)');
        });

        describe('openPopup()', function () {
            beforeEach(function () {
                isoScope.openPopup();
            });

            it('should set hour to 5', function () {
                expect(isoScope.hour).to.eq('5');
            });

            it('should set minutes to 45', function () {
                expect(isoScope.minutes).to.eq('45');
            });

            it('should set period to PM', function () {
                expect(isoScope.period).to.eq('PM');
            });

            it('should set offset to +10:00', function () {
                expect(isoScope.offset).to.eq('+10:00');
            });
        });//openPopup()
    });//PM value with +UTC
});//elements:rxTimePicker
