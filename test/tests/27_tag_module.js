(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@module', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_module.js');
			
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
 		describe('A doclet that lists a module', function() {
 			it('should have an `kind` property set to "module"', function() {
 				var doclet = doclets[0];
 				expect(doclet).to(have_property, 'kind');
 				expect(doclet.kind).to(eql, 'module');
 			});
 			
 			it('should have a `name` property set to the given name"', function() {
 				var doclet = doclets[0];
 				expect(doclet).to(have_property, 'name');
 				expect(doclet.name).to(eql, './webui/utils.strings');
 				expect(doclet).to(have_property, 'path');
 				expect(doclet.path).to(eql, 'module:"./webui/utils.strings"');
 			});
 		});
 		
 		describe('A function exported by a moduke', function() {
 			it('should a path that includes the name of the module', function() {
 				var doclet = doclets[1];
 				
 				expect(doclet).to(have_property, 'name');
 				expect(doclet.name).to(eql, 'twiddle');
 				expect(doclet).to(have_property, 'path');
 				expect(doclet.path).to(eql, 'module:"./webui/utils.strings".twiddle');
 			});
 		});
		
	});
})();