describe('forms', function () {
    before(function () {
        demoPage.go('#/molecules/forms');
    });

    describe('manual saving', function () {
        it('form', function () {
            screenshot.snap(this, $('rx-example[name="forms.manualSave"]'));
        });

        it('notification', function () {
            element(by.model('text')).sendKeys('input');
            screenshot.snap(this, encore.rxNotify.main.rootElement);
        });
    });
});
