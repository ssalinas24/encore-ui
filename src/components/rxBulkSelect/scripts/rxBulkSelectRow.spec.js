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

    describe('directive:rxBulkSelectRow', function () {
        var rowEl, rowCheck, messageEl, numSelected, controller, selectAllEl, deSelectAllEl;

        beforeEach(function () {
            rowEl = el.find('td[rx-bulk-select-row]').first();
            rowCheck = rowEl.find('input[type="checkbox"]');
            messageEl = el.find('tr[rx-bulk-select-message]');
            selectAllEl = messageEl.find('button[ng-click="selectAll()"]');
            deSelectAllEl = messageEl.find('button[ng-click="deselectAll()"]');

            controller = el.controller('rxBulkSelect');
            var update = function (newVal) {
                numSelected = newVal;
            };

            controller.registerForNumSelected(update);
        });

        it('should notify the controller whenever we check/uncheck on a row', function () {
            rowCheck.click();
            timeout.flush();
            expect(numSelected).to.equal(1);

            rowCheck.click();
            timeout.flush();
            expect(numSelected).to.equal(0);
        });

        it('should have a working Select All button when visible', function () {
            rowCheck.click();
            timeout.flush();
            expect(numSelected).to.equal(1);

            selectAllEl.click();
            expect(numSelected).to.equal(3);

            deSelectAllEl.click();
            expect(numSelected).to.equal(0);
            expect(messageEl.hasClass('ng-hide'), 'hidden').to.be.true;
        });
    });
});
