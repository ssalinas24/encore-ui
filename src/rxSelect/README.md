[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

The rxSelect component is an **attribute directive** that wraps native select elements in markup required for styling.

## Styling

* Directive results in a **block element** that takes up the *full width of its container*.
* You can style the output against decendents of the **`.rxSelect`** CSS class.

## Show/Hide
If you wish to show/hide your `rxSelect` element, we recommend placing it within a `<div>` or `<span>`
wrapper, and performing the show/hide logic on the wrapper.

```html
<span ng-show="isShown">
  <select rx-select ng-model="selDemo">
    <option value="1">First</option>
    <option value="2">Second</option>
    <option value="3">Third</option>
  </select>
</span>
```

It is highly recommended that you use `ng-show` and `ng-hide` for display logic. Because of the way that
`ng-if` and `ng-switch` directives behave with scope, they may introduce unnecessary complexity in your code.
