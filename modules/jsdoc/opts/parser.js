/**
	@module jsdoc/opts/parser
	@requires common/args
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */
(function() {
	var common = {
		args: require('common/args')
	};
	
	var argsParser = new common.args.Parser(),
		ourOptions,
		defaults = {
			template: 'default',
			destination: 'console'
		};
	
	argsParser.addOption('t', 'template',    true,  'The name of the template to use. Default: the "default" template');
	argsParser.addOption('e', 'encoding',    true,  'Assume this encoding when reading all source files. Default: your system default encoding');
	argsParser.addOption('n', 'nocode',      false, 'Ignore doclets that don\'t explicitly provide a symbol name.');
	argsParser.addOption('T', 'test',        false, 'Run unit tests and quit.');
	argsParser.addOption('d', 'destination', true,  'The path to the output folder. Use "stdout.json" or "stdout.xml" to dump data to the console. Default: ./jsdocs');
	argsParser.addOption('V', 'validate',    false, 'Validate the results produced by parsing the source code.');
	argsParser.addOption('r', 'recurse',     false, 'Recurse into subdirectories when scanning for source code files.');
    argsParser.addOption('h', 'help',        false, 'Print this message and quit.');
	
// TODO [-R, recurseonly] = a number representing the depth to recurse
// TODO [-f, filter] = a regex to filter on

	/**
		Set the options for this app.
		@method parse
		@throws {Error} Illegal arguments will throw errors.
		@param {string|String[]} args The command line arguments for this app.
	 */
	exports.parse = function(args) {
		args = args || [];
		
		if (typeof args === 'string' || args.constructor === String) {
			args = (''+args).split(/\s+/g);
		}
		
		ourOptions = argsParser.parse(args, defaults);
		
		return ourOptions;
	}
	
	/**
		Display help message for options.
		@method help
	 */
	exports.help = function() {
	    return argsParser.help();
	}
	
	/**
		Get a single option or all the options for this app.
		@method get
		@param {String} [name] The name of the option.
		@return {String|Object} Either the value associated with the given name,
		or a collection of key/values representing all the options.
	 */
	exports.get = function(name) {
		if (typeof name === 'undefined') {
			return ourOptions;
		}
		else {
			return ourOptions[name];
		}
	}
})();