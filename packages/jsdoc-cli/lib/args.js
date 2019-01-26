/**
 * @module @jsdoc/cli/lib/args
 */

const _ = require('lodash');
const cast = require('@jsdoc/util').cast;
const querystring = require('querystring');
const yargs = require('yargs-parser');

const ARGS = exports.ARGS = {
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
        boolean: true,
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
    tutorials: {
        alias: 'u',
        description: 'The directory to search for tutorials.',
        normalize: true,
        requiresArg: true
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

function validateValue(arg, choices, values) {
    for (let value of values) {
        if (!choices.includes(value)) {
            throw new Error(`The argument --${arg} accepts only these values: ${choices}`);
        }
    }
}

const YARGS_OPTS = (() => {
    const opts = {
        alias: {},
        array: [],
        boolean: [],
        coerce: {},
        narg: {},
        normalize: []
    };

    Object.keys(ARGS).forEach(arg => {
        const value = ARGS[arg];

        if (value.alias) {
            opts.alias[arg] = [value.alias];
        }

        if (value.array) {
            opts.array.push(arg);
        }

        if (value.boolean) {
            opts.boolean.push(arg);
        }

        if (value.coerce) {
            opts.coerce[arg] = value.coerce;
        }

        if (value.normalize) {
            opts.normalize.push(arg);
        }

        if (value.requiresArg) {
            opts.narg[arg] = 1;
        }
    });

    return opts;
})();

exports.parse = (args => {
    const knownArgs = Object.keys(ARGS);
    const parsed = yargs(args, YARGS_OPTS);

    knownArgs.forEach(arg => {
        if (parsed[arg] && ARGS[arg].choices) {
            validateValue(arg, ARGS[arg].choices, parsed[arg]);
        }
    });

    return _.pick(parsed, knownArgs.concat(['_']));
});
