angular.module('encore.ui.elements')
/**
 * @name elements.directive:rxHelpText
 * @ngdoc directive
 * @restrict E
 * @description
 * Stylistic element directive used to wrap form input help text.
 *
 * * **block** element *(full width of parent)*
 * * Best used as a sibling after {@link elements.directive:rxInput rxInput},
 *   but before {@link elements.directive:rxInlineError rxInlineError} elements.
 *
 * @example
 * <pre>
 * ...
 * <form rx-form name="demoForm">
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>Salary:</rx-field-name>
 *       <rx-field-content>
 *         <rx-input>
 *           <rx-prefix>$</rx-prefix>
 *           <input type="number" name="salary" />
 *           <rx-suffix>Million</rx-suffix>
 *         </rx-input>
 *         <rx-help-text>Must be greater than $1,000,000</rx-help-text>
 *         <rx-inline-error ng-show="demoForm.salary.$errors.minimum">
 *           Salary must be above $1,000,000
 *         </rx-inline-error>
 *       </rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxHelpText', function () {
    return {
        restrict: 'E'
    };
});
