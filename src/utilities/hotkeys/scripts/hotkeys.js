/**
 * @ngdoc service
 * @name utilities.service:hotkeys
 * @description
 * # hotkeys
 *
 * This utility is simply a reference guide to using
 * [the angular-hotkeys plugin](http://chieffancypants.github.io/angular-hotkeys/)
 * from within EncoreUI.
 *
 * Angular-hotkeys was chosen as the solution for hotkeys from within EncoreUI apps,
 * due to its integration into Angular, it's use of the very good 'mousetrap' library,
 * and because it allows multiple ways to define hotkeys (through a directive, controller,
 * route config, etc).
 *
 * ## Global Shortcuts
 *
 * Currently there is only one global shortcut key defined (`h`). This will collapse/expand
 * the main menu on any page. More keys can be added as need for them is identified
 * (suggestions welcome!).
 *
 * ## Shortcut Keys
 *
 * Because browsers and operating systems have a long list of defined shortcut keys,
 * it can be difficult to find a keybinding that isn't already taken. When choosing a
 * shortcut key for your app, you can avoid most conflicts by simple leaving off the
 * modifier key (e.g. `ctrl`).
 *
 * For Encore, the best practice is to use a single letter for your keystroke. For example,
 * the global key to show/hide the rxApp menu is simply `h`.
 *
 * If you'll be defining multiple shortcuts related to a specific set of actions, consider
 * a combination of two letters, where the first letter is the same for all keystrokes. For
 * example, an account menu might have the following shortcuts:
 *
 * - `a` `n` Creates a new account
 * - `a` `v` Views the selected account
 * - `a` `d` Deletes the selected account
 *
 * ## Identifying shortcut keys
 *
 * If you provide a description, the shortcut will be defined in a helper list provided
 * when the user presses the `?` key. Currently there is no official guidance on a design
 * pattern to identify to end-users what particular shortcuts are outside of the standard
 * help window.
 *
 */
