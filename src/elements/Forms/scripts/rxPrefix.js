angular.module('encore.ui.elements')
/**
 * @name elements.directive:rxPrefix
 * @ngdoc directive
 * @restrict E
 * @description
 * Structural element directive used to wrap content to be placed
 * inline with a form control element.
 *
 * * Best placed before a form control element.
 *
 * <dl>
 *   <dt>Display:</dt>
 *   <dd>**inline block** *(only as wide as necessary for content)*</dd>
 *
 *   <dt>Parent:</dt>
 *   <dd>{@link elements.directive:rxInput rxInput}</dd>
 *
 *   <dt>Siblings:</dt>
 *   <dd>
 *     <ul>
 *       <li>{@link elements.directive:rxInfix rxInfix}</li>
 *       <li>{@link elements.directive:rxSuffix rxSuffix}</li>
 *       <li>Any HTML Element</li>
 *     </ul>
 *   </dd>
 *
 *   <dt>Children:</dt>
 *   <dd>Any HTML Element</dd>
 * </dl>
 *
 * @example
 * <pre>
 * ...
 * <form rx-form>
 *   <rx-form-section>
 *     <rx-field>
 *       <rx-field-name>Salary:</rx-field-name>
 *       <rx-field-content>
 *         <rx-input>
 *           <rx-prefix>$</rx-prefix>
 *           <input type="number" />
 *           <rx-suffix>Million</rx-suffix>
 *         </rx-input>
 *       </rx-field-content>
 *     </rx-field>
 *   </rx-form-section>
 * </form>
 * ...
 * </pre>
 */
.directive('rxPrefix', function (rxNestedElement) {
    return rxNestedElement({
        parent: 'rxInput'
    });
});
