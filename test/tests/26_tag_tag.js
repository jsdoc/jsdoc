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
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_tag.js');
			
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
		describe('A doclet with single @tag <name>', function() {
			it('should have a `tag` property of type array with a single member', function() {
				var doclet = doclets[0];
				expect(doclet).to(have_property, 'tag');
				expect(doclet.tag).to(be_an, Array);
				expect(doclet.tag.length).to(be, 1);
			});
			
			it('that tag should have a name property set to <name>, and no description property', function() {
				var doclet = doclets[0];
				expect(doclet.tag[0]).to(have_property, 'name');
				expect(doclet.tag[0].desc).to(be_undefined);
				expect(doclet.tag[0].name).to(be_an, String);
				expect(doclet.tag[0].name).to(be, 'hilited');
			});
		});
		
		describe('A doclet with single @tag <name> <desc>', function() {
			it('should have a tag with a name property set to <name>, and description set to <desc>', function() {
				var doclet = doclets[1];
				expect(doclet.tag[0]).to(have_property, 'name');
				expect(doclet.tag[0]).to(have_property, 'desc');
				expect(doclet.tag[0].name).to(be_an, String);
				expect(doclet.tag[0].name).to(be, 'api');
				
				expect(doclet.tag[0].desc).to(be_an, String);
				expect(doclet.tag[0].desc).to(be, 'developer');
			});
		});
		
		describe('A doclet with two @tag <name> <desc>', function() {
			it('should have a tag property set to an array of length 2', function() {
				var doclet = doclets[2];
				expect(doclet).to(have_property, 'tag');
				expect(doclet.tag).to(be_an, Array);
				expect(doclet.tag.length).to(be, 2);
			});
		});
		
		describe('A doclet with two @tag <name> - <desc>', function() {
			it('should have a tag property with a name property set to <name>, and description set to <desc>', function() {
				var doclet = doclets[2];
				expect(doclet.tag[0]).to(have_property, 'name');
				expect(doclet.tag[0]).to(have_property, 'desc');
				expect(doclet.tag[0].name).to(be, 'support');
				expect(doclet.tag[0].desc).to(be, 'experimental');
				
			});
		});
		
		describe('A doclet with no @tag', function() {
			it('should not have a tag property', function() {
				var doclet = doclets[3];
				expect(doclet.tag).to(be_undefined);
			});
		});
		
	});
})();
