Testing JSDoc 3
===============

Running Tests
-------------

Running tests is easy.  Just change your working directory to the jsdoc folder
and run the following command on Windows:

    jsdoc -T

... or on a Max OSX or *nix platform:

    ./jsdoc -T

If you can't get the short-form commands to work, try invoking Java directly:

    java -cp lib/js.jar org.mozilla.javascript.tools.shell.Main \
    -modules node_modules -modules rhino_modules -modules . \
    jsdoc.js -T

Writing Tests
-------------

Adding tests is pretty easy, too.  You can write tests for jsdoc itself (to 
make sure tags and the parser, etc. are working properly), tests for plugins, and/or
tests for templates.

JSDoc 3 uses Jasmine (https://github.com/pivotal/jasmine) as its testing framework.
Take a look at that project's wiki for documentation on writing tests in general.

### Tests for JSDoc

And take a look at the files in the ```test``` directory for many examples of
writing tests for JSDoc itself.  the ```test\fixtures``` directory hold fixtures
for use in the tests and the ```test\tests``` directory holds the tests themselves.

### Tests for plugins






TODO:

More info for contributors about how tests work and about plugin/template tests