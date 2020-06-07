const { cast } = require('@jsdoc/util');
const querystring = require('querystring');

// TODO: Document the format of this object, then update the docs for `Engine`.
/**
 * Command-line flags recognized by JSDoc.
 *
 * @alias module:@jsdoc/cli/lib/flags
 */
module.exports = {
    access: {
        alias: 'a',
        array: true,
        choices: ['all', 'package', 'private', 'protected', 'public', 'undefined'],
        defaultDescription: 'All except `private`',
        description: 'Document only symbols with the specified access level.',
        requiresArg: true
    },
    configure: {
        alias: 'c',
        description: 'The configuration file to use.',
        normalize: true,
        requiresArg: true
    },
    debug: {
        boolean: true,
        description: 'Log information to help with debugging.'
    },
    destination: {
        alias: 'd',
        default: './out',
        description: 'The output directory.',
        normalize: true,
        requiresArg: true
    },
    encoding: {
        alias: 'e',
        default: 'utf8',
        description: 'The encoding to assume when reading source files.',
        requiresArg: true
    },
    explain: {
        alias: 'X',
        boolean: true,
        description: 'Print the parse results to the console and exit.'
    },
    help: {
        alias: 'h',
        boolean: true,
        description: 'Print help information and exit.'
    },
    match: {
        description: 'Run only tests whose names contain this value.',
        requiresArg: true
    },
    package: {
        alias: 'P',
        description: 'The path to the `package.json` file to use.',
        normalize: true,
        requiresArg: true
    },
    pedantic: {
        boolean: true,
        description: 'Treat errors as fatal errors, and treat warnings as errors.'
    },
    private: {
        alias: 'p',
        boolean: true,
        description: 'Document private symbols (equivalent to `--access all`).'
    },
    query: {
        alias: 'q',
        coerce: ((str) => cast(querystring.parse(str))),
        description: 'A query string to parse and store (for example, `foo=bar&baz=true`).',
        requiresArg: true
    },
    readme: {
        alias: 'R',
        description: 'The `README` file to include in the documentation.',
        normalize: true,
        requiresArg: true
    },
    recurse: {
        alias: 'r',
        boolean: true,
        description: 'Recurse into subdirectories to find source files.'
    },
    template: {
        alias: 't',
        description: 'The template package to use.',
        requiresArg: true
    },
    test: {
        alias: 'T',
        boolean: true,
        description: 'Run all tests and exit.'
    },
    verbose: {
        boolean: true,
        description: 'Log detailed information to the console.'
    },
    version: {
        alias: 'v',
        boolean: true,
        description: 'Display the version number and exit.'
    }
};
