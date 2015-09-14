[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A simple boolean toggle switch.

The switch shows the states of 'ON' and 'OFF', which evaluate to `true` and `false`, respectively.  The model values are configurable with the `true-value` and `false-value` attributes.

** Note: If the value of the model is not defined at the time of initialization, it will be automatically set to the false value. **

The expression passed to the `post-hook` attribute will be evaluated every time the switch is toggled (after the model property is written on the scope).  It takes one argument, `value`, which is the new value of the model.  This can be used instead of a `$scope.$watch` on the `ng-model` property.  As shown in the demo, the `disabled` attribute can be used to prevent further toggles if the `post-hook` performs an asynchronous operation.
