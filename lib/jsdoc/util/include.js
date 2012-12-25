/*global env: true, Packages: true */

var fs = require('fs');
var myGlobal = require('jsdoc/util/global');
var path = require('path');
var vm = require('jsdoc/util/vm');

function rhinoInclude(filepath) {
	var cx = Packages.org.mozilla.javascript.Context.getCurrentContext();
	Packages.org.mozilla.javascript.tools.shell.Main.processFile(cx, myGlobal, filepath);
}

// TODO: not tested
function nodejsInclude(filepath) {
	var nodevm = require('vm');
	var script = fs.readFileSync(filepath, 'utf8');
	nodevm.runInNewContext(script, myGlobal, filepath);
}

/**
 * Read and execute a JavaScript file in global scope.
 * @private
 * @param {string} filepath The path to the JavaScript file. May contain an absolute path or a
 * path relative to env.dirname.
 */
module.exports = function(filepath) {
	// we use env.dirname because, on Rhino, we need this function before __dirname is defined
	filepath = path.resolve(env.dirname, filepath);

	try {
		if ( vm.isRhino() ) {
			rhinoInclude(filepath);
		}
		else {
			nodejsInclude(filepath);
		}
	}
	catch (e) {
		console.log('Cannot include ' + filepath + ': ' + e);
	}
};
