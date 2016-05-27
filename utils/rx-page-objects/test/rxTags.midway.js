describe('rxTags', function () {

    before(function () {
        demoPage.go('#/components/rxTags');
    });

    describe('exercises', encore.exercise.rxTags({
        instance: encore.rxTags.initialize($('#standard-tags')),
        sampleText: 'orange'
    }));

});
