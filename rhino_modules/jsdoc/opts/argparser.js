/**
	Parse the command line arguments.
	@module jsdoc/opts/argparser
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

var _ = require('underscore');

var hasOwnProp = Object.prototype.hasOwnProperty;

/**
	Create an instance of the parser.
	@classdesc A parser to interpret the key-value pairs entered on the command
	line.
	@constructor
 */
var ArgParser = function() {
	this._options = [];
	this._shortNameIndex = {};
	this._longNameIndex = {};
};

ArgParser.prototype._getOptionByShortName = function(name) {
	if (hasOwnProp.call(this._shortNameIndex, name)) {
		return this._options[this._shortNameIndex[name]];
	}
	return null;
};

ArgParser.prototype._getOptionByLongName = function(name) {
	if (hasOwnProp.call(this._longNameIndex, name)) {
		return this._options[this._longNameIndex[name]];
	}
	return null;
};

/**
 * Provide information about a legal option.
 * @param {character} shortName The short name of the option, entered like: -T.
 * @param {string}    longName The equivalent long name of the option, entered like: --test.
 * @param {boolean}   hasValue Does this option require a value? Like: -t templatename
 * @param {string}    helpText A brief description of the option.
 * @param {boolean}   [canHaveMultiple=false] Set to `true` if the option can be provided more than once.
 * @param {function}  [coercer] A function to coerce the given value to a specific type.
 * @example
 * myParser.addOption('t', 'template', true, 'The path to the template.');
 * myParser.addOption('h', 'help', false, 'Show the help message.');
 */
ArgParser.prototype.addOption = function(shortName, longName, hasValue, helpText, canHaveMultiple, coercer) {
	this._options.push({
		shortName: shortName,
		longName: longName,
		hasValue: hasValue,
		helpText: helpText,
		canHaveMultiple: (canHaveMultiple || false),
		coercer: coercer
	});
	
	if (shortName) {
		this._shortNameIndex[shortName] = this._options.length - 1;
	}
	if (longName) {
		this._longNameIndex[longName] = this._options.length - 1;
	}
};

/**
	Generate a summary of all the options with corresponding help text.
	@returns {string}
 */
ArgParser.prototype.help = function() {
	var helpArr = ['OPTIONS:'],
		option, optionHelp;

	for (var i = 0, leni = this._options.length; i < leni; i++) {
		option = this._options[i];
		optionHelp = '\t';

		if (option.shortName) {
			optionHelp += '-' + option.shortName + (option.longName ? ', ' : '');
		}

		if (option.longName) {
			optionHelp += '--' + option.longName;
		}

		if (option.hasValue)  {
			optionHelp += ' <value>';
		}

		optionHelp += '\t\t' + option.helpText;
		helpArr.push(optionHelp);
	}

	return helpArr.join('\n');
};

/**
	Get the options.
	@param {Array.<string>} args An array, like ['-x', 'hello']
	@param {Object} [defaults={}] An optional collection of default values.
	@returns {Object} The keys will be the longNames, or the shortName if
	no longName is defined for that option. The values will be the values
	provided, or `true` if the option accepts no value.
 */
ArgParser.prototype.parse = function(args, defaults) {
	var result = defaults && _.defaults({}, defaults) || {};

	result._ = [];
	for (var i = 0, leni = args.length; i < leni; i++) {
		var arg = '' + args[i],
			next = (i < leni-1)? '' + args[i+1] : null,
			option,
			shortName = null,
			longName,
			name,
			value = null;

		// like -t
		if (arg.charAt(0) === '-') {

			// like --template
			if (arg.charAt(1) === '-') {
				name = longName = arg.slice(2);
				option = this._getOptionByLongName(longName);
			}
			else {
				name = shortName = arg.slice(1);
				option = this._getOptionByShortName(shortName);
			}

			if (option === null) {
				throw new Error( 'Unknown command line option found: ' + name );
			}

			if (option.hasValue) {
				value = next;
				i++;

				if (value === null || value.charAt(0) === '-') {
					throw new Error( 'Command line option requires a value: ' + name );
				}
			}
			else {
				value = true;
			}

			if (option.longName && shortName) {
				name = option.longName;
			}

			if (typeof option.coercer === 'function') {
				value = option.coercer(value);
			}
				
			// Allow for multiple options of the same type to be present
			if (option.canHaveMultiple && hasOwnProp.call(result, name)) {
				var val = result[name];
				
				if (val instanceof Array) {
					val.push(value);
				} else {
					result[name] = [val, value];
				}
			}
			else {
				result[name] = value;
			}
		}
		else {
			result._.push(arg);
		}
	}

	return result;
};

module.exports = ArgParser;
