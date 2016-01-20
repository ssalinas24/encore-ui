describe('hotkeys', function () {
    var volume, body;

    before(function () {
        demoPage.go('#/quarks/hotkeys');
        volume = element(by.binding('volume'));
        body = element(by.css('body'));
    });

    it('should turn volume up and down using hotkeys', function () {
        expect(volume.getText()).to.eventually.equal('5');

        // turn it up
        var ctrlUp = protractor.Key.chord(protractor.Key.CONTROL, protractor.Key.ARROW_UP);
        body.sendKeys(ctrlUp);

        expect(volume.getText()).to.eventually.equal('6');

        // turn it down
        var ctrlDown = protractor.Key.chord(protractor.Key.CONTROL, protractor.Key.ARROW_DOWN);
        body.sendKeys(ctrlDown);
        body.sendKeys(ctrlDown);

        expect(volume.getText()).to.eventually.equal('4');
    });
});
