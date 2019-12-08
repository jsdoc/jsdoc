#!/usr/bin/env node

// initialize the environment for Node.js
(() => {
    const fs = require('fs');
    const path = require('path');

    let env;
    let jsdocPath = __dirname;

    // Create a custom require method that adds `lib/jsdoc` and `node_modules` to the module
    // lookup path. This makes it possible to `require('jsdoc/foo')` from external templates and
    // plugins, and within JSDoc itself. It also allows external templates and plugins to
    // require JSDoc's module dependencies without installing them locally.
    /* eslint-disable no-global-assign, no-redeclare */
    require = require('requizzle')({
        requirePaths: {
            before: [path.join(__dirname, 'lib')],
            after: [path.join(__dirname, 'node_modules')]
        },
        infect: true
    });
    /* eslint-enable no-global-assign, no-redeclare */

    // resolve the path if it's a symlink
    if ( fs.statSync(jsdocPath).isSymbolicLink() ) {
        jsdocPath = path.resolve( path.dirname(jsdocPath), fs.readlinkSync(jsdocPath) );
    }

    env = require('./lib/jsdoc/env');
    env.dirname = jsdocPath;
    env.args = process.argv.slice(2);
})();

/**
 * Data about the environment in which JSDoc is running, including the configuration settings that
 * were used to run JSDoc.
 *
 * @deprecated As of JSDoc 3.4.0. Use `require('jsdoc/env')` to access the `env` object. The global
 * `env` object will be removed in a future release.
 * @namespace
 * @name env
 */
global.env = (() => require('./lib/jsdoc/env'))();

(async () => {
    const cli = require('./cli');

    cli.setVersionInfo()
        .loadConfig()
        .configureLogger()
        .logStart();

    await cli.runCommand();
})();
