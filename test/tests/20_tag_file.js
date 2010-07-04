(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@file', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_file_1.js');

			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
		describe('A doclet with a fileoverview tag and no name tag', function() {
			it('should have an `isa` property set to "file"', function() {
				var doclet = doclets[0];
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'file');
			});
			
			it('should have an `name` property set to a string equal to the files name', function() {
				var doclet = doclets[0];
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(match, /test\/samples\/tag_file_1\.js$/);
			});
		});
	});
})();
