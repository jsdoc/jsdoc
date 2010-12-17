(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@exception', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/samples/tag_exception.js');
			
			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
		describe('A doclet with a a @exception tag', function() {
			it('should have a `exception` property', function() {
				var doclet = doclets[0];
				expect(doclet).to(have_property, 'exception');
			});
		});
		
		describe('The type of the `exception` property', function() {
			it('should be equal to the type of the given tag value', function() {
				var doclet = doclets[0];
				expect(doclet.exception.type).to(eql, 'divideByZeroError');
			});
		});
		
		describe('The value of the `exception` property', function() {
			it('should be equal to the description of the given tag value', function() {
				var doclet = doclets[0];
				expect(doclet.exception.description).to(eql, 'Denominator param cannot be zero.');
			});
		});
		
		describe('A doclet with a 2 @exception tags', function() {
			it('should have a `exception` property set to an array of length 2', function() {
				var doclet = doclets[1];
				expect(doclet).to(have_property, 'exception');
				expect(doclet.exception).to(have_length, 2);
			});
		});
	});
})();
