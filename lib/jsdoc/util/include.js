var path = require('path');
var vm = require('jsdoc/util/vm');

/**
 * Read and execute a JavaScript file in global scope.
 * @private
 * @param {string} filepath The path to the JavaScript file. May contain an absolute path or a
 * path relative to env.dirname.
 */
module.exports = function(filepath) {
	filepath = path.resolve(__dirname, filepath);

	try {
		vm.getModule('jsdoc/util/include')(filepath);
	}
	catch (e) {
		console.log('Cannot include ' + filepath + ': ' + e);
	}
};
