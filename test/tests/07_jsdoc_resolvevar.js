(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('jsdoc/name:resolvevar', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/jsdoc_resolvevar.js');
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
		describe('A nested, static member of a undocumented global object', function() {
  			it('should be documented as such', function() {
  				var doclet = doclets[1];
  				expect(doclet.name).to(eql, 'child2');
  				expect(doclet.scope).to(eql, 'static');
  				expect(doclet.path).to(eql, 'globalprop.child1.child2');
  			});
  		});
  		
		describe('A nested, static member of an inner member of an undocumented anonymous function', function() {
  			it('should be documented as such', function() {
  				var doclet = doclets[2];
  				expect(doclet.name).to(eql, 'ip');
  				expect(doclet.scope).to(eql, 'static');
  				expect(doclet.path).to(eql, '[[anonymous]]~io.ip');
  			});
  		});
  		
		describe('A documented static property', function() {
  			it('should be documented as such', function() {
  				var doclet = doclets[3];
  				expect(doclet.name).to(eql, 'gp');
  				expect(doclet.scope).to(eql, 'static');
  				expect(doclet.path).to(eql, 'go.gp');
  			});
  		});
  		
		describe('A documented var statement with multiple assignments', function() {
  			it('should produce global docs for each documented assigment', function() {
  				var doclet = doclets[4];
  				expect(doclet.name).to(eql, 'foo');
  				expect(doclet.scope).to(eql, 'global');
  				
  				doclet = doclets[5];
  				expect(doclet.name).to(eql, 'bar');
  				expect(doclet.scope).to(eql, 'global');
  			});
  		});
  		
		describe('A documented inner doclet of an undocumented enclosing symbol', function() {
  			it('should be given a path that includes inner scope', function() {
  				var doclet = doclets[6];
  				expect(doclet.name).to(eql, 'innerProp');
  				expect(doclet.scope).to(eql, 'inner');
  				expect(doclet.memberof).to(eql, 'globalFunc');
  				expect(doclet.path).to(eql, 'globalFunc~innerProp');
  			});
  		});
		
		describe('An inner doclet that nested twice', function() {
  			it('should be given a path that includes inner scope twice', function() {
  				var doclet = doclets[7];
  				expect(doclet.name).to(eql, 'nestedProp');
  				expect(doclet.scope).to(eql, 'inner');
  				expect(doclet.memberof).to(eql, 'globalFunc~innerFunc');
  				expect(doclet.path).to(eql, 'globalFunc~innerFunc~nestedProp');
  			});
  		});
		
		describe('A this-doclet attached to a method of an object literal', function() {
  			it('should set the property on the enclosing objectct literal', function() {
  				var doclet = doclets[8];
  				expect(doclet.name).to(eql, 'prop');
  				expect(doclet.scope).to(eql, 'static');
  				expect(doclet.memberof).to(eql, 'ns');
  				expect(doclet.path).to(eql, 'ns.prop');
  			});
  		});
  		
	});
})();
