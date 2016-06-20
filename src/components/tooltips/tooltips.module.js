/**
 * @ngdoc overview
 * @name tooltips
 * @description
 * # tooltips Component
 *
 * The tooltip component provides styles to raw HTML
 * elements and custom directive templates.
 *
 * ## Usage
 *
 * Usage is the exact same as shown in the
 * [Angular-UI Bootstrap Documentation](https://angular-ui.github.io/bootstrap/#/tooltip).
 * See for further guidance on usage and configuration of this component.
 *
 * **NOTE:**  The `tooltip` directive and its optional attributes can **_only_** be
 * applied to raw HTML elements. They can't be applied to directives like this:
 * <pre>
 * // DOES NOT WORK
 *
 * <rx-button tooltip="...">
 * </pre>
 *
 * If you're creating your own custom directive, it's fine to use the `tooltip`
 * directive inside of your directive's template.  See the tooltips component
 * {@link /encore-ui/#/components/tooltips demo} for example usage.
 *
 * The [Angular-UI Bootstrap Tooltip](https://github.com/angular-ui/bootstrap/tree/master/src/tooltip)
 * plugin is included as a dependency for EncoreUI.
 */
angular.module('encore.ui.tooltips', []);
