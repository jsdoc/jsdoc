/**
 * Data about the environment in which JSDoc is running, including the configuration settings that
 * were used to run JSDoc.
 *
 * @module jsdoc/env
 */
module.exports = {
    /**
     * The times at which JSDoc started and finished.
     *
     * @type {Object}
     * @property {Date} start - The time at which JSDoc started running.
     * @property {Date} finish - The time at which JSDoc finished running.
     */
    run: {
        start: new Date(),
        finish: null
    },

    /**
     * The command-line arguments passed to JSDoc.
     *
     * @type {Array<*>}
     */
    args: [],

    /**
     * The data parsed from JSDoc's configuration file.
     *
     * @type Object<string, *>
     */
    conf: {},

    /**
     * The absolute path to the base directory in which JSDoc is located. Set at startup.
     *
     * @private
     * @type {string}
     */
    dirname: null,

    /**
     * The user's working directory at the time when JSDoc started running.
     *
     * @private
     * @type {string}
     */
    pwd: null,

    /**
     * The command-line arguments, parsed into a key/value hash.
     *
     * @type {Object}
     * @example if (global.env.opts.help) { console.log('Helpful message.'); }
    */
    opts: {},

    /**
     * The source files that JSDoc will parse.
     *
     * @type {Array<string>}
     * @memberof env
     */
    sourceFiles: [],

    /**
     * The JSDoc version number and revision date.
     *
     * @type {Object<string, string>}
     * @property {string} number - The JSDoc version number.
     * @property {string} revision - The JSDoc revision number, expressed as a UTC date string.
     */
    version: {
        number: null,
        revision: null
    }
};
