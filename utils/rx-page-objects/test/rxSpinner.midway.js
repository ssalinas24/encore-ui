describe('rxSpinner', function () {
    before(function () {
        demoPage.go('#/components/rxSpinner');
    });

    it.skip('should show element', function () {
        expect(encore.rxSpinner.rxSpinnerElement.isDisplayed()).toEqual(true);
    });
});
