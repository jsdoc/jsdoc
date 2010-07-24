(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@property', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_const.js');
			doclets = jsdoc.parser.result;
		});
		
		describe('A doclet with a @const tag having a type and no given name', function() {
			it('should have an `kind` property set to "constant"', function() {
				var doclet = doclets[0].toObject();
				expect(doclet).to(have_property, 'kind');
				expect(doclet.kind).to(eql, 'constant');
			});
			
			it('should have a `name` property set to the name in the code', function() {
				var doclet = doclets[0].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'MY_BEER');
			});
			
			it('should have a `type` property set to the given type', function() {
				var doclet = doclets[0].toObject();
				expect(doclet).to(have_property, 'type');
				expect(doclet.type).to(eql, 'string');
			});
		});
		
		describe('A doclet with a @const tag and a type', function() {
			it('should have an `kind` property set to "constant"', function() {
				var doclet = doclets[1].toObject();
				expect(doclet).to(have_property, 'kind');
				expect(doclet.kind).to(eql, 'constant');
			});
			
			it('should have an `type` property set to the given type', function() {
				var doclet = doclets[1].toObject();
				expect(doclet).to(have_property, 'type');
				expect(doclet.type).to(eql, 'string');
			});
		});
	});
})();
