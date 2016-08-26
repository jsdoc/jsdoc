/**
 * @module jsdoc/opts/args
 * @requires jsdoc/opts/argparser
 * @author Michael Mathews <micmath@gmail.com>
 * @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
'use strict';

var ArgParser = require('jsdoc/opts/argparser');
var cast = require('jsdoc/util/cast').cast;
var querystring = require('querystring');
var util = require('util');

var ourOptions;

var argParser = new ArgParser();
var hasOwnProp = Object.prototype.hasOwnProperty;

function parseQuery(str) {
    return cast( querystring.parse(str) );
}

/* eslint-disable no-multi-spaces */
argParser.addOption('a', 'access',      true,  'Only display symbols with the given access: "public", "protected", "private" or "undefined", or "all" for all access levels. Default: all except "private"', true);
argParser.addOption('c', 'configure',   true,  'The path to the configuration file. Default: path/to/jsdoc/conf.json');
argParser.addOption('d', 'destination', true,  'The path to the output folder. Use "console" to dump data to the console. Default: ./out/');
argParser.addOption('',  'debug',       false, 'Log information for debugging JSDoc.');
argParser.addOption('e', 'encoding',    true,  'Assume this encoding when reading all source files. Default: utf8');
argParser.addOption('h', 'help',        false, 'Print this message and quit.');
argParser.addOption('',  'match',       true,  'When running tests, only use specs whose names contain <value>.', true);
argParser.addOption('',  'nocolor',     false, 'When running tests, do not use color in console output.');
argParser.addOption('p', 'private',     false, 'Display symbols marked with the @private tag. Equivalent to "--access all". Default: false');
argParser.addOption('P', 'package',     true,  'The path to the project\'s package file. Default: path/to/sourcefiles/package.json');
argParser.addOption('',  'pedantic',    false, 'Treat errors as fatal errors, and treat warnings as errors. Default: false');
argParser.addOption('q', 'query',       true,  'A query string to parse and store in jsdoc.env.opts.query. Example: foo=bar&baz=true', false, parseQuery);
argParser.addOption('r', 'recurse',     false, 'Recurse into subdirectories when scanning for source files and tutorials.');
argParser.addOption('R', 'readme',      true,  'The path to the project\'s README file. Default: path/to/sourcefiles/README.md');
argParser.addOption('t', 'template',    true,  'The path to the template to use. Default: path/to/jsdoc/templates/default');
argParser.addOption('T', 'test',        false, 'Run all tests and quit.');
argParser.addOption('u', 'tutorials',   true,  'Directory in which JSDoc should search for tutorials.');
argParser.addOption('v', 'version',     false, 'Display the version number and quit.');
argParser.addOption('',  'verbose',     false, 'Log detailed information to the console as JSDoc runs.');
argParser.addOption('X', 'explain',     false, 'Dump all found doclet internals to console and quit.');
/* eslint-enable no-multi-spaces */

// Options that are no longer supported and should be ignored
argParser.addIgnoredOption('l', 'lenient'); // removed in JSDoc 3.3.0

/**
 * Set the options for this app.
 * @throws {Error} Illegal arguments will throw errors.
 * @param {string|String[]} args The command line arguments for this app.
 */
exports.parse = function(args) {
    args = args || [];

    if (typeof args === 'string' || args.constructor === String) {
        args = String(args).split(/\s+/g);
    }

    ourOptions = argParser.parse(args);

    return ourOptions;
};

/**
 * Retrieve help message for options.
 */
exports.help = function() {
    return argParser.help();
};

/**
 * Get a named option.
 * @variation name
 * @param {string} name The name of the option.
 * @return {string} The value associated with the given name.
 *//**
 * Get all the options for this app.
 * @return {Object} A collection of key/values representing all the options.
 */
exports.get = function(name) {
    if (typeof name === 'undefined') {
        return ourOptions;
    }
    else if ( hasOwnProp.call(ourOptions, name) ) {
        return ourOptions[name];
    }
    return undefined;
};
