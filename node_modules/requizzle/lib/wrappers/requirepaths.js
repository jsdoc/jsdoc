/*
	Copyright (c) 2014 Google Inc. All rights reserved.

	Use of this source code is governed by the MIT License, available in this package's LICENSE file
	or at http://opensource.org/licenses/MIT.
 */
'use strict';

var path = require('path');

function requirePaths(parentModule, paths) {
	if (!parentModule) {
		return paths;
	}

	return paths.slice(0).map(function(p) {
		return path.resolve(parentModule.filepath, p);
	});
}

exports.before = function before(targetPath, parentModule, opts) {
	var resolvedPaths = requirePaths(parentModule, opts);
	return 'module.paths = ' + JSON.stringify(resolvedPaths) + '.concat(module.paths);\n';
};

exports.after = function after(targetPath, parentModule, opts) {
	return '';
};
