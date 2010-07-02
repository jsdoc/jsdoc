(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@namespace', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/11_tag_namespace.js');
			doclets = jsdoc.parser.result;
		});
		
		describe('A doclet from a namespace tag with a name tag and no code', function() {
			it('should have an `isa` property set to "namespace"', function() {
				var doclet = doclets[0].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'namespace');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[0].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'foo');
			});
		});
		
		describe('A doclet from a named namespace tag and no code', function() {
			it('should have an `isa` property set to "namespace"', function() {
				var doclet = doclets[1].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'namespace');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[1].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'bar');
			});
		});
		
		describe('A doclet from a namespace tag and named code', function() {
			it('should have an `isa` property set to "namespace"', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'namespace');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'pez');
			});
		});
		
		describe('A doclet from a namespace tag and named anonymous function', function() {
			it('should have an `isa` property set to "namespace"', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'namespace');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'qux');
			});
		});
		
	});
})();

(function testarea() {

	/**
		@name foo
		@namespace
	*/
	
	/**
		@namespace bar
	*/
	
	/** @namespace */
	pez = {
	}
	
	/** @namespace */
	var qux = function() { }
})();