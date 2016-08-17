angular.module('encore.ui.elements')
/**
 * @name elements.directive:rxFieldContent
 * @ngdoc directive
 * @restrict E
 * @description
 * Structural element directive used for layout of sub-elements.
 * This element is used to wrap the actual content markup for your
 * controls, labels, help text, and error messages.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**block** *(full width of parent)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>{@link elements.directive:rxField rxField}</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link elements.directive:rxFieldName rxFieldName}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 *
 *   <dt>Children:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link elements.directive:rxInput rxInput}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form>
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>
 *          <i class="fa fa-exclamation"></i>
 *          Important Field Name
 *       </rx-field-name>
 *       <rx-field-content>
 *          <rx-input>...</rx-input>
 *       </rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxFieldContent', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxField'
    });
});
