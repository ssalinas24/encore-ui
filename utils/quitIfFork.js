#!/usr/bin/env node

'use strict';

let errorMessage = `
*************************************************************
*************************************************************
*******************  "YOU SHALL NOT PASS"  ******************
*************************************************************
*************************************************************

Stop pushing from forks! This is to remind you that all builds should be targeting rackerlabs/encore-ui.
For most people seeing this message, it means to stop running "git push origin branch-name", and start
running "git push upstream branch-name" when creating pull requests. To fix this:

If you are not a Rackspace employee:

1. Thank you for your interest in making EncoreUI better.
2. Make a comment on the pull request mentioning @rackerlabs/encore-ui-admin stating that you need your PR reviewed.

We'll do our best to make sure that someone can clone your branch and re-run it for you to make sure that
it passes all of our quality checks. In the meantime, thank you for your patience.

Otherwise:

1. Close the PR associated with this travis build.
2. Push the exact same branch up to the upstream remote located at git@github.com:rackerlabs/encore-ui.git
3. Create a new pull request.
`;

if (process.env.TRAVIS_SECURE_ENV_VARS === 'false') {
    console.error(errorMessage);
    process.exit(1);
};
