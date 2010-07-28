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
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/jsdoc_resolvefunc_2.js');
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
  		describe('An inner doclet that has no @name, but does have @scope and @member tags', function() {
  			it('should be given a path that includes membership in the enclosing object', function() {
  				var doclet = doclets[1];
  				expect(doclet).to(have_property, 'name');
  				expect(doclet.name).to(eql, 'foo');
  				expect(doclet).to(have_property, 'scope');
  				expect(doclet.scope).to(eql, 'inner');
  				expect(doclet).to(have_property, 'path');
  				expect(doclet.path).to(eql, 'ns~foo');
  			});
  		});
  		
  		
	});
})();
