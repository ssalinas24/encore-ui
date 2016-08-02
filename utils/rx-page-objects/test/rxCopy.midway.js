describe('rxCopy', function () {
    var subject;

    /**
     * @returns {Promise<String>}
     */
    function getPastedValue () {
        return $('#test-textarea')
            .clear()
            .sendKeys(protractor.Key.chord(
                (process.platform === 'darwin' ? protractor.Key.META : protractor.Key.CONTROL),
                'v'
            ))
            .getAttribute('value');
    }//getPastedValue

    before(function () {
        demoPage.go('#/elements/Copy');
    });

    describe('simple usage', function () {
        before(function () {
            subject = new encore.rxCopy($('#copy-simple-short'));
        });

        it('should be waiting', function () {
            expect(subject.isWaiting()).to.eventually.be.true;
        });

        it('should not be successful', function () {
            expect(subject.isSuccessful()).to.eventually.be.false;
        });

        it('should not be failed', function () {
            expect(subject.isFailed()).to.eventually.be.false;
        });

        it('should have expected text', function () {
            expect(subject.getText()).to.eventually.eq('This is a short sentence.');
        });

        it('should have default tooltip', function () {
            expect(subject.tooltip.getText()).to.eventually.eq('Click to Copy');
        });

        it('should copy text to clipboard', function () {
            subject.copy();
            getPastedValue().then(function (pastedValue) {
                expect(subject.getText()).to.eventually.eq(pastedValue);
            });
        });

        describe('after copy', function () {
            before(function () {
                subject.copy();
            });

            it('should not be waiting', function () {
                expect(subject.isWaiting()).to.eventually.be.false;
            });

            it('should be successful', function () {
                expect(subject.isSuccessful()).to.eventually.be.true;
            });

            it('should not be failed', function () {
                expect(subject.isFailed()).to.eventually.be.false;
            });

            it('should have success tooltip', function () {
                expect(subject.tooltip.getText()).to.eventually.eq('Copied!');
            });

            describe('and after a short wait', function () {
                before(function () {
                    browser.sleep(3500);
                });

                it('should be waiting', function () {
                    expect(subject.isWaiting()).to.eventually.be.true;
                });

                it('should not be successful', function () {
                    expect(subject.isSuccessful()).to.eventually.be.false;
                });

                it('should not be failed', function () {
                    expect(subject.isFailed()).to.eventually.be.false;
                });

                it('should have default tooltip', function () {
                    expect(subject.tooltip.getText()).to.eventually.eq('Click to Copy');
                });
            });
        });
    });//simple usage

    describe('simple usage with angular variables', function () {
        before(function () {
            subject = new encore.rxCopy($('#copy-simple-long'));
        });

        it('should have expected text', function () {
            expect(subject.text).to.eventually.match(/^A paragraph that will wrap/);
        });

        it('should copy text to clipboard', function () {
            subject.copy();
            getPastedValue().then(function (pastedValue) {
                expect(subject.text).to.eventually.eq(pastedValue);
            });
        });
    });//compact paragraph

    describe('compact paragraph', function () {
        before(function () {
            subject = new encore.rxCopy($('#copy-long-compact'));
        });

        it('should have expected text', function () {
            expect(subject.getText()).to.eventually.match(/^A compacted paragraph/);
        });

        it('should copy text to clipboard', function () {
            subject.copy();
            getPastedValue().then(function (pastedValue) {
                expect(subject.getText()).to.eventually.eq(pastedValue);
            });
        });
    });//compact paragraph

    describe('compact metadata', function () {
        before(function () {
            subject = new encore.rxCopy($('#copy-metadata-compact'));
        });

        it('should have expected text', function () {
            expect(subject.getText()).to.eventually.match(/^A compacted metadata value/);
        });

        it('should copy text to clipboard', function () {
            subject.copy();
            getPastedValue().then(function (pastedValue) {
                expect(subject.getText()).to.eventually.eq(pastedValue);
            });
        });
    });//compact metadata

    describe('table usage', function () {
        describe('(icon visibility)', function () {
            before(function () {
                subject = new encore.rxCopy($('td.copy-short rx-copy:first-of-type'));
            });

            it('should have an icon', function () {
                expect(subject.eleAction.isPresent()).to.eventually.be.true;
            });

            it('should not show an icon', function () {
                expect(subject.eleAction.isDisplayed()).to.eventually.be.false;
            });

            describe('on hover', function () {
                beforeEach(function () {
                    browser.actions().mouseMove(subject.rootElement).perform();
                });

                it('should show icon', function () {
                    expect(subject.eleAction.isDisplayed()).to.eventually.be.true;
                });
            });//on hover
        });//icon visibility

        describe('short visible values', function () {
            before(function () {
                subject = new encore.rxCopy($('td.copy-short rx-copy:first-of-type'));
            });

            it('should have expected text', function () {
                expect(subject.getText()).to.eventually.eq('Short');
            });

            it('should copy text to clipboard', function () {
                subject.copy();
                getPastedValue().then(function (pastedValue) {
                    expect(subject.getText()).to.eventually.eq(pastedValue);
                });
            });
        });//short visible values

        describe('long overflow values', function () {
            before(function () {
                subject = new encore.rxCopy($('td.copy-long rx-copy:first-of-type'));
            });

            it('should have expected text', function () {
                expect(subject.getText()).to.eventually.match(/^An extremely long cell value/);
            });

            it('should copy text to clipboard', function () {
                subject.copy();
                getPastedValue().then(function (pastedValue) {
                    expect(subject.getText()).to.eventually.eq(pastedValue);
                });
            });
        });//compact metadata

        describe('table usage', function () {
            describe('(icon visibility)', function () {
                before(function () {
                    subject = new encore.rxCopy($('td.copy-short rx-copy:first-of-type'));
                });

                it('should have an icon', function () {
                    expect(subject.eleAction.isPresent()).to.eventually.be.true;
                });

                it('should not show an icon', function () {
                    expect(subject.eleAction.isDisplayed()).to.eventually.be.false;
                });

                describe('on hover', function () {
                    beforeEach(function () {
                        browser.actions().mouseMove(subject.rootElement).perform();
                    });

                    it('should show icon', function () {
                        expect(subject.eleAction.isDisplayed()).to.eventually.be.true;
                    });
                });//on hover
            });//icon visibility

            describe('short visible values', function () {
                before(function () {
                    subject = new encore.rxCopy($('td.copy-short rx-copy:first-of-type'));
                });

                it('should have expected text', function () {
                    expect(subject.getText()).to.eventually.eq('Short');
                });

                it('should copy text to clipboard', function () {
                    subject.copy();
                    getPastedValue().then(function (pastedValue) {
                        expect(subject.getText()).to.eventually.eq(pastedValue);
                    });
                });
            });//short visible values

            describe('long overflow values', function () {
                before(function () {
                    subject = new encore.rxCopy($('td.copy-long rx-copy:first-of-type'));
                });

                it('should have expected text', function () {
                    expect(subject.getText()).to.eventually.match(/^An extremely long cell value/);
                });

                it('should copy text to clipboard', function () {
                    subject.copy();
                    getPastedValue().then(function (pastedValue) {
                        expect(subject.getText()).to.eventually.eq(pastedValue);
                    });
                });
            });//long overflow values
        });//table usage
    });//rxCopy
});
