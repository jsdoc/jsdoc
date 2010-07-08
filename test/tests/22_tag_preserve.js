(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@preserve', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_preserve.js');
			doclets = jsdoc.parser.result;
		});
		
		describe('A doclet with a only a @preserve tag', function() {
			it('should not appear in the output', function() {
				expect(doclets).to(have_length, 0);
			});
		});
	});
})();
