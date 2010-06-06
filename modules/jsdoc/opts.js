/**
	@overview Get or set options for this app.
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.markdown' in this project.
 */

/**
	@module jsdoc/opts
	@requires common/args
 */
(function() {
	var args = args || require('common/args');
	
	var argsParser = new args.Parser(),
		ourOptions,
		defaults = {
			template: 'default',
			destination: 'jsdoc.xml'
		};
	
	argsParser.addOption('t', 'template',    true,  'The name of the template to use.');
	argsParser.addOption('T', 'test',        false, 'Run unit tests and quit.');
	argsParser.addOption('d', 'destination', true,  'The path to output folder.');
	argsParser.addOption('h', 'help',        false, 'Print help message and quit.');
	argsParser.addOption('V', 'validate',    false, 'Validate the results produced by parsing the source code.');
	
	/**
		Set the options for this app.
		@method set
		@throws {Error} Illegal arguments will throw errors.
		@param {string|String[]} args The command line arguments for this app.
	 */
	exports.set = function(args) {
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
	exports.help = function() { return argsParser.help(); }
	
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