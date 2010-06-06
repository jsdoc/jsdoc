//// bootstrap
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
	require.base = 'modules/';
	require.cache = {};
	
	function print(msg) {
		java.lang.System.out.println(msg);
	}
	
	const BASE = arguments[0]; // path to application base folder
	var args = arguments.slice(1);
////

(function() {
	var jsdoc = {
			parser: require('jsdoc/parser'),
			opts: require('jsdoc/opts'),
			src: require('jsdoc/src')
		},
		opts,
		sourceFiles,
		fs = require('common/fs');
		
	opts = jsdoc.opts.set(args);
	sourceFiles = jsdoc.src.getFilePaths(opts._);

	jsdoc.parser.parseFiles(sourceFiles);
	
	print( jsdoc.parser.result.asString(opts.destination) );
})();