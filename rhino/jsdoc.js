// Platform-specific functions to support jsdoc.js

exports.pathToUri = function(_path) {
	return String( new java.io.File(_path).toURI() );
};

exports.uriToPath = function(uri) {
	return String( new java.io.File(new java.net.URI(uri)) );
};
