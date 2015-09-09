/* jshint node: true */

describe('rxBulkSelect', function () {
    var scope, compile, rootScope, timeout, el, isolateScope;

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

    var rxBulkSelectUtils = {
        setAllVisibleRows: function (val, tableElement, key) {
            _.each(servers, function (server) {
                server[key] = val;
            });
        }
    };

    beforeEach(function () {
        module('encore.ui.rxMisc');
        module('encore.ui.rxBulkSelect', function ($provide) {
            $provide.value('rxBulkSelectUtils', rxBulkSelectUtils);
        });
        module('templates/rxBulkSelectMessage.html');
        module('templates/rxBatchActions.html');

        inject(function ($compile, $rootScope, $timeout) {
            compile = $compile;
            rootScope = $rootScope;
            scope = rootScope.$new();
            timeout = $timeout;
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

    describe(' - rxBulkSelectController', function () {
        var ctrl, ctrlScope, numSelected;

        beforeEach(function () {

            ctrlScope = rootScope.$new();
            ctrlScope.tableElement = {};
            ctrlScope.selectedKey = 'rowIsSelected';
            ctrlScope.bulkSource = scope.servers;

            inject(function ($controller) {
                ctrl = $controller('rxBulkSelectController', {
                    $scope: ctrlScope
                });

            });

            var update = function (newVal) {
                numSelected = newVal;
            };

            ctrl.registerForNumSelected(update);
        });

        it('should allow for numSelected registrations',  function () {
            // In the actual directives, the call to `ctrl.increment()`
            // happens automatically when `rowIsSelected` goes true. It's
            // only in the tests that I have to set them separately like this
            scope.servers[0].rowIsSelected = true;
            ctrl.increment();
            timeout.flush();
            expect(numSelected).to.equal(1);

            scope.servers[1].rowIsSelected = true;
            ctrl.increment();
            timeout.flush();
            expect(numSelected).to.equal(2);

            scope.servers[1].rowIsSelected = false;
            ctrl.decrement();
            timeout.flush();
            expect(numSelected).to.equal(1);
        });

        it('should return the row key', function () {
            expect(ctrl.key()).to.equal('rowIsSelected');
        });

        it('should select all visible rows', function () {
            ctrl.selectAllVisibleRows();
            timeout.flush();
            expect(numSelected).to.equal(3);
        });

        it('should deselect all visible rows', function () {
            ctrl.deselectAllVisibleRows();
            timeout.flush();
            expect(numSelected).to.equal(0);
        });
        
        it('should select all rows', function () {
            ctrl.selectEverything();
            timeout.flush();
            expect(numSelected).to.equal(3);
        });

        it('should deselect all rows', function () {
            ctrl.deselectEverything();
            timeout.flush();
            expect(numSelected).to.equal(0);
        });
    });

    describe(' - rxBulkSelectHeaderCheck', function () {
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

    describe(' - rxBulkSelectRow/rxBulkSelectMessage', function () {
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

    describe(' - rxBatchActions', function () {
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

    });
    

    describe(' - rxBulkSelectValidate', function () {
        var formCtrl;
        var template =
        '<form>' +
          '<div class="form-item">' +
            '<table rx-bulk-select rx-bulk-select-validate bulk-source="servers" selected-key="rowIsSelected">' +
              '<thead>' +
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
            '</table>' +
          '</div>' +
        '<form>';

        beforeEach(function () {
            scope.servers = [{ name: 'server1', rowIsSelected: false }];
        });

        it('sets the form invalid when none are selected', function () {
            el = helpers.createDirective(angular.element(template), compile, scope);
            formCtrl = el.controller('form');
            expect(formCtrl.$valid).to.be.false;
        });

        it('sets the form valid when one is selected', function () {
            scope.servers[0].rowIsSelected = true;
            el = helpers.createDirective(angular.element(template), compile, scope);
            formCtrl = el.controller('form');
            expect(formCtrl.$valid).to.be.true;
        });

    });

});
