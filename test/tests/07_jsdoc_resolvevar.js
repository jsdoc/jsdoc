(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('jsdoc/name:resolvevar', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/jsdoc_resolvevar.js');
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
	});
})();
