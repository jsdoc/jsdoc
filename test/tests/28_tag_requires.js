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
			
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/etc_requirejs.js');
			
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
 		describe('A doclet that lists a module with no requires', function() {
 			it('should have no `requires`', function() {
 				var doclet = doclets[0];
 				expect(doclet.requires).to(be_undefined);
 			});
 		});
 		
 		describe('A doclet that requires a module', function() {
 			it('should have the required module listed in its `requires` property', function() {
 				var doclet = doclets[2];
 				expect(doclet).to(have_property, 'requires');
 				expect(doclet.requires).to(be_an, String)
 			});
 		});
 		
 		describe('A doclet that requires many modules', function() {
 			it('should have all the required module listed in its `requires` property', function() {
 				var doclet = doclets[4];
 				expect(doclet).to(have_property, 'requires');
 				expect(doclet.requires).to(be_an, Array)
 			});
 		});
 		
	});
})();