/**
	@module jsdoc/opts/args
	@requires jsdoc/opts/argparser
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

var ArgParser = require('jsdoc/opts/argparser'),
	argParser = new ArgParser(),
	hasOwnProp = Object.prototype.hasOwnProperty,
	ourOptions,
	querystring = require('querystring'),
	util = require('util');


// cast strings to booleans or integers where appropriate
function castTypes(item) {
	var result = item;

	switch (result) {
		case 'true':
			return true;
		case 'false':
			return false;
		default:
			// might be an integer
			var integer = parseInt(result, 10);
			if (String(integer) === result && integer !== 'NaN') {
				return integer;
			} else {
				return result;
			}
	}
}

// check for strings that we need to cast to other types
function fixTypes(item) {
	var result = item;

	// recursively process arrays and objects
	if ( util.isArray(result) ) {
		for (var i = 0, l = result.length; i < l; i++) {
			result[i] = fixTypes(result[i]);
		}
	} else if (typeof result === 'object') {
		for (var prop in result) {
			if ( hasOwnProp.call(result, prop) ) {
				result[prop] = fixTypes(result[prop]);
			}
		}
	} else {
		result = castTypes(result);
	}

	return result;
}

function parseQuery(str) {
	var result = querystring.parse(str);

	for (var prop in result) {
		if ( hasOwnProp.call(result, prop) ) {
			result[prop] = fixTypes(result[prop]);
		}
	}

	return result;
}

argParser.addOption('t', 'template',    true,  'The name of the template to use. Default: the "default" template');
argParser.addOption('c', 'configure',   true,  'The path to the configuration file. Default: jsdoc __dirname + /conf.json');
argParser.addOption('e', 'encoding',    true,  'Assume this encoding when reading all source files. Default: utf8');
argParser.addOption('T', 'test',        false, 'Run all tests and quit.');
argParser.addOption('d', 'destination', true,  'The path to the output folder. Use "console" to dump data to the console. Default: ./out/');
argParser.addOption('p', 'private',     false, 'Display symbols marked with the @private tag. Default: false');
argParser.addOption('r', 'recurse',     false, 'Recurse into subdirectories when scanning for source code files.');
argParser.addOption('l', 'lenient',     false, 'Continue to generate output if a doclet is incomplete or contains errors. Default: false');
argParser.addOption('h', 'help',        false, 'Print this message and quit.');
argParser.addOption('X', 'explain',     false, 'Dump all found doclet internals to console and quit.');
argParser.addOption('q', 'query',       true,  'A query string to parse and store in env.opts.query. Example: foo=bar&baz=true', false, parseQuery);
argParser.addOption('u', 'tutorials',   true,  'Directory in which JSDoc should search for tutorials.');

//TODO [-R, recurseonly] = a number representing the depth to recurse
//TODO [-f, filter] = a regex to filter on <-- this can be better defined in the configs?

//Here are options specific to tests
argParser.addOption(null, 'verbose',    false, 'Display verbose output for tests');
argParser.addOption(null, 'match',      true,  'Only run tests containing <value>', true);
argParser.addOption(null, 'nocolor',    false, 'Do not use color in console output from tests');

/**
	Set the options for this app.
	@throws {Error} Illegal arguments will throw errors.
	@param {string|String[]} args The command line arguments for this app.
 */
exports.parse = function(args) {
	args = args || [];

	if (typeof args === 'string' || args.constructor === String) {
		args = (''+args).split(/\s+/g);
	}

	ourOptions = argParser.parse(args);

	return ourOptions;
};

/**
	Display help message for options.
 */
exports.help = function() {
    return argParser.help();
};

/**
	Get a named option.
	@param {string} name The name of the option.
	@return {string} The value associated with the given name.
 *//**
	Get all the options for this app.
	@return {Object} A collection of key/values representing all the options.
 */
exports.get = function(name) {
	if (typeof name === 'undefined') {
		return ourOptions;
	}
	else {
		return ourOptions[name];
	}
};
