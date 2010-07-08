(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@example', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/17_tag_example.js');

			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
		describe('A doclet with a @example tag', function() {
			it('should have an `example` property', function() {
				var doclet = doclets[0];
				expect(doclet).to(have_property, 'example');
			});
		});
		
		describe('the value of the `example` property', function() {
			it('should preserve all whitespace', function() {
				var doclet = doclets[0];
				expect(doclet.example).to(eql, '    var myresult;\n    myresult = foo(a, b);\n');
			});
		});
		
		describe('A doclet with 2 @example tags', function() {
			it('should have an `example` property with length of 2', function() {
				var doclet = doclets[1];
				expect(doclet).to(have_property, 'example');
				expect(doclet.example.length).to(eql, 2);
			});
		});
	});
})();

(function testarea() {

	/**
	 * @function foo
	 * @example
	 *     var myresult;
	 *     myresult = foo(a, b);
	 */
	
	/**
	 * @function bar
	 * @example one fish
	 * @example two fish
	 */
})();