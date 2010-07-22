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
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/12_tag_property.js');
			doclets = jsdoc.parser.result;
		});
		
		describe('A doclet with a named @property attached to a namespace', function() {
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
		
		describe('A doclet with a named @property and a type and a description', function() {
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
			
			it('should have a `type` property set to the parent given type', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'type');
				expect(doclet.type).to(eql, ['string', 'number']);
			});
			
			it('should have a `desc` property set to the given description', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'desc');
				expect(doclet.desc).to(eql, 'Here is a description.');
			});
		});
		
		describe('A doclet with a named @property after to a constructor tag', function() {
			it('should be a constructor', function() {
				var doclet = doclets[4].toObject();
				expect(doclet).to(have_property, 'isa');

				expect(doclet.isa).to(eql, 'constructor');
			});
		});
		
		describe('A doclet with a named @var tag and a description', function() {
			it('should have an `isa` property set to "property"', function() {
				var doclet = doclets[5].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'property');
			});
			
			it('should have a `name` property set to the given name', function() {
				var doclet = doclets[5].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'zub');
			});
			
			it('should have a `desc` property set to the given description', function() {
				var doclet = doclets[5].toObject();
				expect(doclet).to(have_property, 'desc');
				expect(doclet.desc).to(eql, 'The description here.');
			});
		});
		
		describe('A doclet with no name and a typed @property tag', function() {
			it('should have an `isa` property set to "property"', function() {
				var doclet = doclets[6].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'property');
			});
			
			it('should have a `type` property set to the given type', function() {
				var doclet = doclets[6].toObject();
				expect(doclet).to(have_property, 'type');
				expect(doclet.type).to(eql, 'Function');
			});
			
			it('should have a `name` property set to the name in the code', function() {
				var doclet = doclets[6].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'onShow');
			});
		});
		
	});
})();

(function testarea() {
	
 	/** @namespace foo */
 	var foo = {}, onShow, callbacks = [function(){}];
 	/** @constructor bar */
 	
 	/** @property foo.fah */
	
	/** @property {string|number} bar.bah Here is a description. */
	
 	/** @constructor Zub
 		@property {string} zip 
 	 */
 	
 	/** @var zub - The description here. */
 	
 	/** @property {Function} */
 	onShow = callbacks[0];
	
})();