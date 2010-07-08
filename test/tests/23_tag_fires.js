(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@fires', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_fires.js');
			
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
		describe('A doclet with a a @fires tag', function() {
			it('should have a `fires` property', function() {
				var doclet = doclets[0];
				expect(doclet).to(have_property, 'fires');
			});
		});
		
		describe('The value of the `fires` property', function() {
			it('should be equal to the given tag value', function() {
				var doclet = doclets[0];
				expect(doclet.fires).to(eql, 'event:disable');
			});
		});
		
		describe('A doclet with a 2 @fires tags', function() {
			it('should have a `fires` property set to an array of length 2', function() {
				var doclet = doclets[1];
				expect(doclet).to(have_property, 'fires');
				expect(doclet.fires).to(have_length, 2);
			});
		});
	});
})();
