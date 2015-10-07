#!/usr/bin/env node
/* global arguments, require: true */
/* eslint strict: [2, "function"] */
/**
 * @project jsdoc
 * @author Michael Mathews <micmath@gmail.com>
 * @license See LICENSE.md file included in this distribution.
 */

// initialize the environment for the current JavaScript VM
(function(args) {
    'use strict';

    var path;

    if (args[0] && typeof args[0] === 'object') {
        // we should be on Node.js
        args = [__dirname, process.cwd()];
        path = require('path');

        // Create a custom require method that adds `lib/jsdoc` and `node_modules` to the module
        // lookup path. This makes it possible to `require('jsdoc/foo')` from external templates and
        // plugins, and within JSDoc itself. It also allows external templates and plugins to
        // require JSDoc's module dependencies without installing them locally.
        require = require('requizzle')({
            requirePaths: {
                before: [path.join(__dirname, 'lib')],
                after: [path.join(__dirname, 'node_modules')]
            },
            infect: true
        });
    }

    require('./lib/jsdoc/util/runtime').initialize(args);
})( Array.prototype.slice.call(arguments, 0) );

/**
 * Data about the environment in which JSDoc is running, including the configuration settings that
 * were used to run JSDoc.
 *
 * @deprecated As of JSDoc 3.4.0. Use `require('jsdoc/env')` to access the `env` object. The global
 * `env` object will be removed in a future release.
 * @namespace
 * @name env
 */
global.env = (function() {
    'use strict';

    // This bit of joy is here because Rhino treats `./lib/jsdoc/env` and `jsdoc/env` as separate
    // modules. In contrast, Node.js errors out on `jsdoc/env` because we don't patch `require()`
    // until after this file is loaded.
    if (require('./lib/jsdoc/util/runtime').isRhino()) {
        return require('jsdoc/env');
    }
    else {
        return require('./lib/jsdoc/env');
    }
})();

/**
 * Data that must be shared across the entire application.
 *
 * @deprecated As of JSDoc 3.4.0. Avoid using the `app` object. The global `app` object and the
 * `jsdoc/app` module will be removed in a future release.
 * @namespace
 * @name app
 */
global.app = (function() {
    'use strict';

    // See comment in `global.env` to find out why we jump through this hoop.
    if (require('./lib/jsdoc/util/runtime').isRhino()) {
        return require('jsdoc/app');
    }
    else {
        return require('./lib/jsdoc/app');
    }
})();

(function() {
    'use strict';

    var env = global.env;
    var logger = require('./lib/jsdoc/util/logger');
    var runtime = require('./lib/jsdoc/util/runtime');
    var cli = require('./cli');

    function cb(errorCode) {
        cli.logFinish();
        cli.exit(errorCode || 0);
    }

    cli.setVersionInfo()
        .loadConfig();

    if (!env.opts.test) {
        cli.configureLogger();
    }

    cli.logStart();

    if (env.opts.debug) {
        /**
         * Recursively print an object's properties to stdout. This method is safe to use with
         * objects that contain circular references. In addition, on Mozilla Rhino, this method is
         * safe to use with native Java objects.
         *
         * This method is available only when JSDoc is run with the `--debug` option.
         *
         * @global
         * @name dump
         * @private
         * @param {...*} obj - Object(s) to print to stdout.
         */
        global.dump = function() {
            console.log(require('./lib/jsdoc/util/dumper').dump(arguments));
        };
    }

    // On Rhino, we use a try/catch block so we can log the Java exception (if available)
    if ( runtime.isRhino() ) {
        try {
            cli.runCommand(cb);
        }
        catch (e) {
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
