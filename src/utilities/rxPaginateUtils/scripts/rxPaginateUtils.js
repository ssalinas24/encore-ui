angular.module('encore.ui.utilities')
/**
 * @ngdoc service
 * @name utilities.service:rxPaginateUtils
 * @description
 * A few utilities to calculate first, last, and number of items.
 */
.factory('rxPaginateUtils', function () {
    var rxPaginateUtils = {};

    rxPaginateUtils.firstAndLast = function (pageNumber, itemsPerPage, totalNumItems) {
        var first = pageNumber * itemsPerPage;
        var added = first + itemsPerPage;
        var last = (added > totalNumItems) ? totalNumItems : added;

        return {
            first: first,
            last: last,
        };

    };

    // Given the user requested pageNumber and itemsPerPage, and the number of items we'll
    // ask a paginated API for (serverItemsPerPage), calculate what page number the API
    // should be asked for, how and far of an offset to use to slice into the returned items.
    // It is expected that authors of getItems() functions will use this, and do the slice themselves
    // before resolving getItems()
    rxPaginateUtils.calculateApiVals = function (pageNumber, itemsPerPage, serverItemsPerPage) {
        var serverPageNumber = Math.floor(pageNumber * itemsPerPage / serverItemsPerPage);
        var offset = pageNumber * itemsPerPage - serverItemsPerPage * serverPageNumber;

        return {
            serverPageNumber: serverPageNumber,
            offset: offset
        };
    };

    return rxPaginateUtils;
});
