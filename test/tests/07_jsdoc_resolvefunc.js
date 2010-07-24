(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('jsdoc/name:resolvefunc', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/jsdoc_resolvefunc.js');
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
  		describe('A doclet that has no @name, that is a property of a nested, undocumented objlit', function() {
  			it('should be given a path that includes membership in the enclosing object', function() {
  				var doclet = doclets[0];
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, 'createShape');
  				expect(doclet).to(have_property, 'path');
  				expect(doclet.path).to(eql, 'ShapeFactory#util.createShape');
  			});
  		});
  		
  		describe('A doclet that has no @name whose name starts with `this.`, that is a property of a nested objlit', function() {
  			it('should correctly resolve `this` to the nearest enclosing object', function() {
  				var doclet = doclets[1];
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, 'lastShape');
  				expect(doclet).to(have_property, 'path');
  				expect(doclet.path).to(eql, 'ShapeFactory#util.lastShape');
  			});
  		});
  		
  		describe('A property doclet that has no @name or @kind whose name starts with `this.`, that is scoped to a non-constructor global function', function() {
  			it('should correctly resolve to a property of the global scope', function() {
  				var doclet = doclets[2];
  				expect(doclet).to(have_property, 'kind');
  				expect(doclet.kind).to(eql, 'property');
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, 'g');
  				expect(doclet).to(have_property, 'path');
  				expect(doclet.path).to(eql, 'g');
  			});
  		});
  		
  		describe('A method doclet that has no @name or @kind whose name starts with `this.`, that is scoped to a constructor function', function() {
  			it('should correctly resolve to a method of the constructor', function() {
  				var doclet = doclets[4];
  				expect(doclet).to(have_property, 'kind');
  				expect(doclet.kind).to(eql, 'method');
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, 'bar');
  				expect(doclet).to(have_property, 'path');
  				expect(doclet.path).to(eql, 'Foo#bar');
  			});
  		});
  		
  		describe('An inner method doclet that has no @name or @kind, and is scoped to a constructor function', function() {
  			it('should correctly resolve to an inner method of the constructor', function() {
  				var doclet = doclets[5];
  				expect(doclet).to(have_property, 'kind');
  				expect(doclet.kind).to(eql, 'method');
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, 'inner');
  				expect(doclet).to(have_property, 'path');
  				expect(doclet.path).to(eql, 'Foo~inner');
  				expect(doclet).to(have_property, 'scope');
  				expect(doclet.scope).to(eql, 'inner');
  			});
  		});
  		
  		describe('A nested inner method doclet that has no @name or @kind, and is scoped to an inner method', function() {
  			it('should correctly resolve to an inner method of the a inner method', function() {
  				var doclet = doclets[6];
  				expect(doclet).to(have_property, 'kind');
  				expect(doclet.kind).to(eql, 'method');
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, 'deep');
  				expect(doclet).to(have_property, 'path');
  				expect(doclet.path).to(eql, 'Foo~inner~deep');
  				expect(doclet).to(have_property, 'scope');
  				expect(doclet.scope).to(eql, 'inner');
  			});
  		});
  		
  		describe('A property doclet whose name starts with `this.`, that has no @name or @kind, and is scoped to an inner method', function() {
  			it('should correctly resolve to a property of the global scope', function() {
  				var doclet = doclets[7];
  				expect(doclet).to(have_property, 'kind');
  				expect(doclet.kind).to(eql, 'property');
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, 'globalProp');
  				expect(doclet).to(have_property, 'path');
  				expect(doclet.path).to(eql, 'globalProp');
  			});
  		});
  		
  		describe('A global method whose name starts with `this.`, that has no @name or @kind', function() {
  			it('should correctly resolve to a property of the global scope', function() {
  				var doclet = doclets[8];
  				expect(doclet).to(have_property, 'kind');
  				expect(doclet.kind).to(eql, 'method');
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, 'globalFunc');
  				expect(doclet).to(have_property, 'path');
  				expect(doclet.path).to(eql, 'globalFunc');
  			});
  		});
	});
})();
