(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@scope', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_scope.js');
			
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
		describe('A doclet with global scope', function() {
			it('should have a `scope` property of type string equalling "global"', function() {
				var doclet = doclets[0];
				expect(doclet).to(have_property, 'scope');
				expect(doclet.scope).to(be_an, String);
				expect(doclet.scope).to(be, 'global');
			});
			
			it('should have a `path` property of type string equalling its namepath', function() {
				var doclet = doclets[0];
				expect(doclet).to(have_property, 'path');
				expect(doclet.path).to(be_an, String);
				expect(doclet.path).to(be, 'outie');
			});
		});
		
		describe('A doclet with inner scope', function() {
			it('should have a `scope` property of type string equalling "inner"', function() {
				var doclet = doclets[1];
				expect(doclet).to(have_property, 'scope');
				expect(doclet.scope).to(be_an, String);
				expect(doclet.scope).to(be, 'inner');
			});
			
			it('should have a `path` property of type string equalling its namepath', function() {
				var doclet = doclets[1];
				expect(doclet).to(have_property, 'path');
				expect(doclet.path).to(be_an, String);
				expect(doclet.path).to(be, 'outie~innie');
			});
		});
		
		describe('A doclet with static scope', function() {
			it('should have a `scope` property of type string equalling "static"', function() {
				var doclet = doclets[2];
				expect(doclet).to(have_property, 'scope');
				expect(doclet.scope).to(be_an, String);
				expect(doclet.scope).to(be, 'static');
			});
			
			it('should have a `path` property of type string equalling its namepath', function() {
				var doclet = doclets[2];
				expect(doclet).to(have_property, 'path');
				expect(doclet.path).to(be_an, String);
				expect(doclet.path).to(be, 'outie.stat');
			});
		});
		
		describe('A var doclet with global scope', function() {
			it('should have a `scope` property of type string equalling "global"', function() {
				var doclet = doclets[3];
				expect(doclet).to(have_property, 'scope');
				expect(doclet.scope).to(be_an, String);
				expect(doclet.scope).to(be, 'global');
			});
			
			it('should have a `path` property of type string equalling its namepath', function() {
				var doclet = doclets[3];
				expect(doclet).to(have_property, 'path');
				expect(doclet.path).to(be_an, String);
				expect(doclet.path).to(be, 'varoutie');
			});
		});
		
		describe('A var doclet with inner scope', function() {
			it('should have a `scope` property of type string equalling "inner"', function() {
				var doclet = doclets[4];
				expect(doclet).to(have_property, 'scope');
				expect(doclet.scope).to(be_an, String);
				expect(doclet.scope).to(be, 'inner');
			});
			
			it('should have a `path` property of type string equalling its namepath', function() {
				var doclet = doclets[4];
				expect(doclet).to(have_property, 'path');
				expect(doclet.path).to(be_an, String);
				expect(doclet.path).to(be, 'varoutie~varinnie');
			});
		});
	});
})();
