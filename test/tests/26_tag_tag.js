(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@tag', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_tag.js');
			
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
		describe('A doclet with single @tag <name>', function() {
			it('should have a `tag` property of type array with a single member', function() {
				var doclet = doclets[0];
				expect(doclet).to(have_property, 'tags');
				expect(doclet.tags).to(be_an, Array);
				expect(doclet.tags.length).to(be, 1);
			});
			
			it('that tag should have a name property set to <name>, and no description property', function() {
				var doclet = doclets[0];
				expect(doclet.tags[0]).to(be_an, String);
				expect(doclet.tags[0]).to(be, 'hilited');
			});
		});
		
		describe('A doclet with two @tag <name>', function() {
			it('should have a tag with a name property set to <name>, and description set to <description>', function() {
				var doclet = doclets[1];
				expect(doclet.tags[0]).to(be_an, String);
				expect(doclet.tags[0]).to(be, 'experimental');
				
				expect(doclet.tags[1]).to(be_an, String);
				expect(doclet.tags[1]).to(be, 'lots of words');
			});
		});
		
		describe('A doclet with an empty @tag', function() {
			it('should have no tag property', function() {
				var doclet = doclets[2];
				expect(doclet.tags).to(be_undefined);
			});
		});
		
	});
})();
