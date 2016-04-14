/* jshint node: true */
describe('rxFormUtils', function () {
    var rxFormUtilsSvc, rootScope, $document;

    var template;

    beforeEach(function () {
        module('encore.ui.utilities');

        inject(function ($rootScope, _$document_, rxFormUtils) {
            rootScope = $rootScope;
            $document = _$document_;
            rxFormUtilsSvc = rxFormUtils;
        });

        template = $('<div id="tabSet1"><div class="tab-content"><div class="tab-pane">' +
                       '<rx-option-table id="table1" field-id="table1_fieldId">' +
                         '<div>' +
                           '<table><thead></thead><tbody>' +
                             '<tr class="ng-scope selected">' +
                               '<td><label><input value="table1_rowId1"></label></td>' +
                             '</tr>' +
                             '<tr class="ng-scope">' +
                               '<td><label><input value="table1_rowId2"></label></td>' +
                             '</tr>' +
                             '<tr><td><label><input value="table1_rowId3"></label></td></tr>' +
                           '</tbody></table>' +
                         '</div>' +
                       '</rx-option-table>' +
                     '</div></div></div>' +
                     '<div id="tabSet2"><div class="tab-content"><div class="tab-pane">' +
                       '<rx-option-table id="table2">' +
                         '<div>' +
                           '<table><thead></thead><tbody>' +
                             '<tr class="ng-scope selected">' +
                               '<td><label><input value="table2_rowId1"></label></td>' +
                             '</tr>' +
                             '<tr class="ng-scope selected">' +
                               '<td><label><input value="table2_rowId2"></label></td>' +
                             '</tr>' +
                             '<tr><td><label><input value="table2_rowId3"></label></td></tr>' +
                           '</tbody></table>' +
                         '</div>' +
                       '</rx-option-table>' +
                     '</div></div></div>');

        rootScope.$digest();
        $($document[0].body).append(template);
    });

    describe('getSelectedOptionForTable', function () {
        var selectedOption = { rowId: 'table1_rowId1' };

        it('returns the selected option for the table with id tableId', function () {
            expect(rxFormUtilsSvc.getSelectedOptionForTable('table1')).to.deep.equal(selectedOption);
        });

        it('returns undefined if no table is found with that id', function () {
            expect(rxFormUtilsSvc.getSelectedOptionForTable('notMyTable')).to.be.undefined;
        });
    });

    describe('getSelectedOptionForTabSet', function () {
        var selectedOption = { tableId: 'table1', fieldId: 'table1_fieldId', rowId: 'table1_rowId1' };

        it('returns the selected option for the tabset', function () {
            expect(rxFormUtilsSvc.getSelectedOptionForTabSet('tabSet1')).to.deep.equal(selectedOption);
        });

        it('returns undefined if no tabset is found with that id', function () {
            expect(rxFormUtilsSvc.getSelectedOptionForTabSet('notMyTabSet')).to.be.undefined;
        });

        it('returns the selected option without the field id if no field-id exists', function () {
            var selectedOptionNoFieldId = { tableId: 'table2', fieldId: null, rowId: 'table2_rowId1' };
            expect(rxFormUtilsSvc.getSelectedOptionForTabSet('tabSet2')).to.deep.equal(selectedOptionNoFieldId);
        });
    });
});
