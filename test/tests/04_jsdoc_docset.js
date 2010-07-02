(function() {
	var jsdoc;
	
	JSpec.describe('jsdoc/docset.js', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = { parser: require('jsdoc/parser') };
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/04_jsdoc_docset.js');
		});
		
		describe('The docset object', function() {
			it('should be an array', function() {
				expect(jsdoc.parser.result).to(be_an, Array);
			});
			
			it('should have a `toObject` method', function() {
				expect(jsdoc.parser.result).to(respond_to, 'toObject');
			});
			
			it('should have a `toString` method', function() {
				expect(jsdoc.parser.result).to(respond_to, 'toString');
			});
			
			it('should have a `toJSON` method', function() {
				expect(jsdoc.parser.result).to(respond_to, 'toJSON');
			});
			
			it('should have a `toXML` method', function() {
				expect(jsdoc.parser.result).to(respond_to, 'toXML');
			});
		});
	});
})();

(function testarea() {

	/** @constructor Foo */

})();