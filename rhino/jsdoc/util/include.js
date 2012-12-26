/*global Packages: true */
module.exports = function(filepath) {
	var myGlobal = require('jsdoc/util/global');

	var cx = Packages.org.mozilla.javascript.Context.getCurrentContext();
	Packages.org.mozilla.javascript.tools.shell.Main.processFile(cx, myGlobal, filepath);
};
