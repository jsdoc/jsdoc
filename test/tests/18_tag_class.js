(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@class', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_class.js');
			
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
 		describe('A doclet from a class tag with a name tag and no code', function() {
 			it('should have an `kind` property set to "constructor"', function() {
 				var doclet = doclets[0];
 				expect(doclet).to(have_property, 'kind');
 				expect(doclet.kind).to(eql, 'constructor');
 			});
 			
 			it('should have a `name` property set to the given name"', function() {
 				var doclet = doclets[0];
 				expect(doclet).to(have_property, 'name');
 				expect(doclet.name).to(eql, 'Foo');
 			});
 		});
 		
		
	});
})();