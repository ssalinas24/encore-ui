[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

An **element directive** used to create buttons with a dynamically-displayed loading indicator. This is used as a replacement for `<button>` elements in scenarios where the button has multiple states.

## Usage

The state of the button is controlled via the `toggle` attribute, which disables the button and replaces the `default-msg` with the `toggle-msg` as the button's text.  There are no defaults for these messages, so they must be defined if the toggle behavior is desired.  While the button is in the toggled state, it is also disabled (no matter what the value of `disable` is.

The button does not modify the variable passed to `toggle`; it should be modified in the handler provided to `ng-click`.  Usually, the handler will set the variable to `true` immediately, and then to `false` once the the process (e.g. an API call) is complete.

To disable the button, use the `disable` attribute instead of the normal `ng-disabled` - the behavior is the same.

## Styling

There are several styles of buttons available, and they are documented in the [styleguide](#/styleguide/buttons).  Any classes that need to be added to the button should be passed to the `classes` attribute.
