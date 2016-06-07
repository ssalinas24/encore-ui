describe('demo component', function () {

    before(function () {
        demoPage.go('#/components/Metadata');
    });

    it('default', function () {
        screenshot.snap(this, $('rx-metadata'), { threshold: 0.2 });
    });

});
