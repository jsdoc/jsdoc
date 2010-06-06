/**
 *	@overview JSDoc Toolkit Version 3
 *	@copyright 2010 (c) Michael Mathews <micmath@gmail.com>
 *	@license See LICENSE.md file included in this distribution.
 */

//// bootstrap
	const BASEDIR = arguments[0].split(/([\/\\])/g).slice(0, -1).join(RegExp.$1); // jsdoc.jar sets argument[0] to the abspath to main.js
	var args = arguments.slice(1);
	
	/** Follow the commonjs modules convention. */
	function require(id) {
		var path = require.base + id + '.js',
			source = '';
			
		try {
			var file = new java.io.File(path),
				scanner = new java.util.Scanner(file).useDelimiter('\Z'),
				source = String( scanner.next() );
		}
		catch (e) { print(e); }
		
		var f = new Function('require', 'exports', 'module', source),
			exports = require.cache[path] || {},
			module = { id: id, uri: path };
			
		require.cache[path] = exports;
		f.call({}, require, exports, module);
		
		return exports;
	}
	require.base = BASEDIR + '/modules/';
	require.cache = {};
	
	function print(msg) {
		java.lang.System.out.println(msg);
	}
////

//// main
	(function() {
		var jsdoc = {
				parser: require('jsdoc/parser'),
				opts: require('jsdoc/opts'),
				src: require('jsdoc/src')
			},
			opts,
			sourceFiles;
			
		opts = jsdoc.opts.set(args);
		sourceFiles = jsdoc.src.getFilePaths(opts._);
	
		jsdoc.parser.parseFiles(sourceFiles);
		
		print( jsdoc.parser.result.asString(opts.destination) );
	})();
////