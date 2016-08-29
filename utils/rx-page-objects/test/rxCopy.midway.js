// Until we upgrade to protractor 4 (to get selenium 2.53+),
// we'll skip these tests on Travis to pass checks.
if (!process.env.TRAVIS) {
    describe('rxCopy', function () {
        var subject;
        var testCopyArea;

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
        }

        before(function () {
            testCopyArea = $('#test-textarea');
            demoPage.go('#/elements/Copy');
        });

        describe('simple usage', encore.exercise.rxCopy({
            instance: new encore.rxCopy($('#copy-simple-short')),
            testCopyArea: testCopyArea
        }));

        describe('simple usage with angular variables', function () {
            before(function () {
                subject = new encore.rxCopy($('#copy-simple-long'));
            });

            it('should have expected text', function () {
                expect(subject.getText()).to.eventually.match(/^A paragraph that will wrap/);
            });

            it('should copy text to clipboard', function () {
                subject.copy();
                getPastedValue().then(function (pastedValue) {
                    expect(subject.getText()).to.eventually.eq(pastedValue);
                });
            });
        });

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
        });

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
        });

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
        });
    });
}
