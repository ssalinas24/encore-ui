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
        module('encore.ui.elements');
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

    describe('directive:rxBulkSelectMessage', function () {
        var rowEl, rowCheck, messageEl, numSelected, controller;

        beforeEach(function () {
            rowEl = el.find('td[rx-bulk-select-row]').first();
            rowCheck = rowEl.find('input[type="checkbox"]');
            messageEl = el.find('tr[rx-bulk-select-message]');

            controller = el.controller('rxBulkSelect');
            var update = function (newVal) {
                numSelected = newVal;
            };

            controller.registerForNumSelected(update);
        });

        it('should show/hide the bulk select message when we check/uncheck a row', function () {
            rowCheck.click();
            timeout.flush();
            expect(numSelected).to.equal(1);
            expect(messageEl.hasClass('ng-hide'), 'visible').to.be.false;

            rowCheck.click();
            timeout.flush();
            expect(numSelected).to.equal(0);
            expect(messageEl.hasClass('ng-hide'), 'hidden').to.be.true;
        });
    });
});
