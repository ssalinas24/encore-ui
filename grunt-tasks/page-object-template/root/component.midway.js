var {%= componentName %}Page = encore.{%= componentName %};

describe('{%= componentName %}', function () {
    var {%= componentName %};

    before(function () {
        demoPage.go('#/components/{%= componentName %}');
        {%= componentName %} = {%= componentName %}Page.initialize($('#{%= componentName %}'));
    });

    it('should show element', function () {
        expect({%= componentName %}.isDisplayed()).to.eventually.be.true;
    });

    describe('exercises', encore.exercise.{%= componentName %}());

});
