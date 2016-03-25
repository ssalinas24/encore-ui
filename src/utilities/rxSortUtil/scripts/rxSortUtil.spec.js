/* jshint node: true */
describe('utilities:rxSortUtil', function () {
    var util;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function (rxSortUtil) {
            util = rxSortUtil;
        });
    });

    it('SortUtil: getDefault will return default settings when no parameters are passed', function () {
        expect(util.getDefault()).to.deep.eq({ predicate: undefined, reverse: undefined });
    });

    it('SortUtils: getDfault will set parameters if specified', function () {
        expect(util.getDefault('datacenter', true)).to.deep.eq({ predicate: 'datacenter', reverse: true });
    });

    it('SortUtil: sortCol will sort reverse the sort if it is the same predicate', function () {
        var scope = { sort: { predicate: 'name', reverse: false }, pager: { pageNumber: 1 }};

        util.sortCol(scope, 'name');
        expect(scope.sort.reverse).to.be.true;
        expect(scope.pager.pageNumber).to.eq(0);
    });

    it('SortUtil: sortCol will set reverse to false if it is different predicate', function () {
        var scope = { sort: { predicate: 'name', reverse: true }, pager: { pageNumber: 1 }};

        util.sortCol(scope, 'datacenter');
        expect(scope.sort.reverse).to.be.false;
    });
});
