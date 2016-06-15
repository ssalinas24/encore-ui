describe('rxBulkSelect', function () {
    var scope, compile, el, isolateScope;

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
        module('encore.ui.rxBulkSelect');
        module('templates/rxBulkSelectMessage.html');
        module('templates/rxBatchActions.html');

        inject(function ($compile, $rootScope) {
            compile = $compile;
            scope = $rootScope.$new();
        });

        scope.servers = servers;

        el = helpers.createDirective(template, compile, scope);
        scope.$digest();
        isolateScope = el.isolateScope();
    });

    describe(' - directive', function () {
        it('should have added a <tr rx-bulk-select-message> to the header', function () {
            expect(el.find('thead tr[rx-bulk-select-message]')).to.have.length(1);
        });

        it('should set tableElement on the scope', function () {
            expect(isolateScope.tableElement).to.not.be.undefined;
        });
    });
});
