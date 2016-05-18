describe('rxBulkSelect', function () {
    var scope, compile, timeout, el;

    var template =
        '<table rx-bulk-select bulk-source="servers" selected-key="rowIsSelected" num-columns="2">' +
            '<thead>' +
                '<tr>' +
                    '<th><rx-batch-actions></rx-batch-actions></th>' +
                '</tr>' +
                '<tr>' +
                    '<th rx-bulk-select-header-check></th>' +
                    '<th>Name</th>' +
                '</tr>' +
            '</thead>' +
            '<tbody ng-repeat="server in servers">' +
                '<tr>' +
                    '<td rx-bulk-select-row row="server"></td>' +
                    '<td>{{ server.name }}</td>' +
                '</tr>' +
                '<tr>' +
                    '<td colspan="2">' +
                        '<table>' +
                            '<thead>' +
                                '<tr>' +
                                    '<th>Title</th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody>' +
                                '<tr>' +
                                    '<td>Content</td>' +
                                '</tr>' +
                            '</tbody>' +
                        '</table>' +
                    '</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>';

    var servers = [
        { name: 'server1', rowIsSelected: false },
        { name: 'server2', rowIsSelected: false },
        { name: 'server3', rowIsSelected: false }
    ];

    beforeEach(function () {
        module('encore.ui.rxMisc');
        module('encore.ui.rxBulkSelect');
        module('templates/rxBulkSelectMessage.html');
        module('templates/rxBatchActions.html');

        inject(function ($compile, $rootScope, $timeout) {
            compile = $compile;
            scope = $rootScope.$new();
            timeout = $timeout;
        });

        scope.servers = servers;

        el = helpers.createDirective(template, compile, scope);
        scope.$digest();
    });

    describe('directive:rxBatchActions', function () {
        var filterRowEl, batchActionsScope, rowCheck;

        beforeEach(function () {
            var batchActionsEl = el.find('rx-batch-actions');
            filterRowEl = batchActionsEl.parent().parent();
            batchActionsScope = batchActionsEl.scope();

            rowCheck = el.find('td[rx-bulk-select-row] input[type="checkbox"]').first();
        });

        it('should have added rx-table-filter-row', function () {
            expect(filterRowEl.hasClass('rx-table-filter-row')).to.be.true;
        });

        it('should show the bulk actions when a row is selected, via the `rowsSelected` scope attribute', function () {
            expect(batchActionsScope.rowsSelected).to.be.false;
            rowCheck.click();
            timeout.flush();
            expect(batchActionsScope.rowsSelected).to.be.true;
        });
    });//directive:batchActions
});//rxBulkSelect
