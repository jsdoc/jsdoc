# @jsdoc/template-silent

A JSDoc template that generates no output.

Why would that be useful? Primarily for running JSDoc as a linter to check for
syntax errors and unrecognized tags in documentation comments.

## Installing the package

Using npm:

```shell
npm install --save @jsdoc/template-silent
```

## Using the package

The following command exits with a non-zero exit code if any errors are
encountered. It writes nothing to disk, and the only output it produces is any
error messages written to `stderr`:

    jsdoc myscript.js -t templates/silent -a all --pedantic

To get warnings about tags that JSDoc does not recognize, create a configuration
file called `conf.json` that sets `"allowUnknownTags": false`, then run the
following command:

    jsdoc myscript.js -t templates/silent -a all -c conf.json --pedantic
