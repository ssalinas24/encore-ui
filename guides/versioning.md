# EncoreUI Versioning

In order to help prevent regressions and allow applications time to incorporate any breaking changes, EncoreUI uses a 'pull' model for versioning. In order to get the latest version of EncoreUI, the application must update their version reference (versus EncoreUI automatically pushing down the latest version).

Encore follows the [Semantic Versioning](http://semver.org/) model for releases.

## Starting a new version

Versions aren't necessarily started. Instead, new code is built on top of an existing version. This does not mean that the new code replaces the existing version, just that a new version isn't created until the code is ready to be released to production. This enables us to decide what type of version change should occur after the code has been written, versus decided before.

This does mean that the master branch will contain updates not available in the latest version in production. In order to use the newest code, update your reference to pull from the staging site.

## Releasing a version

A new version is released every time a push to production (our CDN and to Bower) occurs. This will normally happen at least once per week. There are no specific criteria for a version to be released, other than features being ready for deployment.

Production deploys are done manually through the command line. To push to production, run `grunt shipit:[versionType]:updateDemo` (replacing [versionType] with 'major', 'minor' or 'patch').

So, if you wanted to increment from v0.1.0 to v0.1.1, you would run `grunt shipit:patch`.

**Note: This command is only intended to be used by core contributors. It will not work if you do not have the right permissions.**

A git tag is automatically created for every new version and each version is pushed to the Bower repo automatically through the `shipit` command.

The `updateDemo` argument tells `shipit` that it should update our demo application running at [http://rackerlabs.github.io/encore-ui/#/overview](http://rackerlabs.github.io/encore-ui/#/overview]. You should always do this when releasing a new version of the "latest" EncoreUI.

### Releasing hotfix versions

Normally when we do a release, it will be some version number increment over the latest version. If v0.1.0 is our latest, then the next version will be v0.1.1, or v0.2.0 or v1.0.0, depending on whether we use `patch`, `minor` or `major` with `shipit`.

In rare circumstances, we will need to perform an update to an _old_ version of EncoreUI.

For example, say that the latest version is v1.10.0. Any bugs we find will normally be fixed in the next update. But imagine a team whose product is currently running against an older version, say v1.8.0. In production, they find a bug in EncoreUI, but because of changes that went in to v1.9.0 and v1.10.0, migrating their product to the latest version of the framework is infeasible in the short term. What they need is a hotfix release, a v1.8.1.

The procedure for doing this is as follows:

 1. `git checkout -b version1.8.0 v1.8.0` (This checks out a new branch against our release tag `v1.8.0`.)
 2. Push this to github, `git push -u origin`
 3. Check out a fix branch, `git co -b fix_some_bug`
 4. Once the necessary fixes are made on this branch, push it to github, `git push -u origin`
 5. Create a PR from `fix_some_bug` to `version1.8.0`
 6. Once the PR is approved and merged into `version1.8.0`, do a `git pull` in your local `version1.8.0` branch to bring in the fix
 7. Now that you have the fix locally, do `grunt shipit:patch:hotfix`
 8. Make sure you also port that fix into the latest version of EncoreUI, either with `git cherry-pick`, or by hand

This will cause `v1.8.1` to be released. The differences from a normal release are that:

 1. There is no chance to pass the `updateDemo` value, so we know the demo application will not be updated
 2. When the new `v.1.8.1` of `rxPageObjects` is pushed to `npm`, `shipit` will explicitly tell `npm` _not_ to set this as the `latest` version

It's also important to note that publishing a hotfix will "mess" with our [Bower repository](https://github.com/rackerlabs/encore-ui-bower), but not in a way that matters. Specifically, everything gets pushed to `master` in Bower, thus pushing `v1.8.1` will now have `master` point to that instead of the newer `v1.10.0`. The reason this doesn't matter is that Bower only cares about annotated tags in the repository, it ignores the current state of `master`.


### Prereleases

We also support shipping "prelease" versions. These can be used when a given release is deemed feature complete, but you want an easy way to test it against released projects.

In particular, we support:

 * `grunt:shipit:premajor`
 * `grunt:shipit:preminor`
 * `grunt:shipit:prepatch`
 * `grunt:shipit:prerelease`

All of these follow the rules from [`grunt-bump`](https://github.com/vojtajina/grunt-bump#usage-examples)

In short, once all your desired PRs are merged to `master`, do one of the first three commands above. This will update the version number appropriately and append a `-0` to the end. i.e. if we are currently on version `1.10.0`, and you run `grunt:shipit:preminor`, a new version will be created at `1.11.0-0`. If this prerelease is deemed correct, do `grunt:shipit:minor` to "officially" release it as `1.11.0`. If instead more work is needed, merge in the PRs for that extra work, and run `grunt:shipit:prerelease`. This will take us from `1.11.0-0` to `1.11.0-1`. You can do as many `grunt:shipit:prerelease` versions as necessary, it will increment the trailing `-X` each time. And as before, finish with `grunt:shipit:minor` when you are ready for the official release.

## Production CDN and Bower

Production releases are hosted on Rackspace's Cloud Files CDN. The URL for production files is:
https://95c7050854423f809e66-6999ba0e7a4f47d417515fb3f08fa9b8.ssl.cf1.rackcdn.com/encore-ui-[version.number].js

The entire project is also installable via `bower`, registered as `encore-ui`.

See [the main readme](../README.md) for a link to the latest build.

### Github Permissions for Release
You'll need to be a member of the `encore-ui-admin` team in github to have proper permissions to release.

### Secret Files Needed to Release

For `grunt rxPageObjects`, you'll need to put the contents of the EncoreUI password safe entry for NPM in the project-local `.npmrc` file. This is located in the root of the project, and is ignored by git.

#### `.npmrc`
To publish `rx-page-objects` to the public npm registry.

0. `npm get registry` should return `https://registry.npmjs.org/`
1. `npm adduser --registry=https://registry.npmjs.org/`
  * Username: `encore-ui`
  * Password: Get from PasswordSafe > "Encore UI" > "npm" > "Node Package Manager Deploys"
2. From `~/.npmrc` move the line beginning with `//registry.npmjs.org` to a `.npmrc` file in the root of the repo.

## Stability Index

Because we're focused on delivering fast and continually improving, some components may be less stable/polished than others. To help with this, we're following the pattern set forth by the [Node Stability Index](http://nodejs.org/api/documentation.html#documentation_stability_index). To quote:

> Throughout the documentation, you will see indications of a section's stability. The Node.js API is still somewhat changing, and as it matures, certain parts are more reliable than others. Some are so proven, and so relied upon, that they are unlikely to ever change at all. Others are brand new and experimental, or known to be hazardous and in the process of being redesigned.

Each component is marked with a stability value. This reflects where it is in its lifecycle. All components should start as experimental and then move towards stable as it's polished. You can always find the stability index of a component in the README.md doc in the component's directory.
