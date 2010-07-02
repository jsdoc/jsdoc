(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@constructor', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/10_tag_constructor.js');
			doclets = jsdoc.parser.result;
		});
		
		describe('A doclet from a constructor tag with a name tag and no code', function() {
			it('should have an `isa` property set to "constructor"', function() {
				var doclet = doclets[0].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'constructor');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[0].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'Foo');
			});
		});
		
		describe('A doclet from a named constructor tag and no code', function() {
			it('should have an `isa` property set to "constructor"', function() {
				var doclet = doclets[1].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'constructor');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[1].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'Bar');
			});
		});
		
		describe('A doclet from a constructor tag and named code', function() {
			it('should have an `isa` property set to "constructor"', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'constructor');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[2].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'Pez');
			});
		});
		
		describe('A doclet from a constructor tag and named anonymous function', function() {
			it('should have an `isa` property set to "constructor"', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'isa');
				expect(doclet.isa).to(eql, 'constructor');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[3].toObject();
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'Qux');
			});
		});
		
	});
})();

(function testarea() {

	/**
		@name Foo
		@constructor
	*/
	
	/**
		@constructor Bar
	*/
	
	/**
		@constructor
	*/
	function Pez() {
	}
	
	/**
		@constructor
	*/
	Qux = function() {
	}
})();