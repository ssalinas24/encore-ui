/* jshint node: true */

describe('titleize', function () {
    var titleize;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (titleizeFilter) {
            titleize = titleizeFilter;
        });
    });

    it('replaces underscores with spaces', function () {
        expect(titleize('_A_B_')).to.equal(' A B ');
    });

    it('converts the string to title case', function () {
        expect(titleize('a bcD_e')).to.equal('A Bcd E');
    });
});
