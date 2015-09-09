# Introduction to Testing

In order to support continuous development/integration, taking advantage of automated testing is a must. While the goal of automated testing is to provide full coverage, it also needs to be seamlessly integrated into the developer environment. This document describes the testing setup for EncoreUI.

Configuration Files
-------------

More details on these files are found in the files themselves

**karma.conf.js** - Used by component unit tests

**protractor.conf.js** - Used by our midway/E2E tests

**protractor.visual.regression.js** - Used by our visual regression tests (Travis CI only)


Component Tests (aka unit tests)
-------------

*Goal: Tests smallest piece of functionality or method*

 - Code level tests
 - Uses [Karma](http://karma-runner.github.io) + [Mocha](http://mochajs.org/) + [Chai](http://chaijs.com/) + [Sinon](http://sinonjs.org/)
 - Stored in same location as code (separate file with \*.spec.js)
 - Best for testing services, classes and objects
 - Does contain "functional" tests (can test browser interactions like 'click')
 - Sandboxed & Isolated testing
 - Mocking & Stubbing required
 - Fast

Unit tests automatically execute when running `grunt server`. It's best to run your tests in this fashion, as they automatically re-run on file changes.

If you wish to run them separately, use `grunt test`. To aid in debugging unit tests, you can use `grunt test:debug`. [Details on this are explained below](#debugging-unit-tests).

### Testing Individual Components

When developing a specific component, you likely don't want to run the entire test suite on every change. In order to test a single set of functionality, use the 'only' function when describing your test. For example:

```js
describe.only('Login', function () {
    // ... tests go here ...
});
```

**Be sure to remove the `only` once you're done.**

### Code Coverage

Code coverage stats for our component tests are generated every time the test suite is executed. To view the stats, simply open the index.html file in any of the browser directories in the 'coverage' directory. **Note**: the coverage directory only exists when the server is running.

### Debugging Unit Tests

When writing or debugging unit tests and code, it can be helpful to enter the Chrome debugger to step through lines of code and inspect variables. The command `grunt test:debug` configures your environment to do this. To use it:

 1. Run `grunt test:debug`. This will open a new Chrome window and runs all the tests
 2. Open the Inspector in Chrome (`Command-Option-i` on a Mac), and reload the Chrome page (`Command-R` / `Ctrl-R` / etc.). This will re-run all the tests
 3. Insert a `debugger` statement somewhere in your code or your tests. The tests will automatically re-run when you save your file.  Now when the tests re-run, they will pause in the Inspector at the `debugger` statement (automatically switching to the "Sources" tab), allowing you to step through and inspect!

Especially when debugging tests, it can be useful to use the [individual component testing](#testing-individual-components) technique above, so you don't have to wait for all 600+ tests to run every time you save a file or reload the Chrome page.



Midway Tests
-------------

*Goal: Validate our component in a full browser*

 - Uses an example instance of the component
 - Uses [Selenium](https://code.google.com/p/selenium/wiki/WebDriverJs), [Protractor](https://github.com/angular/protractor/), [Astrolabe](https://github.com/stuplum/astrolabe)
 - Somewhat slow
 - Story Based

### Running Tests

In order to run the midway test suite, you will need a Selenium server running. To install and run Selenium, execute the webdriver-manager. To do this, open a new terminal window and run the following from the `encore-ui` directory:

```
./node_modules/.bin/webdriver-manager update # First time only
./node_modules/.bin/webdriver-manager start
```

This will launch the selenium server. It can sometimes take 25-30 seconds to fully launch, and you'll know it's ready when you see this at the bottom of the terminal:

```
INFO - Started SocketListener on 0.0.0.0:4444
INFO - Started org.openqa.jetty.jetty.Server@401363ff
```

Make sure you keep this terminal window running!

To run all tests, enter `./node_modules/.bin/protractor` from the `encore-ui` directory, in a different terminal. You need to ensure that you already have a development server running. If you haven't already, run `grunt server` in a separate terminal. You will need to keep this running in the background through the entirety of the midway tests.

In other words, to run the tests, you need a total of _three_ terminal windows.

 * One terminal running the Selenium server
 * One terminal running `./node_modules/.bin/protractor`
 * One terminal running `grunt server`

#### Testing Individual Components

When developing a specific component, it's much quicker to run tests only for that component (rather than run through the entire suite every time). To do this, pass in path to the file as a 'specs' option in your protractor command. For example:

```
./node_modules/.bin/protractor --specs=src/rxComponent/docs/rxComponent.midway.js
```

### Convenience Page Objects

In order to help developers more easily test their own apps/projects, each EncoreUI component should provide a page object file for itself. This file will provide convenience methods for the tester to use when writing midway tests for their app.

The filename for these page objects follows the `componentName.page.js` convention, and will automatically be generated if you create a new EncoreUI component with the [Component Scaffolding](./ui-setup.md#component-scaffolding)

On a build of EncoreUI, all page object files are concatenated and tarballed into the `dist` directory. They are then published either manually or via Travis. To use these page objects, developers should include the following dependency in their app's `package.json` file:

    "rx-page-objects": "rx-page-objects-1.29.0.tgz"

Alternatively, they can install the file using this command:

    npm install --save-dev rx-page-objects@1.7.1

Once installed, the page objects can be pulled in to any midway test via:

```js
var someEncoreUIComponent = require('rx-page-objects').someEncoreUIComponent;
// ...
expect(someEncoreUIComponent.main.rootElement.isDisplayed()).to.eventually.be.true;
```

Alternatively, you could place this helper library in the global scope of all tests. This is the recommended way. In your project's protractor config file, add this to your `onPrepare` section.


```js
onPrepare: function () {
    encore = require('rx-page-objects');
}
```

Keep in mind you'll need to register a global variable declaration in your linting file (`.jshintrc`, etc.).

### Some odd patterns in the page object source code...

If you see a page object asking for another component, it will do so using this.

```js
var otherComponent = exports.otherComponent.intialize(/*...*/);
```

It does this because as a part of the publishing step of the rx-page-objects module, all files in `src/**/*/page.js` are concatenated together, meaning the `exports` call will be valid during end to end test runs. The reason this is done this way is because *in the past*, requiring a component in a page object meant traversing the library's directory to find the component.

```js
// Old way of requiring a component
var otherComponent = require('../../otherComponent/otherComponent.page').otherComponent;
```

Not only is this very verbose, it lead to errors when end to end tests would pass during development (the directory structure is there to support this if you develop on the component library) but would fail when another team would pull in rx-page-objects into their project! Now, all end to end test runs (even local ones during development) rely on the concatenated version of the rx-page-objects module. If you see the global `encore` variable used throughout the midway tests, this is because the concatenated file is pulled into this global variable. Use it when referring to anything that should be tested in your midways. In almost all cases, it's best to follow the existing [component-template](../grunt-tasks/component-template/root/docs/component.midway.js) when creating new midway tests.

Speaking of concatenating all page object files together, the code located at the top of the [grunt concat](../grunt-tasks/options/concat.js) task includes a list of third-party node modules used throughout the page objects and exercises. When requiring a new dependency into a page object or exercise, check that list and make sure it is included! It will make sure that the `index.js` and `exercise.js` files that get published by `grunt rxPageObjects` does not have duplicate `require` calls scattered throughout it.

### Convenience Page Object Exercises

Convenience page objects exist to abstract away many of the tedious commands needed to direct a component during tests that prove high-level business functionality in your tests. However, many tests should still be run to ensure that your app's encore-ui components were "wired up" correctly. They should respond to activities that many users will exercise during normal operation. Instead of duplicating these tests in every instance of a component in your app, you can include that page object's exercise using this pattern:

```js
// assuming you've included `encore = require('rx-page-objects')` in your protractor conf's onPrepare step
describe('Home Page', function () {

    before(function () {
        loginPage.login();
        homePage.search('My Term');
    });

    it('should have a pagination component present', function () {
        expect(homePage.resultsTable.pagination.rootElement.isPresent()).to.eventually.be.true;
    });

    // you can skip many tests by simply doing this instead
    describe('search result pagination', encore.exercise.rxPaginate({
        cssSelector: '.my-table .rx-paginate'
    }));

});
```

The above snippet would run a couple dozen basic tests, assuming there are no edge cases in your app's implementation of the pagination component. Examples of such edge cases might be having less than three pages of total pagination space, or defaulting to a very large or small number of results by default.

### Handling Edge Cases in Exercises

If you do have edge cases, many of the exercises support passing in an `options` argument, which should be documented in the [npm home page for rx-page-objects](https://www.npmjs.com/package/rx-page-objects). This allows you to specify aspects of a particular component's implementation to the exercise function, allowing it to skip certain tests that are not valid.

UI Regression Tests
-------------------

*Goal: Prevent visual regressions by making it easier to compare changes*

[encore-ui-screenshots](https://github.com/rackerlabs/encore-ui-screenshots) is used in EncoreUI for UI regression testing. Currently, it will compare the visual elements of the master branch with your branch during Travis CI pull request runs.

### Running Tests

Simply put, you shouldn't run these tests! They run invisibly on the Travis CI server only. This keeps contributors from checking out megabytes of image comparison files that aren't necessary for development.

But if you do want to run the tests, feel free to run them by themselves to populate a fresh copy of screenshots locally:

```
npm install snappit-mocha-protractor
./node_modules/.bin/protractor protractor.visual.regression.conf.js
```

This is useful only for experimenting with what your screenshots look like *on your current operating system*, at *your current resolution*, and your *specific version of your browser*! This is why it is recommended that you refrain from running these tests locally. They are designed to run on one machine and one machine only, to ensure that any visual regressions are triggered by visual changes, and not differences in hardware or software.

### Triggering Visual Regression Runs on Travis

In order to get a visual regression to run against your PR, **you must push your pull request directly to the remote repository located at `rackerlabs/encore-ui`, and not a fork**. Travis CI will not expose encrypted environment variables to forks that request a build from Travis (this prevents attackers from dumping your encrypted variables to console via a pull request).

Visual regressions include posting an reference link from a pull request in the encore-ui-screenshots repository to the current pull request. It looks like this:

![A pull request with a screenshot mention.](https://cloud.githubusercontent.com/assets/1214609/7617973/73d8f30c-f974-11e4-9824-141138a13f30.png)

Click the reference link to the encore-ui-screenshots pull request, and check out the "Files" tab to see any visual changes introduced in the pull request.

### Creating a New Baseline for Visual Regression

Once a pull request has been visually signed off on, it should become the new baseline which all new pull requests are compared against. Do this by visiting the link to the encore-ui-screenshots pull request and merging it. From then on, Travis CI pull request builds will pull *those* screenshots and compare against them from now on.

### Creating New Visual Regression Tests

The visual regression tests are located in [the `utils/visual-regression` directory](../utils/visual-regression). Inside that, there is a directory for `layouts` (typically reserved for pages that demonstrate how a typical EncoreUI layout should look), and a directory for components.

When adding a new visual regression test, remember to keep the names of the tests short. The screenshot comparison library creates the image names based on the test names, so there's no need to be very specific.

Each `it()` block describes an individual visual regression test. `screenshot.snap()` is used to grab an area of the screen, and compare it to the current visual baseline, checking for changes. Any detected change will cause a visual diff to be created, with a link to it automatically added to the PR.

Here's an example of a basic visual regression test for a single component.

```js
// utils/visual-regression/components/rxComponent.midway.js
var rxComponent = exports.rxComponent;

describe('demo component', function () {

    before(function () {
        demoPage.go('#/components/rxComponent');
    });

    it('default', function () {
        // default screenshot of just the component -- no interaction yet
        screenshot.snap(this, $('.tab-content rx-component'));
    });

    it('interactive', function () {
        rxComponent.main.interactWith(); // trigger some click that expands something
        // this will capture the component in its current "interacted" state
        screenshot.snap(this, rxComponent.main.rootElement));
    });

});
```
