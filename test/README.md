# Testing JSDoc

JSDoc uses [Jasmine](https://github.com/jasmine/jasmine) as its testing framework. See the
[Jasmine documentation](https://jasmine.github.io/pages/docs_home.html) for details.

## Running tests

Clone the GitHub repository; change to its directory; and run the following commands:

    npm install
    node jsdoc.js -T

## Writing tests

You can write tests for all of the following:

+ **JSDoc itself**. See the `test` directory. Test specs are in `test/specs`, and fixtures used by
the tests are in `test/fixtures`.
+ **Plugins**. See the `plugins/test` directory.
+ **Packages**. See the `packages/**/test` directories.
