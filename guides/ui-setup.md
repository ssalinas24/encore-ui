# EncoreUI Developer Setup

This document is intended for developers that wish to make changes to EncoreUI itself, not for people who wish to use EncoreUI with their projects.

If this is your first time, you'll need to set up your coding environment to be able to build EncoreUI and work with git.

## Preparing your environment

1. Install git

    Many Mac OS X and Linux systems already have git installed. If your system doesn't, see [YUI's 'How to Set Up Your Git Environment'](http://yuilibrary.com/yui/docs/tutorials/git/) for instructions.

2. Install Node.js

    [Download and install Node.js](http://howtonode.org/how-to-install-nodejs) if you don't already have it installed. All of EncoreUI's build tools rely on Node.js.

3. Install NPM

    NPM is used to manage Node.js dependencies. If you don't already have it installed, follow [the NPM installation instructions](http://howtonode.org/introduction-to-npm) to get a copy.

4. Install NPM Dependencies
    * Short version
        `npm install -g grunt-cli bower
    * Long version
        * Install Bower
            [Bower](http://bower.io) is used to manage UI dependencies for use within the Encore application. Run `npm install -g bower` to install Bower.
        * Install Grunt
            [Grunt](http://gruntjs.com/) is used to automate the UI build and test tasks for Encore. Run `npm install -g grunt-cli` to install Grunt.
    * **Note:** in order to run the midway tests, you must pin your protractor & mocha installs to the versions above.

5. Install PhantomJS
    * Follow [the install instructions for your OS](http://phantomjs.org/download.html).

## Initial Encore Build

If you haven't already, clone the Encore repo.

`git clone git@github.com:rackerlabs/encore-ui.git`

Once downloaded, go into the new directory:

`cd encore-ui`

Finally, install the dependencies needed by EncoreUI using NPM and bower:

`npm install && bower install`

## Running EncoreUI

Run the following command:

`grunt server`

You can then open `http://localhost:9001` in a new browser and view the demo app. The page will automatically refresh when the code is updated.

## Running Browser Sync

It's important to develop new components while looking at both Firefox and Chrome. You can make this task much easier by running [browser sync](https://browsersync.io/) in a new terminal window after starting the local development server.

```
grunt browserSync
```

This will allow you to visit http://localhost:3000/ in both Firefox and Chrome at the same time (as well as any other browser you wish to sync, including your phone or tablet).

When you scroll in one browser, or device, all other connected browsers or devices will also scroll. This also includes clicking elements, visiting links, etc.

This tool is designed to forward all traffic from the typical development server located at http://localhost:9001 and sync it at the new location on port 3000. You can still visit the original development server without any side effects. Use of this tool is completely optional, but strongly recommended.

### Warning: EMFILE, too many open files 'src'

If you see the following [error when running `grunt server`](https://github.com/gruntjs/grunt-contrib-copy/issues/21#issuecomment-46194402):

```
Running "watch" task
Waiting...
Warning: EMFILE, too many open files 'src'
```

Run `launchctl limit maxfiles 10480 10480` in your terminal. Depending on your operating system, sometimes `launchctl limit maxfiles 2048 2048 && ulimit -n 2048` will work instead. You might also want to add that to your .bash_profile script.


## Creating a New Module

All functionality in EncoreUI is separated into different modules, with each module getting its own directory in the `src/` directory.

The best way to ensure you're adding a module that meets our requirements is by using our [Component Scaffolding](#component-scaffolding), which will take care of generating the initial module layout for you.

There is an expected file structure and filename scheme for module directories, which our [Component Scaffolding](#component-scaffolding) follows. For example, the `rxSearchBox` directory looks like this:

```
src/rxSearchBox
├── README.md
├── docs
│   ├── rxSearchBox.html
│   └── rxSearchBox.js
├── rxSearchBox.js
├── rxSearchBox.less
├── rxSearchBox.spec.js
└── templates
    └── rxSearchBox.html
```

Once you've created your new component, you can also generate the complementary test code as well. This is covered in the [Component Scaffolding](#component-scaffolding) section below. It populates the following tree into the `utils/rx-page-objects/` directory:

```
src/
├── rxSearchBox.page.js
└── rxSearchBox.exercise.js
test/
└── rxSearchBox.midway.js
```

These files are used to help you create a page object, default tests, and the integration tests used to prove that your new component behaves as expected during end to end testing in our CI pipeline.

If you are going to add a new module to EncoreUI, it must follow this structure. And not only is there an expected file, but some of these files have required "boilerplate" that must be present. The [Component Scaffolding](#component-scaffolding) not only generates these files, but also inserts the necessary boilerplate into them.

Make sure that you've added the necessary tests (to the `.spec.js` files), run the tests, and verify that your changes haven't broken anything. Please see our [EncoreUI Testing guide](./testing.md) guide for more details.

### Component Scaffolding

In order to promote consistency between components, and make it easier to create them, we use Grunt to provide scaffolding for new components.

In order to take advantage of the scaffolding, you need to install grunt-init globally:

```
npm install -g grunt-init
```

With grunt-init now installed, navigate to the `src` directory in EncoreUI.

Then create a new component folder and navigate into it, **with the name of your component in camelCase**. (e.g. `mkdir myTestComponent && cd myTestComponent`)

Once created, from that folder, run `grunt-init ../../grunt-tasks/component-template/`

Answer the questions prompted, let the task complete, and your new component folder should be ready for you to start coding away at. That's it.

To create your page object/exercise/end to end test code, go the root of the project directory, and run this.

```
grunt-init grunt-tasks/page-object-template
```

Because page objects can be named whatever they want, and be as granular as they want, you must specify the name of the component at the command line as the only prompt. Typically, it will match the same as your new directory you just created. Other times, such as in the case with rxForm, it makes more sense to break the page objects up into smaller chunks, such as checkboxes, dropdowns, instead of exposing one very large `rxForm` object with an enormous API surface.

## Modifying Existing Modules

If you are planning on modifying an existing module, either to add functionality or to fix a bug, keep the following in mind:

 * [Add tests!](./testing.md) Any new functionality needs corresponding tests, and a bug fix should first have a new test written that illustrates the error
 * Add documentation! New functionality _requires_ matching documentation.

## Testing Local EncoreUI Changes Against Applications

If you've made local changes to EncoreUI, you likely have an Encore application where you're hoping to use these changes, and you likely want to test those changes against a local instance of your application.

Depending on when your application was first created, it'll either be grunt-based or gulp-based. If it was created from the [EncoreUI Template (deprecated)](https://github.com/rackerlabs/encore-ui-template) or the [Encore Generator](https://github.com/rackerlabs/generator-encore), then it's gulp based.

### grunt-based applications

In our older EncoreUI-based applications, all Javascript and CSS dependencies had to be manually referenced in the application's `index.html` file. This usually looks like

```
<link rel="stylesheet" href="bower_components/encore-ui/encore-ui.css">
...
<script src="bower_components/encore-ui/encore-ui-tpls.min.js"></script>
```

When you've made local changes to EncoreUI, you want to tell the local instance of your application to get these resources from the EncoreUI development server, and _not_ from Bower.

 1. Make sure your EncoreUI development server is running, `grunt server`
 2. In Chrome, navigate to `http://localhost:9001`, open the Inspector, and click on the "Sources" tab
 3. Expand `localhost:9001 -> dist`, and you should see `encore-ui-resp-X.Y.Z.css` and `encore-ui-tpls-X.Y.Z` listed.
 4. Right-click on the `.css` file, select "Copy Link Address", and then replace the Bower CSS file in your `index.html` with this value
 5. Do the same for the `.js` file

You can now re-start your local application, and it will bring in the EncoreUI Javascript and CSS files directly from the EncoreUI development server, allow you to test your changes immediately.

### gulp-based applications

If your application is gulp-based (i.e. created with the EncoreUI Template or Encore Generator), then it will be much smarter about how to bring in these dependencies. Namely, the `index.html` file is auto-generated for these projects, no manual manipulation necessary. What we will do instead is provide a new "global symlink" for Bower to use when it's asked for `encore-ui`

 1. Go to `encore-ui/bower` in your EncoreUI directory
 2. Run `bower link`. Behind the scenes, this will create a global symlink in `~/.local/share/bower/links/`
 3. In your local application's directory, run `bower link encore-ui`. This will tell your application to grab EncoreUI from the local bower links, instead of from the official bower repositories. Restart your application.
 4. When you are done testing your EncoreUI changes in your local project, run `bower update` from your project directory. This will tell it to start using the official bower repositories once again.

Note that if you make further changes in your EncoreUI directory, you'll have to run `grunt copy:bower` from within the EncoreUI directory to cause these changes to become visible in the local symlink directory. Requiring this step is a failure on our part, and in the future we'll modify our EncoreUI `watch` task to make sure this happens automatically.
