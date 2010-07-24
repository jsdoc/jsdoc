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
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_member.js');
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
			
		});
		
		describe('A doclet with a method tag and a memberof tag', function() {
			it('should have an `kind` property set to "method"', function() {
				var doclet = doclets[2];
				expect(doclet).to(have_property, 'kind');
				expect(doclet.kind).to(eql, 'method');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[2];
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'fah');
			});
			
			it('should have a `memberof` property set to the given member name', function() {
				var doclet = doclets[2];
				expect(doclet).to(have_property, 'memberof');
				expect(doclet.memberof).to(eql, 'foo#');
			});
			
			it('should have a `path` property set to the parent+member names', function() {
				var doclet = doclets[2];
				expect(doclet).to(have_property, 'path');
				expect(doclet.path).to(eql, 'foo#fah');
			});
		});
		
		describe('A doclet with a property tag and a member tag', function() {
			it('should have an `kind` property set to "property"', function() {
				var doclet = doclets[3];
				expect(doclet).to(have_property, 'kind');
				expect(doclet.kind).to(eql, 'property');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[3];
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'bah');
			});
			
			it('should have a `memberof` property set to the given member name', function() {
				var doclet = doclets[3];
				expect(doclet).to(have_property, 'memberof');
				expect(doclet.memberof).to(eql, 'bar');
			});
			
			it('should have a `path` property set to the parent+member names', function() {
				var doclet = doclets[3];
				expect(doclet).to(have_property, 'path');
				expect(doclet.path).to(eql, 'bar.bah');
			});
		});
		
		describe('A doclet with a property tag and a member tag and an inner tag', function() {
			it('should have an `kind` property set to "property"', function() {
				var doclet = doclets[4];
				expect(doclet).to(have_property, 'kind');
				expect(doclet.kind).to(eql, 'property');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[4];
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'bish');
			});
			
			it('should have a `memberof` property set to the given member name', function() {
				var doclet = doclets[4];
				expect(doclet).to(have_property, 'memberof');
				expect(doclet.memberof).to(eql, 'bar');
			});
			
			it('should have a `path` property set to the memberof~name', function() {
				var doclet = doclets[4];
				expect(doclet).to(have_property, 'path');
				expect(doclet.path).to(eql, 'bar~bish');
			});
		});
		
		describe('A doclet with a property tag and a member tag and an instance access tag', function() {
			it('should have an `kind` property set to "property"', function() {
				var doclet = doclets[5];
				expect(doclet).to(have_property, 'kind');
				expect(doclet.kind).to(eql, 'property');
			});
			
			it('should have a `name` property set to the given name"', function() {
				var doclet = doclets[5];
				expect(doclet).to(have_property, 'name');
				expect(doclet.name).to(eql, 'bosh');
			});
			
			it('should have a `memberof` property set to the given member name', function() {
				var doclet = doclets[5];
				expect(doclet).to(have_property, 'memberof');
				expect(doclet.memberof).to(eql, 'bar');
			});
			
			it('should have a `path` property set to the memberof~name', function() {
				var doclet = doclets[5];
				expect(doclet).to(have_property, 'path');
				expect(doclet.path).to(eql, 'bar#bosh');
			});
		});
		
	});
})();
