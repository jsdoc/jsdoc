(function() {
	var jsdoc;
	
	JSpec.describe('jsdoc/parser.js', function() {
	
		before_each(function() {
			jsdoc = { parser: require('jsdoc/parser') };
		});
		
		describe('The object exported by the jsdoc/src module', function() {
			it('should be an object', function() {
				expect(jsdoc.parser).to(be_an, Object);
			});
			
			it('should have a `parseFiles` method', function() {
				expect(jsdoc.parser).to(respond_to, 'parseFiles');
			});
		});
		
		describe('The jsdoc.parser.result value', function() {
			it('should initially be an empty array', function() {
				expect(jsdoc.parser.result).to(be_an, Array);
				expect(jsdoc.parser.result).to(have_length, 0);
			});
			
			it('should be set by calling jsdoc.parser.parseFiles', function() {
				jsdoc.parser.parseFiles(BASEDIR + 'test/tests/03_jsdoc_parser.js');
				expect(jsdoc.parser.result).to(be_an, Array);
				expect(jsdoc.parser.result).to(have_length, 1);
			});
			
			it('should be populated by doclets', function() {
				jsdoc.parser.parseFiles(BASEDIR + 'test/tests/03_jsdoc_parser.js');
				expect(jsdoc.parser.result[0].constructor.name).to(eql, 'Doclet');
			});
		});
	});
})();

(function testarea() {

	/** @constructor Foo */

})();