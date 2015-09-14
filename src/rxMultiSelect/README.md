[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

## rxMultiSelect

A replacement for `<select multiple>` when space is an issue, such as in the header of a table.

The options for the control can be specified by passing an array of strings (corresponding to the options' values) to the `options` attribute of the directive or using `<rx-select-option>`s. An 'All' option is automatically set as the first option for the dropdown, which allows all options to be toggled at once.

The following two dropdowns are equivalent.
```
<rx-multi-select ng-model="selected" options="available"></rx-multi-select>

<rx-multi-select ng-model="selected">
    <rx-select-option value="2014"></rx-select-option>
    <rx-select-option value="2015"></rx-select-option>
</rx-multi-select>
```

This component requires the `ng-model` attribute and binds the model to an array of the selected options.

The preview text (what is shown when the element is not active) follows the following rules:
* If no items are selected, show "None".
* If only one item is selected from the dropdown, its label will display.
* If > 1 but < n-1 items are selected, show "[#] Selected".
* If all but one item is selected, show "All except [x]"
* If all items are selected, show "All Selected".