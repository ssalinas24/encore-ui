[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

The rxForm component is a set of directives used to create forms throughout
Encore.  These directives provide a common HTML layout and style for all form
elements, which helps ensure form accessibility and makes creating advanced
forms easier.


# Services
## rxFormUtils

Provides a set of utility functions for accessing form data.

*NOTE: Nothing changed with this service in the update. You may continue to
use this service as usual.*


# Directives
## Hierarchical
To provide a standard layout of form fields (and so CSS rules can apply that layout), most of the new directives must be nested in a specific hierarchy.
If you do not nest these elements properly, Angular will throw an error (this is by design). So, rule of thumb, aim for 0 console errors.

These directives must be nested in the following hierarchy (*parens denote how many items can be nested within its parent*):

* [rxForm](ngdocs/index.html#/api/rxForm.directive:rxForm)
  * [rxFormSection](ngdocs/index.html#/api/rxForm.directive:rxFormSection) (0..N)
    * [rxField](ngdocs/index.html#/api/rxForm.directive:rxField) (0..N)
      * [rxFieldName](ngdocs/index.html#/api/rxForm.directive:rxFieldName) (0..1)
      * [rxFieldContent](ngdocs/index.html#/api/rxForm.directive:rxFieldContent) (0..1)
        * [rxInput](ngdocs/index.html#/api/rxForm.directive:rxInput) (0..N)
          * [rxPrefix](ngdocs/index.html#/api/rxForm.directive:rxPrefix) (0..1)
          * [rxSuffix](ngdocs/index.html#/api/rxForm.directive:rxSuffix) (0..1)

## Free-Range
These directives are not limited to their placement and can be used anywhere:

* [rxHelpText](ngdocs/index.html#/api/rxForm.directive:rxHelpText)
  * Designed to style form control help text.
* [rxInlineError](ngdocs/index.html#/api/rxForm.directive:rxInlineError)
  * Designed to style form control error messages.

## Compatible Components
These components work well with rxForm.

* [rxButton](#/components/rxButton)
* [rxCharacterCount](#/components/rxCharacterCount)
* [rxCheckbox](#/components/rxCheckbox)
* [rxMultiSelect](#/components/rxSelectFilter) *(defined in `rxSelectFilter`)*
* [rxOptionTable](#/components/rxOptionTable)
* [rxRadio](#/components/rxRadio)
* [rxSearchBox](#/components/rxSearchBox)
* [rxSelect](#/components/rxSelect)
* [rxToggleSwitch](#/components/rxToggleSwitch)
* [typeahead](#/components/typeahead)


# Layout

## Stacked Field Arrangement
By default, `rx-form-section` will arrange its children inline, in a row.  To
obtain a stacked, columnar layout for a particular section, place the `stacked`
attribute on the `rx-form-section` element.  This will arrange the `rx-field`
and `div` children elements in a columnar fashion.  This can be used in
conjunction with sections taking the full width of the form.

*See "Advanced Inputs" in the demo for an example.*

## Responsive
`rx-field` and `div` elements that are immediate children of `rx-form-section` will
grow from 250px to full width of the section.  As such, you will see that these elements
will wrap in the section if there's not enough width to accomodate more than one child.

*You can see this in sections below if you resize the width of your browser.*


# Validation

## Required Fields
When displaying a field that should be required, please make use of the `ng-required`
attribute for rxFieldName.  When the value evaluates to true, an asterisk will
display to the left of the field name.  You can see an example of this with the
"Required Textare" field name in the demo.

See [rxFieldName](ngdocs/index.html#/api/rxForm.directive:rxFieldName)
API Documentation for more information.

## Custom Validators

Angular provides its own validator when you use `type="email"`, and you can use
`<rx-inline-error>` to turn email validation errors into a styled message.  You
can also use this element if you define a custom validator.

### Foocheck validator
The example shown in the "Email Address" example, uses a custom `foocheck`
validator. Note that it is enabled by placing the `foocheck` attribute in the
`<input>` element, and using it with `ng-show="demoForm.userEmail.$error.foocheck"`.
Check out the Javascript tab in the demo below to see how this validator is
implemented.

There are plenty of examples online showing the same thing.


# Migrating Old Code

## Deprecated Directives
**The following directives have been deprecated and *will be removed* in a future
release of the EncoreUI framework.** They are still functional, but **WILL display
a warning in the javascript console** to let you know you should upgrade your code.

### **rxFormOptionTable**
Please use [`rxOptionTable`](#/components/rxOptionTable) as a stand-in replacement.

### **rxFormItem**
See "Before & After" below

### **rxFormFieldset**
Closest equivalent is to use `rxFormSection`. Your individual project requirements
will vary, but the `legend` attribute can be replaced with a `.title` heading
variant where applicable.

* If your legend pertains to at least one row, place a `.title` heading variant
  before the desired `rx-form-section` element.
* If your legend pertains to controls in a single column, place a `.title` heading
  variant within the `rx-field` element, at the top.

## Before &amp; After
The `rxFormItem` has been found to be incredibly brittle and prone to breakage.
The new markup may look a little wordy, but it is designed to provide enough
flexibility for advanced field inputs. To be explicit, the new directives were
designed based on feedback around:

* applying custom HTML markup for `label`, `description`, `prefix`, and `suffix`
  properties
* standardizing form layout functionality
* eliminating unnecessary CSS class definitions

The following are some examples comparing what code looked like using the old
directives versus the new directives.

### Email Address
#### Before
```
<form name="demoForm">
  <rx-form-item label="Email address" description="Must contain foo.">
    <input name="userEmail" type="email" ng-model="details.email" foocheck />
    <div ng-show="demoForm.userEmail.$error.email" class="inline-error">
      Invalid email
    </div>
    <div ng-show="demoForm.userEmail.$error.foocheck" class="inline-error">
      Your email address must contain 'foo'
    </div>
  </rx-form-item>
</form>
```

#### After
```
<form name="demoForm" rx-form>
  <rx-form-section>
    <rx-field>
      <rx-field-name>Email address:</rx-field-name>
      <rx-field-content>
        <rx-input>
          <input name="userEmail" type="email" ng-model="details.email" foocheck />
        </rx-input>
        <rx-help-text>Must contain foo.</rx-help-text>
        <rx-inline-error ng-show="demoForm.userEmail.$error.email">
          Invalid email
        </rx-inline-error>
        <rx-inline-error ng-show="demoForm.userEmail.$error.foocheck">
          Your email address must contain 'foo'
        </rx-inline-error>
      </rx-field-content>
    </rx-field>
  </rx-form-section>
</form>
```

### Monthly Cost
#### Before
```
<form name="demoForm">
  <rx-form-item label="Monthly Cost" prefix="$" suffix="million">
    <input type="number" ng-model="volume.cost" />
  </rx-form-item>
</form>
```

#### After
```
<form name="demoForm" rx-form>
  <rx-form-section>
    <rx-field>
      <rx-field-name>Monthly Cost:</rx-field-name>
      <rx-field-content>
        <rx-input>
          <rx-prefix>$</rx-prefix>
          <input type="number" ng-model="volume.cost" />
          <rx-suffix>million</rx-suffix>
        </rx-input>
      </rx-field-content>
    </rx-field>
  </rx-form-section>
</form>
```
