/**
	@overview Find source files to be parsed for docs.
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
	@module jsdoc/src
	@namespace jsdoc.src
	@requires common/fs
 */
var jsdoc = jsdoc || {};
jsdoc.src = (typeof exports === 'undefined')? {} : exports; // like commonjs

(function() {
	var fs = fs || require('common/fs');
	
	/**
		Recursively searches the given searchPaths for js files.
		@method getFilePaths
		@param {Array.<string>} searchPaths
		@param {number} [depth=1]
	 */
	jsdoc.src.getFilePaths = function(searchPaths, depth) {
		var filePaths = [];
		
		searchPaths = searchPaths || [];
		depth = depth || 1;
		
		searchPaths.forEach(function($) {
			filePaths = filePaths.concat(fs.ls($, depth));
		});
		
		// TODO: allow user-defined filtering of files
		filePaths = filePaths.filter(function($) {
			return /.+\.js(doc)?$/i.test($);
		});

		return filePaths;
	}
	
})();