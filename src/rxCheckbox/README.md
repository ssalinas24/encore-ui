[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

rxCheckbox is an **attribute directive** that wraps a native checkbox element in markup required for styling purposes.
To use the directive, you can replace `type="checkbox"` with `rx-checkbox`. The directive is smart enough to set the correct input type.


## Styling

* Directive results in an **inline-block element**
* You can style the output against decendents of the **`.rxCheckbox`** CSS class.


## Show/Hide

If you wish to show/hide your `rxCheckbox` element (and its label), we recommend placing the element (and its label) inside of a
`<div>` or `<span>` wrapper, and performing the show/hide logic on the wrapper.

```html
<span ng-show="isShown">
  <input rx-checkbox id="chkDemo" ng-model="chkDemo" />
  <label for="chkDemo">Label for Demo Checkbox</label>
</span>
```

It is highly recommended that you use `ng-show` and `ng-hide` for purposes of display logic. Because of the way that `ng-if` and `ng-switch`
directives behave with scope, they may introduce unnecessary complexity in your code.

