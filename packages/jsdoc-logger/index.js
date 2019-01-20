/**
 * Logging tools for JSDoc.
 *
 * Log messages are printed to the console based on the current logging level. By default, messages
 * at level `{@link module:@jsdoc/logger.LEVELS.ERROR}` or above are logged; all other messages
 * are ignored.
 *
 * In addition, the module object emits an event whenever a logger method is called, regardless of
 * the current logging level. The event's name is the string `logger:` followed by the logger's name
 * (for example, `logger:error`). The event handler receives an array of arguments that were passed
 * to the logger method.
 *
 * Each logger method accepts a `message` parameter that may contain zero or more placeholders. Each
 * placeholder is replaced by the corresponding argument following the message. If the placeholder
 * does not have a corresponding argument, the placeholder is not replaced.
 *
 * The following placeholders are supported:
 *
 * + `%s`: String.
 * + `%d`: Number.
 * + `%j`: JSON.
 *
 * @module @jsdoc/logger
 * @extends module:events.EventEmitter
 * @example
 * var logger = require('@jsdoc/logger');
 *
 * var data = {
 *   foo: 'bar'
 * };
 * var name = 'baz';
 *
 * logger.warn('%j %s', data, name);  // prints '{"foo":"bar"} baz'
 * @see http://nodejs.org/api/util.html#util_util_format_format
 */

const EventEmitter = require('events').EventEmitter;
const util = require('util');

/* eslint-disable no-empty-function */
class Logger extends EventEmitter {}
/* eslint-enable no-empty-function */

const logger = module.exports = new Logger();

/**
 * Logging levels for the JSDoc logger. The default logging level is
 * {@link module:@jsdoc/logger.LEVELS.ERROR}.
 *
 * @alias module:@jsdoc/logger.LEVELS
 * @enum
 * @type {number}
 */
const LEVELS = logger.LEVELS = {
    /**
     * Do not log any messages.
     *
     * @alias module:@jsdoc/logger.LEVELS.SILENT
     */
    SILENT: 0,
    /**
     * Log fatal errors that prevent JSDoc from running.
     *
     * @alias module:@jsdoc/logger.LEVELS.FATAL
     */
    FATAL: 10,
    /**
     * Log all errors, including errors from which JSDoc can recover.
     *
     * @alias module:@jsdoc/logger.LEVELS.ERROR
     */
    ERROR: 20,
    /**
     * Log the following messages:
     *
     * + Warnings
     * + Errors
     *
     * @alias module:@jsdoc/logger.LEVELS.WARN
     */
    WARN: 30,
    /**
     * Log the following messages:
     *
     * + Basic informational messages
     * + Warnings
     * + Errors
     *
     * @alias module:@jsdoc/logger.LEVELS.INFO
     */
    INFO: 40,
    /**
     * Log the following messages:
     *
     * + Detailed informational messages
     * + Informational messages
     * + Warnings
     * + Errors
     *
     * @alias module:@jsdoc/logger.LEVELS.VERBOSE
     */
    VERBOSE: 50,
    /**
     * Log all messages.
     *
     * @alias module:@jsdoc/logger.LEVELS.DEBUG
     */
    DEBUG: 1000
};

const DEFAULT_LEVEL = LEVELS.SILENT;
let logLevel = DEFAULT_LEVEL;

const PREFIXES = {
    DEBUG: 'DEBUG: ',
    ERROR: 'ERROR: ',
    FATAL: 'FATAL: ',
    WARN: 'WARNING: '
};

// Add a prefix to a log message if necessary.
function addPrefix(args, prefix) {
    let updatedArgs;

    if (prefix && typeof args[0] === 'string') {
        updatedArgs = args.slice();
        updatedArgs[0] = prefix + updatedArgs[0];
    }

    return updatedArgs || args;
}

// TODO: document events
function wrapLogFunction(name, func) {
    const eventName = `logger:${name}`;
    const upperCaseName = name.toUpperCase();
    const level = LEVELS[upperCaseName];
    const prefix = PREFIXES[upperCaseName];

    return function(...args) {
        let loggerArgs;

        if (logLevel >= level) {
            loggerArgs = addPrefix(args, prefix);
            func(...loggerArgs);
        }

        args.unshift(eventName);
        logger.emit(...args);
    };
}

// Print a message to STDOUT without a terminating newline.
function printToStdout(...args) {
    process.stdout.write( util.format(...args) );
}

/**
 * Log a message at log level {@link module:@jsdoc/logger.LEVELS.DEBUG}.
 *
 * @alias module:@jsdoc/logger.debug
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
logger.debug = wrapLogFunction('debug', console.info);
/**
 * Print a string at log level {@link module:@jsdoc/logger.LEVELS.DEBUG}. The string is not
 * terminated by a newline.
 *
 * @alias module:@jsdoc/logger.printDebug
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
logger.printDebug = wrapLogFunction('debug', printToStdout);
/**
 * Log a message at log level {@link module:@jsdoc/logger.LEVELS.ERROR}.
 *
 * @alias module:@jsdoc/logger.error
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
logger.error = wrapLogFunction('error', console.error);
/**
 * Log a message at log level {@link module:@jsdoc/logger.LEVELS.FATAL}.
 *
 * @alias module:@jsdoc/logger.fatal
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
logger.fatal = wrapLogFunction('fatal', console.error);
/**
 * Log a message at log level {@link module:@jsdoc/logger.LEVELS.INFO}.
 *
 * @alias module:@jsdoc/logger.info
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
logger.info = wrapLogFunction('info', console.info);
/**
 * Print a string at log level {@link module:@jsdoc/logger.LEVELS.INFO}. The string is not
 * terminated by a newline.
 *
 * @alias module:@jsdoc/logger.printInfo
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
logger.printInfo = wrapLogFunction('info', printToStdout);
/**
 * Log a message at log level {@link module:@jsdoc/logger.LEVELS.VERBOSE}.
 *
 * @alias module:@jsdoc/logger.verbose
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
logger.verbose = wrapLogFunction('verbose', console.info);
/**
 * Print a string at log level {@link module:@jsdoc/logger.LEVELS.VERBOSE}. The string is not
 * terminated by a newline.
 *
 * @alias module:@jsdoc/logger.printVerbose
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
logger.printVerbose = wrapLogFunction('verbose', printToStdout);
/**
 * Log a message at log level {@link module:@jsdoc/logger.LEVELS.WARN}.
 *
 * @alias module:@jsdoc/logger.warn
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
logger.warn = wrapLogFunction('warn', console.warn);

/**
 * Set the log level.
 *
 * @alias module:@jsdoc/logger.setLevel
 * @param {module:@jsdoc/logger.LEVELS} level - The log level to use.
 */
logger.setLevel = function(level) {
    logLevel = (level !== undefined) ? level : DEFAULT_LEVEL;
};

/**
 * Get the current log level.
 *
 * @alias module:@jsdoc/logger.getLevel
 * @return {module:@jsdoc/logger.LEVELS} The current log level.
 */
logger.getLevel = function() {
    return logLevel;
};
