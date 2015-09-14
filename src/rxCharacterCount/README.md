[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This provides an attribute directive intended for adding to `<textarea>` elements. Place the `rx-character-count` attribute into your `<textarea>`, and a new
`<div>` will be added directly underneath it. This directive requires that you're using `ng-model` with your `<textarea>`

This `<div>` will watch the content of the `<textarea>`, and display how many characters are remaining. By default, 254 characters are "allowed". If there are less than 10 characters remaining, the counter will go orange. If the user enters more than 254 characters, the counter will go red.

### Optional Parameters ###
The 254 and 10 values are both configurable. To change the maximum number of characters, add a `max-characters="50"` attribute to the element. For the low bound, add `low-boundary="5"`.

### Leading and Trailing characters ###
By default, any text field using `ng-model` has `ng-trim="true"` applied to it. This means that any leading and trailing spaces/blanks in your text field will be ignored. They will not count towards the remaining character count. If you want it to count leading/trailing spaces, then just add `ng-trim="false"` to your `<textarea>`.

### Styling ###
When specifying a width other than the default, you should style some built-in classes in addition to the text field itself. As in the demo, the `.input-highlighting` class should have the same width as the text field (if highlighting is used), and the `.counted-input-wrapper` should be used to correctly position the counter.

### ngShow/ngHide/ngIf/ngSwitch/etc. ###
If you wish to show/hide your `textarea` element, we recommend placing the element inside of a `<div>` or `<span>`, and doing the `ng-show` / `ng-hide` /etc. on that `div` / `span`. For example,

```
<span ng-show="isShown">
  <textarea rx-character-count>{{someValue}}</textarea>
</span>
```

We _do_ have preliminary support for putting these directives directly inside the `textarea`, i.e.

```
<textarea rx-character-count ng-show="isShown">{{someValue}}</textarea>
```

But this support should be considered experimental. If you choose to take advantage of it, please ensure you've extensively tested that it performs correctly for your uses.

### Highlighting ###
Characters that are over the limit will be highlighted in red if the `highlight="true"` attribute is on the directive's element. Because this functionality is currently unstable, it has been left off by default. Please test your use case heavily before shipping with this feature enabled.

Known failure cases:
* Content that causes a scrollbar in the textarea
* Initial text (coming from the model) that is over the limit
