describe('typeahead', function () {
    var typeahead;

    before(function () {
        demoPage.go('#/components/typeahead');
        typeahead = encore.typeahead.initialize($('#typeahead'));
    });

    it('should show element', function () {
        expect(typeahead.isDisplayed()).to.eventually.be.true;
    });

    it('should hide the menu initially', function () {
        expect(typeahead.isOpen()).to.eventually.be.false;
    });

    it('should show the menu when clicked', function () {
        typeahead.focus();
        expect(typeahead.isOpen()).to.eventually.be.true;
    });

    it('should hide the menu when the input loses focus', function () {
        typeahead.rootElement.element(by.xpath('../..')).click();
        expect(typeahead.isOpen()).to.eventually.be.false;
    });
});
