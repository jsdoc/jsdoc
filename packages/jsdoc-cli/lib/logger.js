const _ = require('lodash');
const {default: ow} = require('ow');

/**
 * Logging levels for the JSDoc logger. The default logging level is
 * {@link module:@jsdoc/cli.LOG_LEVELS.WARN}.
 *
 * @alias module:@jsdoc/cli.LOG_LEVELS
 * @enum
 * @type {number}
 */
const LEVELS = {
    /**
     * Do not log any messages.
     *
     * @alias module:@jsdoc/cli.LOG_LEVELS.SILENT
     */
    SILENT: 0,
    /**
     * Log fatal errors that prevent JSDoc from running.
     *
     * @alias module:@jsdoc/cli.LOG_LEVELS.FATAL
     */
    FATAL: 10,
    /**
     * Log all errors, including errors from which JSDoc can recover.
     *
     * @alias module:@jsdoc/cli.LOG_LEVELS.ERROR
     */
    ERROR: 20,
    /**
     * Log the following messages:
     *
     * + Warnings
     * + Errors
     *
     * @alias module:@jsdoc/cli.LOG_LEVELS.WARN
     */
    WARN: 30,
    /**
     * Log the following messages:
     *
     * + Informational messages
     * + Warnings
     * + Errors
     *
     * @alias module:@jsdoc/cli.LOG_LEVELS.INFO
     */
    INFO: 40,
    /**
     * Log the following messages:
     *
     * + Debugging messages
     * + Informational messages
     * + Warnings
     * + Errors
     *
     * @alias module:@jsdoc/cli.LOG_LEVELS.DEBUG
     */
    DEBUG: 50,
    /**
     * Log all messages.
     *
     * @alias module:@jsdoc/cli.LOG_LEVELS.VERBOSE
     */
    VERBOSE: 1000
};

const DEFAULT_LEVEL = LEVELS.WARN;
const FUNCS = {
    [LEVELS.DEBUG]: 'debug',
    [LEVELS.ERROR]: 'error',
    [LEVELS.INFO]: 'info',
    [LEVELS.FATAL]: 'error',
    [LEVELS.VERBOSE]: 'debug',
    [LEVELS.WARN]: 'warn'
};
const LEVELS_BY_NUMBER = _.invert(LEVELS);
const PREFIXES = {
    [LEVELS.DEBUG]: 'DEBUG: ',
    [LEVELS.ERROR]: 'ERROR: ',
    [LEVELS.FATAL]: 'FATAL: ',
    [LEVELS.WARN]: 'WARNING: '
};

// Add a prefix to a log message if necessary.
function addPrefix(level, args) {
    const prefix = PREFIXES[level];

    if (prefix && _.isString(args[0])) {
        args[0] = prefix + args[0];
    }

    return args;
}

class Logger {
    constructor(opts) {
        ow(opts, ow.object);
        // We validate `opts.level` in the setter, so no need to validate it here.
        ow(opts.emitter, ow.object.partialShape({
            off: ow.function,
            on: ow.function,
            once: ow.function
        }));

        this._console = opts._console || console;
        const emitter = this._emitter = opts.emitter;

        this.level = opts.level || DEFAULT_LEVEL;

        for (const levelName of Object.keys(LEVELS)) {
            let levelNameLower;
            let levelNumber;

            // `logger:silent` events are not a thing.
            if (levelName === 'SILENT') {
                continue;
            }

            levelNameLower = levelName.toLowerCase();
            levelNumber = LEVELS[levelName];

            emitter.on(
                `logger:${levelNameLower}`,
                (...args) => this._maybeLog(levelNumber, args)
            );
        }
    }

    _maybeLog(level, args) {
        if (this._level >= level) {
            args = addPrefix(level, args);
            this._console[FUNCS[level]](...args);
        }
    }

    get level() {
        return this._level;
    }

    set level(level) {
        let errorMsg;

        if (_.isUndefined(LEVELS_BY_NUMBER[level])) {
            errorMsg = `Unrecognized logging level ${level}. Known levels are: `;
            errorMsg += Object.keys(LEVELS).map(k => `${k}: ${LEVELS[k]}`).join(', ');

            throw new TypeError(errorMsg);
        }

        this._level = level;
    }
}

module.exports = {
    LEVELS,
    Logger
};
