(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@description', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/09_tag_desc.js');
			doclets = jsdoc.parser.result;
		});
		
  		describe('A doclet that starts with untagged text', function() {
  			it('should have an `description` property set to the text', function() {
  				var doclet = doclets[0].toObject();
  				expect(doclet).to(have_property, 'description');
  				expect(doclet.description).to(eql, 'Here is Edward Bear, coming downstairs now,\nbump,\n bump,\n  bump');
  			});
  		});
  		
  		describe('A doclet that has a @description tag', function() {
  			it('should have an `description` property set to the text of that tag', function() {
  				var doclet = doclets[1].toObject();
  				expect(doclet).to(have_property, 'description');
  				expect(doclet.description).to(eql, 'Here is Edward Bear, coming downstairs now, bump, bump, bump');
  			});
  		});
  		
  		describe('A doclet that has a @description tag', function() {
  			it('should have an `description` property set to the text of that tag', function() {
  				var doclet = doclets[2].toObject();
  				expect(doclet).to(have_property, 'description');
  				expect(doclet.description).to(eql, 'Here is Edward Bear, coming downstairs now, bump, bump, bump');
  			});
  		});
	});
})();

(function testarea() {

	/**
	 * Here is Edward Bear, coming downstairs now,
	 * bump,
	 *  bump,
	 *   bump
	 * @namespace Poo
	 */
	
	/**
		@namespace Bear
		@description Here is Edward Bear, coming downstairs now, bump, bump, bump
	*/
	
	/**
		@namespace Winnie
		@description Here is Edward Bear, coming downstairs now, bump, bump, bump
	*/
	
})();