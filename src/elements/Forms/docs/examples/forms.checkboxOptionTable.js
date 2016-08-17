angular.module('demoApp')
.controller('formCheckboxOptionTableDemoCtrl', function ($scope) {

    $scope.optionTableColumns = [
        {
            'label': 'Name',
            'key': 'name',
            'selectedLabel': '(Already saved data)'
        }, {
            'label': 'Static Content',
            'key': 'Some <strong>Text &</strong> HTML'
        }, {
            'label': 'Expression 2',
            'key': '{{ value * 100 | number:2 }}'
        }, {
            'label': 'Expression 3',
            'key': '{{ obj.name | uppercase }}'
        }, {
            'label': 'Expression 4',
            'key': '{{ value | currency }}'
        }
    ];

    $scope.optionTableCheckboxData = [
        {
            'name': 'Item 1'
        }, {
            'name': 'Item 2',
            'value': 'checked',
            'falseValue': 'unchecked'
        }
    ];
    // example with first checkbox automatically checked
    $scope.table = {
        checkbox: [true, 'unchecked']
    };
});
