describe('rxToggleSwitch', function () {
    before(function () {
        demoPage.go('#/components/rxToggleSwitch');
    });

    describe('defaults', encore.exercise.rxToggleSwitch({
        instance: encore.rxToggleSwitch.initialize($('.demo-default-values'))
    }));

    describe('specific model values', encore.exercise.rxToggleSwitch({
        instance: encore.rxToggleSwitch.initialize($('.demo-model-values'))
    }));

    describe('post hook', encore.exercise.rxToggleSwitch({
        instance: encore.rxToggleSwitch.initialize($('.demo-post-hook'))
    }));

    describe('failed asynchronous operation', encore.exercise.rxToggleSwitch({
        instance: encore.rxToggleSwitch.initialize($('.demo-failed-async')),
        enabledAtEnd: false
    }));

    describe('disabled', encore.exercise.rxToggleSwitch({
        instance: encore.rxToggleSwitch.initialize($('.demo-disabled')),
        disabled: true
    }));

});
