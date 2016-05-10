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

    describe('directive:rxBulkSelectHeaderCheck', function () {
        var headerEl, headerCheck;

        beforeEach(function () {
            headerEl = el.find('thead th[rx-bulk-select-header-check]');
            headerCheck = headerEl.find('input[type="checkbox"]');
        });

        it('should have added a checkbox input to the header', function () {
            expect(headerEl.find('input[type="checkbox"]')).to.have.length(1);
        });

        it('should cause all rows to be selected/deselected when clicked', function () {
            var numSelected;
            var controller = el.controller('rxBulkSelect');
            var update = function (newVal) {
                numSelected = newVal;
            };

            controller.registerForNumSelected(update);

            headerCheck.click();
            timeout.flush();
            expect(numSelected).to.equal(3);
            expect(servers[0].rowIsSelected).to.be.true;
            expect(servers[1].rowIsSelected).to.be.true;
            expect(servers[2].rowIsSelected).to.be.true;

            headerCheck.click();
            timeout.flush();
            expect(numSelected).to.equal(0);
            expect(servers[0].rowIsSelected).to.be.false;
            expect(servers[1].rowIsSelected).to.be.false;
            expect(servers[2].rowIsSelected).to.be.false;
        });
    });
});
