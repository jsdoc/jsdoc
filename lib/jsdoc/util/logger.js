/**
 * Logging tools for JSDoc.
 *
 * Log messages are printed to the console based on the current logging level. By default, messages
 * at level `{@link module:jsdoc/util/logger.LEVELS.ERROR}` or above are logged; all other messages
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
 * @module jsdoc/util/logger
 * @extends module:events.EventEmitter
 * @example
 * var logger = require('jsdoc/util/logger');
 *
 * var data = {
 *   foo: 'bar'
 * };
 * var name = 'baz';
 *
 * logger.warn('%j %s', data, name);  // prints '{"foo":"bar"} baz'
 * @see http://nodejs.org/api/util.html#util_util_format_format
 */
'use strict';

var _ = require('underscore');
var util = require('util');

/**
 * Logging levels for the JSDoc logger. The default logging level is
 * {@link module:jsdoc/util/logger.LEVELS.WARN}.
 *
 * @alias module:jsdoc/util/logger.LEVELS
 * @enum
 */
var LEVELS = {
    /**
     * Log all messages.
     *
     * @alias module:jsdoc/util/logger.LEVELS.VERBOSE
     */
    VERBOSE: 'VERBOSE',
    /**
     * Log the following messages:
     *
     * + Debugging messages
     * + Informational messages
     * + Warnings
     * + Errors
     *
     * @alias module:jsdoc/util/logger.LEVELS.DEBUG
     */
    DEBUG: 'DEBUG',
    /**
     * Log the following messages:
     *
     * + Informational messages
     * + Warnings
     * + Errors
     *
     * @alias module:jsdoc/util/logger.LEVELS.INFO
     */
    INFO: 'INFO',
    /**
     * Log the following messages:
     *
     * + Warnings
     * + Errors
     *
     * @alias module:jsdoc/util/logger.LEVELS.WARN
     */
    WARN: 'WARN',
    /**
     * Log all errors, including errors from which JSDoc can recover.
     *
     * @alias module:jsdoc/util/logger.LEVELS.ERROR
     */
    ERROR: 'ERROR',
    /**
     * Log fatal errors that prevent JSDoc from running.
     *
     * @alias module:jsdoc/util/logger.LEVELS.FATAL
     */
    FATAL: 'FATAL',
    /**
     * Do not log any messages.
     *
     * @alias module:jsdoc/util/logger.LEVELS.SILENT
     */
    SILENT: 'SILENT'
};

/**
 * Default log level
 * @const
 */
var DEFAULT_LEVEL = LEVELS.WARN;

/**
 * Levels weight
 */
var LOG_LEVELS = {
    SILENT: 0,
    FATAL: 10,
    ERROR: 20,
    WARN: 30,
    INFO: 40,
    DEBUG: 50,
    VERBOSE: 1000
};

var PREFIXES = {
    DEBUG: 'DEBUG: ',
    ERROR: 'ERROR: ',
    FATAL: 'FATAL: ',
    WARN: 'WARNING: '
};

// Add a prefix to a log message if necessary.
function addPrefix(args, level) {
    var prefix = PREFIXES[level];
    var updatedArgs;

    if (prefix && typeof args[0] === 'string') {
        updatedArgs = args.slice(0);
        updatedArgs[0] = prefix + updatedArgs[0];
    }

    return updatedArgs || args;
}


var Logger = function () {
    this.handlers = {};
    this.setLevel(DEFAULT_LEVEL);
    this.fatalLevel = LEVELS.FATAL;
    this.errorLevel = LEVELS.ERROR;
    this.resetErrors();
};
util.inherits(Logger, require('events').EventEmitter);


Logger.prototype.LEVELS = LEVELS;

/**
 * Log a message at log level {@link module:jsdoc/util/logger.LEVELS.VERBOSE}.
 *
 * @alias module:jsdoc/util/logger.verbose
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
Logger.prototype.verbose = function () {
    this._invoke(LEVELS.VERBOSE, _.toArray(arguments));
};

/**
 * Log a message at log level {@link module:jsdoc/util/logger.LEVELS.DEBUG}.
 *
 * @alias module:jsdoc/util/logger.debug
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
Logger.prototype.debug = function () {
    this._invoke(LEVELS.DEBUG, _.toArray(arguments));
};

/**
 * Log a message at log level {@link module:jsdoc/util/logger.LEVELS.INFO}.
 *
 * @alias module:jsdoc/util/logger.info
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
Logger.prototype.info = function () {
    this._invoke(LEVELS.INFO, _.toArray(arguments));
};

/**
 * Log a message at log level {@link module:jsdoc/util/logger.LEVELS.ERROR}.
 *
 * @alias module:jsdoc/util/logger.error
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
Logger.prototype.error = function () {
    this._invoke(LEVELS.ERROR, _.toArray(arguments));
};

/**
 * Log a message at log level {@link module:jsdoc/util/logger.LEVELS.WARN}.
 *
 * @alias module:jsdoc/util/logger.warn
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
Logger.prototype.warn = function () {
    this._invoke(LEVELS.WARN, _.toArray(arguments));
};

/**
 * Log a message at log level {@link module:jsdoc/util/logger.LEVELS.FATAL}.
 *
 * @alias module:jsdoc/util/logger.fatal
 * @param {string} message - The message to log.
 * @param {...*=} values - The values that will replace the message's placeholders.
 */
