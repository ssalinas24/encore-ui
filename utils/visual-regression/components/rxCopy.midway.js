describe('rxCopy', function () {
    before(function () {
        demoPage.go('#/elements/Copy');
    });

    it('kitchen sink', function () {
        screenshot.snap(this, $('.rxCopy-visual-regression'));
    });
});
