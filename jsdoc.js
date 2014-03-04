#!/usr/bin/env node
/**
 * @project jsdoc
 * @author Michael Mathews <micmath@gmail.com>
 * @license See LICENSE.md file included in this distribution.
 */

/**
 * Data representing the environment in which this app is running.
 *
 * @namespace
 * @name env
 */
global.env = {
    /**
     * Running start and finish times.
     *
     * @memberof env
     */
    run: {
        start: new Date(),
        finish: null
    },

    /**
     * The command-line arguments passed into JSDoc.
     *
     * @type Array
     * @memberof env
     */
    args: [],

    /**
     * The parsed JSON data from the configuration file.
     *
     * @type Object
     * @memberof env
     */
    conf: {},

    /**
     * The absolute path to the base directory of the JSDoc application.
     *
     * @private
     * @type string
     * @memberof env
     */
    dirname: '.',

    /**
     * The user's working directory at the time that JSDoc was started.
     *
     * @private
     * @type string
     * @memberof env
     */
    pwd: null,

    /**
     * The command-line options, parsed into a key/value hash.
     *
     * @type Object
     * @memberof env
     * @example if (global.env.opts.help) { console.log('Helpful message.'); }
    */
    opts: {},

    /**
     * The source files that JSDoc will parse.
     * @type Array
     * @memberof env
     */
    sourceFiles: [],

    /**
     * The JSDoc version number and revision date.
     *
     * @type Object
     * @memberof env
     */
    version: {}
};

// initialize the environment for the current JavaScript VM
(function(args) {
    if (args[0] && typeof args[0] === 'object') {
        // we should be on Node.js
        args = [__dirname, process.cwd()];
    }

    require('jsdoc/util/runtime').initialize(args);
})( Array.prototype.slice.call(arguments, 0) );

/**
 * Data that must be shared across the entire application.
 *
 * @namespace
 * @name app
 */
global.app = {
    jsdoc: {
        scanner: new (require('jsdoc/src/scanner').Scanner)(),
        parser: null,
        name: require('jsdoc/name')
    }
};

/**
 * Recursively print an object's properties to stdout. This method is safe to use with objects that
 * contain circular references. In addition, on Mozilla Rhino, this method is safe to use with
 * native Java objects.
 *
 * @global
 * @name dump
 * @private
 * @param {Object} obj - Object(s) to print to stdout.
 */
global.dump = function() {
    var doop = require('jsdoc/util/doop').doop;
    var _dump = require('jsdoc/util/dumper').dump;
    for (var i = 0, l = arguments.length; i < l; i++) {
        console.log( _dump(doop(arguments[i])) );
    }
};

(function() {
    'use strict';

    var logger = require('jsdoc/util/logger');
    var path = require('jsdoc/path');
    var runtime = require('jsdoc/util/runtime');

    var cli = require( path.join(global.env.dirname, 'cli') );

    cli.setVersionInfo()
        .loadConfig();

    if (!global.env.opts.test) {
        cli.configureLogger();
    }

    cli.logStart();

    function cb(errorCode) {
        cli.logFinish();
        cli.exit(errorCode || 0);
    }

    // On Rhino, we use a try/catch block so we can log the Java exception (if available)
    if ( runtime.isRhino() ) {
        try {
            cli.runCommand(cb);
        }
        catch(e) {
            if (e.rhinoException) {
                logger.fatal( e.rhinoException.printStackTrace() );
            } else {
                console.trace(e);
                cli.exit(1);
            }
        }
    }
    else {
        cli.runCommand(cb);
    }
})();
