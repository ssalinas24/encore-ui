describe('demo component', function () {

    before(function () {
        demoPage.go('#/elements/Buttons');
    });

    it('sizes', function () {
        screenshot.snap(this, $('rx-example[name="button.sizing"] .demo-wrapper'), { threshold: 1 });
    });

    it('group', function () {
        screenshot.snap(this, $('rx-example[name="button.group"] .demo-wrapper'), { threshold: 1 });
    });

});
