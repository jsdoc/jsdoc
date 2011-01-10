/**
	@module jsdoc/src/scanner
	@requires module:common/fs
	
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

(function() {
	var common = {
		fs: require('common/fs'),
		mixin: require('common/util').mixin,
		events: require('common/events')
	};
	
	/**
	    @constructor
	 */
	var Scanner = exports.Scanner = function() {
	}
	common.mixin(Scanner.prototype, common.events);

	/**
		Recursively searches the given searchPaths for js files.
		@param {Array.<string>} searchPaths
		@param {number} [depth=1]
		@fires sourceFileFound
	 */
	exports.Scanner.prototype.scan = function(searchPaths, depth) {
		var filePaths = [],
		    that = this;

		searchPaths = searchPaths || [];
		depth = depth || 1;

		searchPaths.forEach(function($) {
			filePaths = filePaths.concat(common.fs.ls($, depth));
		});
		
		filePaths = filePaths.filter(function($) {
		    var e = { fileName: $ };
            that.fire('sourceFileFound', e);
		    
		    return !e.defaultPrevented;
		});

		return filePaths;
	}
	
})();