describe('rxBulkSelect', function () {
    var scope, compile, el, template;

    var servers = [
        { name: 'server1', rowIsSelected: false },
        { name: 'server2', rowIsSelected: false },
        { name: 'server3', rowIsSelected: false }
    ];

    beforeEach(function () {
        module('encore.ui.rxBulkSelect');
        module('templates/rxBulkSelectMessage.html');

        inject(function ($compile, $rootScope) {
            compile = $compile;
            scope = $rootScope.$new();
        });

        scope.servers = servers;

        el = helpers.createDirective(template, compile, scope);
        scope.$digest();
    });

    describe('directive:rxBulkSelectValidate', function () {
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
    });//directive:rxBulkSelectValidate
});//rxBulkSelect
