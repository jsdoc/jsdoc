(function() {
	var jsdoc,
		tags;
	
	JSpec.describe('jsdoc/tag.js', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/06_jsdoc_tag.js');
			tags = jsdoc.parser.result[0].tags;
		});
		
		describe('The object exported by the jsdoc/tag module', function() {
			it('should be an object', function() {
				expect(jsdoc.tag).to(be_an, Object);
			});
			
			it('should have a `fromTagText` method', function() {
				expect(jsdoc.tag).to(respond_to, 'fromTagText');
			});
			
			it('should have a `parse` method', function() {
				expect(jsdoc.tag).to(respond_to, 'parse');
			});
		});
		
		describe('The tag object', function() {
			it('should be a Tag', function() {
				var tag = tags[0];
				expect(tag.constructor.name).to(eql, 'Tag');
			});
 			
 			it('should have a `raw` property which is an string', function() {
 				var tag = tags[0];
				expect(tag).to(have_property, 'raw');
 				expect(tag.raw).to(be_an, String);
 			});
 			
 			it('should have a `name` property which is an string', function() {
 				var tag = tags[0];
				expect(tag).to(have_property, 'name');
 				expect(tag.name).to(be_an, String);
 			});
 			
 			it('should have a `text` property which is an string', function() {
 				var tag = tags[0];
				expect(tag).to(have_property, 'text');
 				expect(tag.text).to(be_an, String);
 			});
 			
 			it('should have a `type` property which is an array', function() {
 				var tag = tags[0];
				expect(tag).to(have_property, 'type');
 				expect(tag.type).to(be_an, Array);
 			});
		});
		
		describe('The tag#raw property', function() {
			it('should be set to all the characters after the leading @', function() {
 				var tag = tags[0];
				expect(tag.raw).to(include, 'desc Hello world');
 			});
		});
		
		describe('The tag#name property', function() {
			it('should be set to the text after the leading @', function() {
 				var tag = tags[0];
				expect(tag.name).to(eql, 'desc');
 			});
		});
		
		describe('The tag#text property', function() {
			it('should be set to the text after the @name', function() {
 				var tag = tags[0];
				expect(tag.text).to(eql, 'Hello world');
 			});
		});

	});
})();

(function testarea() {

	/**
		@desc Hello world
		@name Foo
		@constructor
	*/

})();