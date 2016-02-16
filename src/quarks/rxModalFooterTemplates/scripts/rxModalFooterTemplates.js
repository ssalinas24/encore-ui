angular.module('encore.ui.quarks')
/**
 * @ngdoc service
 * @name quarks.service:rxModalFooterTemplates
 * @description
 * A cache for storing the modal footer templates
 * This is used internally by rxModalFooter, which is preferred
 * for registering templates over direct calling of this api.
 *
 * @example
 * <pre>
 * rxModalFooterTemplates.add("step1", "<p>Step 1 Body</p>");
 * rxModalFooterTemplates.flush(); // returns html string to be inserted into DOM
 * </pre>
 */
.factory('rxModalFooterTemplates', function () {
    var globals = {};
    var locals = {};

    return {
        /*
         * Concatenates all the registered templates and clears the local template cache.
         * @public
         * @returns {string} The concatenated templates wrapped in an `ng-switch`.
         */
        flush: function () {
            var states = _.assign({}, globals, locals);
            locals = {};
            return _.values(states).reduce(function (html, template) {
                return html + template;
            }, '<div ng-switch="state">') + '</div>';
        },
        /*
         * Register a template with an associated state.
         * @public
         * @param {string} The state being registered.
         * @param {string} The template associated with the state.
         * @param [object} options
         * @param {boolean} options.global Indicates if the template is used in other modals.
         */
        add: function (state, template, options) {
            if (options.global) {
                globals[state] = template;
            } else {
                locals[state] = template;
            }
        }
    };
});
