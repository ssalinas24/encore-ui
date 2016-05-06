describe('rxCapitalize', function () {
    var capitalize;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($filter) {
            capitalize = $filter('rxCapitalize');
        });
    });

    it('should capitalize just the first letter of the sentence', function () {
        var sentence = 'steve holt';

        expect(capitalize(sentence)).to.equal('Steve holt');
    });

    it('should return an empty string if a non-string input is received', function () {
        expect(capitalize(undefined)).to.equal('');
    });
});
