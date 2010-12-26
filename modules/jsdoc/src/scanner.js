/**
	@module jsdoc/src/scanner
	@requires module:common/fs
	
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

(function() {
	var common = {
		fs: require('common/fs')
	};
	
	/**
		Recursively searches the given searchPaths for js files.
		@param {Array.<string>} searchPaths
		@param {number} [depth=1]
	 */
	exports.scan = function(searchPaths, depth) {
		var filePaths = [];

		searchPaths = searchPaths || [];
		depth = depth || 1;

		searchPaths.forEach(function($) {
			filePaths = filePaths.concat(common.fs.ls($, depth));
		});
		
		// TODO: allow user-defined filtering of files
		filePaths = filePaths.filter(function($) {
			return /.+\.js(doc)?$/i.test($);
		});

		return filePaths;
	}
	
})();