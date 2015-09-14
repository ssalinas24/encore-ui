var Page = require('astrolabe').Page;
var _ = require('lodash');

var rxMultiSelectPage = encore.rxMultiSelect;

describe('rxMultiSelect', function () {
    var rxMultiSelect;

    before(function () {
        demoPage.go('#/component/rxMultiSelect');
        rxMultiSelect = rxMultiSelectPage.initialize($('#rxMultiSelect'));
    });

    it('should show element', function () {
        expect(rxMultiSelect.isDisplayed()).to.eventually.be.true;
    });

  	describe('exercises', encore.exercise.rxMultiSelect({
        instance: encore.rxMultiSelect.initialize($('#classification')),
        inputs: ['Type A', 'Type B', 'Type C', 'Type D']
    }));

});

  
var table = Page.create({
    getDataForColumn: {
        value: function (column) {
            return element.all(by.repeater('ticket in').column(column)).map(function (cell) {
                return cell.getText();
            }).then(_.uniq).then(_.sortBy);
        }
    },

    accounts: {
        get: function () {
            return this.getDataForColumn('ticket.account');
        }
    },

    statuses: {
        get: function () {
            return this.getDataForColumn('ticket.status');
        }
    }
});