Logger.prototype.fatal = function () {
    this._invoke(LEVELS.FATAL, _.toArray(arguments));
};

/**
 * Set the log level.
 *
 * @alias module:jsdoc/util/logger.setLevel
 * @param {module:jsdoc/util/logger.LEVELS} logLevel - The log level to use.
 */
Logger.prototype.setLevel = function (logLevel) {
    this.logLevel = logLevel;
};

/**
 * Get the current log level.
 *
 * @alias module:jsdoc/util/logger.getLevel
 * @return {module:jsdoc/util/logger.LEVELS} The current log level.
 */
Logger.prototype.getLevel = function () {
    return this.logLevel || DEFAULT_LEVEL;
};

/**
 * Check if the log level lets us log the message.
 * @param {module:jsdoc/util/logger.LEVELS} level
 * @returns {boolean}
 * @private
 */
Logger.prototype._canBeLogged = function (level) {
//    console.log(level, LOG_LEVELS[level], this.logLevel, LOG_LEVELS[this.logLevel]);
    return LOG_LEVELS[this.getLevel()] >= LOG_LEVELS[level];
};

/**
 * Check if the log level is considered as fatal.
 * @private
 * @param {module:jsdoc/util/logger.LEVELS} level
 * @returns {boolean}
 */
Logger.prototype._isFatal = function (level) {
    return LOG_LEVELS[this.fatalLevel] >= LOG_LEVELS[level];
};

/**
 * Check if the message is considered as an error.
 * If it is, it increments the number of errors.
 * @private
 * @param {module:jsdoc/util/logger.LEVELS} level
 * @returns {boolean}
 */
Logger.prototype._isError = function (level) {
    if  (LOG_LEVELS[this.errorLevel] >= LOG_LEVELS[level]) {
        this.loggedErrors++;
        return true;
    }
    return false;
};

/**
 * Invoke one of the logger handlers: debug, info, fatal, warn...
 * @private
 * @param {module:jsdoc/util/logger.LEVELS} level
 * @param logArgs
 */
Logger.prototype._invoke = function (level, logArgs) {
    var eventName = 'logger:' + LEVELS[level].toLowerCase();
    var handler = this._getHandler(level);

    if (_.isFunction(handler) && this._canBeLogged(level)) {
        handler.apply(this, addPrefix(logArgs, level));
    }


    if (this._isFatal(level)) {
        /**
         * Fatal event.
         * @event module:jsdoc/util/logger#fatal
         */
        this.emit('fatal');
    }

    this.errors || this._isError(level);

    logArgs.unshift(eventName);
    this.emit.apply(this, logArgs);
};

/**
 * Get the log handler attached to a specific log level.
 * @private
 * @param {module:jsdoc/util/logger.LEVELS} level
 * @returns {Function}
 */
Logger.prototype._getHandler = function (level) {
    return this.handlers[level];
};


/**
 * Attach a log handler to a specific log level.
 * @param {module:jsdoc/util/logger.LEVELS}level
 * @param {Function} handler
 * @param [context]
 */
Logger.prototype.setHandler = function (level, handler, context) {
    this.handlers[level] = handler.bind(context || this);
};

/**
 * Attach multiple log handlers at once.
 * @param {Array} handlers
 */
Logger.prototype.setHandlers = function (handlers) {
    handlers.forEach(function (handlerObj) {
        this.setHandler(handlerObj.level, handlerObj.handler, handlerObj.context);
    }, this);
};

/**
 * Set console.* functions as default handlers.
 */
Logger.prototype.setDefaultHandlers = function () {
    if (typeof console === 'object') {
        this.setHandlers([
            { level: LEVELS.VERBOSE, handler: console.info },
            { level: LEVELS.DEBUG, handler: console.info },
            { level: LEVELS.INFO, handler: console.info },
            { level: LEVELS.WARN, handler: console.warn },
            { level: LEVELS.ERROR, handler: console.error },
            { level: LEVELS.FATAL, handler: console.error }
        ]);
    }
};

/**
 * Mute the logger.
 */
Logger.prototype.mute = function () {
    this.setLevel(LEVELS.SILENT);
};

/**
 * Enable the pedantic mode.
 */
Logger.prototype.enablePedanticMode = function () {
    this.fatalLevel = LEVELS.ERROR;
    this.errorLevel = LEVELS.WARN;
};

/**
 * Disable the pedantic mode.
 */
Logger.prototype.disablePedanticMode = function () {
    this.fatalLevel = LEVELS.FATAL;
    this.errorLevel = LEVELS.ERROR;
};

/**
 * Check if errors were thrown
 */
Logger.prototype.hasErrors = function () {
    return !!this.loggedErrors;
};

/**
 * Check if errors were thrown
 */
Logger.prototype.resetErrors = function () {
    this.loggedErrors = 0;
};

var logger = module.exports = new Logger();

logger.setDefaultHandlers();
