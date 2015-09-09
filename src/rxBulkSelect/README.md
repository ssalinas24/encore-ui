[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

Used to perform an action on multiple items in a table.

# Directives

All of the following directives should be used when implementing Bulk Select in a table.

## rxBulkSelect

rxBulkSelect is an **attribute** directive that decorates a `<table>` to provide an api for the rest of the directives.  It requires the list that is used to populate the table and a unique key (e.g. anything that doesn't interfere with the object for a row) to save the selection state of each row.  These are the `bulk-source` and `selected-key` attributes, respectively.  The optional `resource-name` attribute is used to write the message that is displayed when rows are selected, e.g. "2 servers are selected".  When not included, it defaults to the `bulk-source` variable name (with the trailing "s" removed, if applicable).

```html
<table rx-bulk-select bulk-source="servers" selectedKey="rowIsSelected"></table>
```

The directive is also responsible for adding a row to the table header that indicates how many rows are selected and contains buttons to select or deselect all the rows at once.

Each of the following directives are only valid when used inside a table with rxBulkSelect.

## rxBulkSelectHeaderCheck

This **attribute** directive is placed on the `<th>` element to add a checkbox to it's content.
```html
<th rx-bulk-select-header-check></th>
```

## rxBulkSelectRow

Like `rxBulkSelectHeaderCheck`, this is an **attribute** directive that inserts a checkbox to a `<td>`'s content.  Its usage is the same, except that the directive needs a reference to the object for that row, e.g.:
```html
<tr ng-repeat="server in servers">
    <td rx-bulk-select-row row="server"></td>
</tr>
```

## rxBatchActions

This directive is used to provide links for the batch actions in a hideable menu in the table header, behaving similar to [rxActionMenu](#/components/rxActionMenu).  It is used as a list-wrapper element (e.g. `<ul>`), and it **must** be placed as a direct child of a `<th>` element.

```html
<tr>
    <th colspan="4">
        <rx-batch-actions>
            <li>
                <rx-modal-action></rx-modal-action>
            </li>
        </rx-batch-actions>
    </th>
</tr>
```

## rxBulkSelectValidate

rxBulkSelectValidate is an **attribute** directive that can accompany the rxBulkSelect directive to provide validation inside a `<form>`. It renders a form invalid until at least one item in the table has been selected.

```html
<rx-modal-form>
    <table rx-bulk-select rx-bulk-select-validate bulk-source="servers" selectedKey="rowIsSelected">
    </table>
</rx-modal-form>
```

# Styling

The styles for the table are applied just by using the directives.  There are no directives provided for the modal, but it should follow a few design conventions:
* The first view has a warning at the top, and a table listing the selected items. The table should be paginated with 8 items per page, and items may be removed via an "X" icon (see the [Delete "X" action](#/styleguide/tables)).
* In the second view, the table has a status column with text describing the state of each item, and another column with an icon to indicate the state. A [progressbar](#/components/progressbar) should be included as well as a link that opens the current page in a new tab.
* Once the process is complete a "Return to [x]" button should appear in the footer, and the progressbar should be replaced with some text indicating the process is complete.
