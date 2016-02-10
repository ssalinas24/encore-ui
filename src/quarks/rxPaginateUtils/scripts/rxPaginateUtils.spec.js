/* jshint node: true */
describe('Pagination', function () {
    describe('Factory: rxPaginateUtils', function () {
        var rxPaginateUtils;

        beforeEach(function () {
            module('encore.ui.quarks');
            inject(function (_rxPaginateUtils_) {
                rxPaginateUtils = _rxPaginateUtils_;
            });
        });

        describe('firstAndLast', function () {
            it('pageNumber = 0, itemsPerPage = 50, totalNumItems = 199', function () {
                var pageNumber = 0,
                    itemsPerPage = 50,
                    totalNumItems = 199;
                var val = rxPaginateUtils.firstAndLast(pageNumber, itemsPerPage, totalNumItems);
                expect(val.first).to.equal(0);
                expect(val.last).to.equal(50);
            });

            it('pageNumber = 1, itemsPerPage = 50, totalNumItems = 199', function () {
                var pageNumber = 1,
                    itemsPerPage = 50,
                    totalNumItems = 199;
                var val = rxPaginateUtils.firstAndLast(pageNumber, itemsPerPage, totalNumItems);
                expect(val.first).to.equal(50);
                expect(val.last).to.equal(100);
            });

            it('pageNumber = 2, itemsPerPage = 50, totalNumItems = 199', function () {
                var pageNumber = 2,
                    itemsPerPage = 50,
                    totalNumItems = 199;
                var val = rxPaginateUtils.firstAndLast(pageNumber, itemsPerPage, totalNumItems);
                expect(val.first).to.equal(100);
                expect(val.last).to.equal(150);
            });

            it('pageNumber = 3, itemsPerPage = 50, totalNumItems = 199', function () {
                var pageNumber = 3,
                    itemsPerPage = 50,
                    totalNumItems = 199;
                var val = rxPaginateUtils.firstAndLast(pageNumber, itemsPerPage, totalNumItems);
                expect(val.first).to.equal(150);
                expect(val.last).to.equal(199);
            });

        });

        describe('calculateApiVals', function () {
            it('pageNumber=0, itemsPerPage=50, serverItemsPerPage=50', function () {
                var pageNumber = 0,
                    itemsPerPage = 50,
                    serverItemsPerPage = 50;
                var vals = rxPaginateUtils.calculateApiVals(pageNumber, itemsPerPage, serverItemsPerPage);
                expect(vals.serverPageNumber, 'serverPageNumber').to.equal(0);
                expect(vals.offset, 'offset').to.equal(0);
            });

            it('pageNumber=0, itemsPerPage=50, serverItemsPerPage=51', function () {
                var pageNumber = 0,
                    itemsPerPage = 50,
                    serverItemsPerPage = 51;
                var vals = rxPaginateUtils.calculateApiVals(pageNumber, itemsPerPage, serverItemsPerPage);
                expect(vals.serverPageNumber, 'serverPageNumber').to.equal(0);
                expect(vals.offset, 'offset').to.equal(0);
            });

            it('pageNumber=0, itemsPerPage=50, serverItemsPerPage=100', function () {
                var pageNumber = 0,
                    itemsPerPage = 50,
                    serverItemsPerPage = 100;
                var vals = rxPaginateUtils.calculateApiVals(pageNumber, itemsPerPage, serverItemsPerPage);
                expect(vals.serverPageNumber, 'serverPageNumber').to.equal(0);
                expect(vals.offset, 'offset').to.equal(0);
            });

            it('pageNumber=1, itemsPerPage=50, serverItemsPerPage=100', function () {
                var pageNumber = 1,
                    itemsPerPage = 50,
                    serverItemsPerPage = 100;
                var vals = rxPaginateUtils.calculateApiVals(pageNumber, itemsPerPage, serverItemsPerPage);
                expect(vals.serverPageNumber, 'serverPageNumber').to.equal(0);
                expect(vals.offset, 'offset').to.equal(50);
            });

            it('pageNumber=1, itemsPerPage=25, serverItemsPerPage=100', function () {
                var pageNumber = 1,
                    itemsPerPage = 25,
                    serverItemsPerPage = 100;
                var vals = rxPaginateUtils.calculateApiVals(pageNumber, itemsPerPage, serverItemsPerPage);
                expect(vals.serverPageNumber, 'serverPageNumber').to.equal(0);
                expect(vals.offset, 'offset').to.equal(25);
            });

            it('pageNumber=5, itemsPerPage=50, serverItemsPerPage=200', function () {
                var pageNumber = 5,
                    itemsPerPage = 50,
                    serverItemsPerPage = 200;
                var vals = rxPaginateUtils.calculateApiVals(pageNumber, itemsPerPage, serverItemsPerPage);
                expect(vals.serverPageNumber, 'serverPageNumber').to.equal(1);
                expect(vals.offset, 'offset').to.equal(50);
            });

            it('pageNumber=5, itemsPerPage=50, serverItemsPerPage=250', function () {
                var pageNumber = 5,
                    itemsPerPage = 50,
                    serverItemsPerPage = 250;
                var vals = rxPaginateUtils.calculateApiVals(pageNumber, itemsPerPage, serverItemsPerPage);
                expect(vals.serverPageNumber, 'serverPageNumber').to.equal(1);
                expect(vals.offset, 'offset').to.equal(0);
            });

            it('pageNumber=4, itemsPerPage=50, serverItemsPerPage=250', function () {
                var pageNumber = 4,
                    itemsPerPage = 50,
                    serverItemsPerPage = 250;
                var vals = rxPaginateUtils.calculateApiVals(pageNumber, itemsPerPage, serverItemsPerPage);
                expect(vals.serverPageNumber, 'serverPageNumber').to.equal(0);
                expect(vals.offset, 'offset').to.equal(200);
            });
        });
    });
});
