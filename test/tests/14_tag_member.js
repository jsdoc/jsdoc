(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@member', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/14_tag_member.js');
			doclets = jsdoc.parser.result;
		});
		
		describe('A doclet with a method tag and a memberof tag', function() {
			it('should have an `isa` property set to "method"', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'method');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'fah');
			});
			
			it('should have a `memberof` property set to the given member name', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'memberof');
				expect(doclet.memberof).to(eql, 'foo');
			});
		});
		
		describe('A doclet with a property tag and a member tag', function() {
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
			
			it('should have a `memberof` property set to the given member name', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'memberof');
				expect(doclet.memberof).to(eql, 'bar');
			});
		});
		
	});
})();

(function testarea() {

	/** @namespace foo */
	
	/** @constructor bar */
	
	/**
		@method fah
		@memberof foo
	 */
	
	/**
		@property bah
		@member bar
	 */
	
})();