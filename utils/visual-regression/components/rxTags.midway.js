describe('demo component', function () {

    before(function () {
        demoPage.go('#/elements/Tags');
    });

    it('default', function () {
        screenshot.snap(this, $('.demo-wrapper'), { threshold: 1 });
    });

});
