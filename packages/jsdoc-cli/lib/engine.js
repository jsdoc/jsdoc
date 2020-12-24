const _ = require('lodash');
const { EventBus } = require('@jsdoc/util');
const flags = require('./flags');
const help = require('./help');
const { LEVELS, Logger } = require('./logger');
const {default: ow} = require('ow');
const yargs = require('yargs-parser');

function validateChoice(flagInfo, choices, values) {
    let flagNames = flagInfo.alias ? `-${flagInfo.alias}/` : '';

    flagNames += `--${flagInfo.name}`;

    for (let value of values) {
        if (!choices.includes(value)) {
            throw new TypeError(
                `The flag ${flagNames} accepts only these values: ${choices.join(', ')}`
            );
        }
    }
}

/**
 * `KNOWN_FLAGS` is a set of all known flag names, including the long and short forms.
 *
 * `YARGS_FLAGS` is details about the known command-line flags, but in a form that `yargs-parser`
 * understands. (That form is relatively hard to read, so we build this object from the more
 * readable `flags` object.)
 *
 * @private
 */
const { KNOWN_FLAGS, YARGS_FLAGS } = (() => {
    const names = new Set();
    const opts = {
        alias: {},
        array: [],
        boolean: [],
        coerce: {},
        narg: {},
        normalize: []
    };

    // `_` contains unparsed arguments.
    names.add('_');

    Object.keys(flags).forEach(flag => {
        const value = flags[flag];

        names.add(flag);

        if (value.alias) {
            names.add(value.alias);
            opts.alias[flag] = [value.alias];
        }

        if (value.array) {
            opts.array.push(flag);
        }

        if (value.boolean) {
            opts.boolean.push(flag);
        }

        if (value.coerce) {
            opts.coerce[flag] = value.coerce;
        }

        if (value.normalize) {
            opts.normalize.push(flag);
        }

        if (value.requiresArg) {
            opts.narg[flag] = 1;
        }
    });

    return {
        KNOWN_FLAGS: names,
        YARGS_FLAGS: opts
    };
})();

/**
 * CLI engine for JSDoc.
 *
 * @alias module:@jsdoc/cli
 */
class Engine {
    /**
     * Create an instance of the CLI engine.
     *
     * @param {Object} opts - Options for the CLI engine.
     * @param {number} [opts.logLevel] - The maximum logging level to print to the console. Must be
     * an enumerated value of `module:@jsdoc/cli.LOG_LEVELS`. The default value is
     * `module:@jsdoc/cli.LOG_LEVELS.WARN`.
     * @param {string} [opts.version] - The version of JSDoc that is running.
     * @param {Date} [opts.revision] - A timestamp for the version of JSDoc that is running.
     */
    constructor(opts = {}) {
        ow(opts, ow.object);
        // The `Logger` class validates `opts.level`, so no need to validate it here.
        ow(opts.revision, ow.optional.date);
        ow(opts.version, ow.optional.string);

        this._bus = new EventBus('jsdoc', {
            cache: _.isBoolean(opts._cacheEventBus) ? opts._cacheEventBus : true
        });
        this._logger = new Logger({
            emitter: this._bus,
            level: opts.logLevel
        });
        this.flags = [];
        this.revision = opts.revision;
        this.version = opts.version;
    }

    /**
     * The log level to use. Messages are logged only if they are at or above this level.
     * Must be an enumerated value of {@link module:@jsdoc/cli.LOG_LEVELS}.
     *
     * The default value is `module:@jsdoc/cli.LOG_LEVELS.WARN`.
     */
    get logLevel() {
        return this._logger.level;
    }

    set logLevel(level) {
        this._logger.level = level;
    }

    /**
     * Get help text for JSDoc.
     *
     * You can specify the maximum line length for the help text. This method attempts to fit each
     * line within the maximum length, but it only splits on word boundaries. If you specify a small
     * length, such as `10`, some lines will exceed that length.
     *
     * @param {Object} [opts] - Options for formatting the help text.
     * @param {number} [opts.maxLength=Infinity] - The desired maximum length of each line in the
     * formatted text.
     * @return {string} The formatted help text.
     */
    help(opts = {}) {
        ow(opts, ow.object);
        ow(opts.maxLength, ow.optional.number);

        const maxLength = opts.maxLength || Infinity;

        return (
            `Options:\n${help({ maxLength })}\n\n` +
            'Visit https://jsdoc.app/ for more information.'
        );
    }

    /**
     * Details about the command-line flags that JSDoc recognizes.
     */
    get knownFlags() {
        return flags;
    }

    /**
     * Parse an array of command-line flags (also known as "options").
     *
     * Use the instance's `flags` property to retrieve the parsed flags later.
     *
     * @param {Array<string>} cliFlags - The command-line flags to parse.
     * @returns {Object} The name and value for each flag. The `_` property contains all arguments
     * other than flags and their values.
     */
    parseFlags(cliFlags) {
        ow(cliFlags, ow.array);

        let normalizedFlags;
        let parsed;
        let parsedFlags;
        let parsedFlagNames;

        normalizedFlags = Object.keys(flags);
        parsed = yargs.detailed(cliFlags, YARGS_FLAGS);
        if (parsed.error) {
            throw parsed.error;
        }
        parsedFlags = parsed.argv;
        parsedFlagNames = new Set(Object.keys(parsedFlags));

        // Check all parsed flags for unknown flag names.
        for (let flag of parsedFlagNames) {
            if (!KNOWN_FLAGS.has(flag)) {
                throw new TypeError(
                    'Unknown command-line option: ' +
                    (flag.length === 1 ? `-${flag}` : `--${flag}`)
                );
            }
        }

        // Validate the values of known flags.
        for (let flag of normalizedFlags) {
            if (parsedFlags[flag] && flags[flag].choices) {
                let flagInfo = {
                    name: flag,
                    alias: flags[flag].alias
                };

                validateChoice(flagInfo, flags[flag].choices, parsedFlags[flag]);
            }
        }

        // Only keep the long name of each flag.
        this.flags = _.pick(parsedFlags, normalizedFlags.concat(['_']));

        return this.flags;
    }

    /**
     * A string that describes the current JSDoc version.
     */
    get versionDetails() {
        let revision = '';

        if (!this.version) {
            return '';
        }

        if (this.revision) {
            revision = `(${this.revision.toUTCString()})`;
        }

        return `JSDoc ${this.version} ${revision}`.trim();
    }
}

Engine.LOG_LEVELS = LEVELS;

module.exports = Engine;
