(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@property', function() {
	
		before_each(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/12_tag_property.js');
			doclets = jsdoc.parser.result;

		});
		
		describe('A doclet with a named property tag attached to a namespace', function() {
			it('should have an `isa` property set to "property"', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'property');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'fah');
			});
			
			it('should have a `memberof` property set to the parent object name', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'memberof');
				expect(doclet.memberof).to(eql, 'foo');
			});
		});
		
		describe('A doclet with a named property tag attached to a constructor', function() {
			it('should have an `isa` property set to "property"', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'property');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'bah');
			});
			
			it('should have a `memberof` property set to the parent object name', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'memberof');
				expect(doclet.memberof).to(eql, 'bar');
			});
		});
		
		describe('A doclet with a named property tag after to a constructor tag', function() {
			it('should be a constructor', function() {
				var doclet = doclets[4].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'constructor');
			});
		});
		
	});
})();

(function testarea() {

	/** @namespace foo */
	
	/** @constructor bar */
	
	/** @property foo.fah */
	
	/** @property bar.bah */
	
	/** @constructor Zub
		@property {string} zip 
	 */
	
})();