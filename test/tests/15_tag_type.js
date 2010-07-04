(function() {
	var jsdoc,
		doclets;
	
	JSpec.describe('@type', function() {
	
		before(function() {
			// docsets can only be created by parsers
			jsdoc = {
				tag: require('jsdoc/tag'),
				parser: require('jsdoc/parser')
			};
			jsdoc.parser.parseFiles(BASEDIR + 'test/tests/15_tag_type.js');

			doclets = jsdoc.parser.result.map(function($){ return $.toObject(); });
		});
		
		describe('A doclet with a type tag whose value is a simple string like "number"', function() {
			it('should have an `type` property set to that string', function() {
				var doclet = doclets[2];
				expect(doclet).to(have_property, 'type');
				expect(doclet.type).to(eql, 'number');
			});
		});
		
		describe('A doclet with a type tag whose value is a series of piped strings like "number | Array.<number>"', function() {
			it('should have an `type` property set to an array of those types', function() {
				var doclet = doclets[3];
				expect(doclet).to(have_property, 'type');

				expect(doclet.type).to(eql, ['number', 'Array.<number>']);
			});
		});
		
		describe('A doclet with a type tag whose value contains inner braces like "{number|function(string:a, string:b){}:number}"', function() {
			it('should have an `type` property set to those types, regardless of the inner braces', function() {
				var doclet = doclets[4];
				expect(doclet).to(have_property, 'type');

				expect(doclet.type).to(eql, ['number', 'function(string:a, string:b){}:number']);
			});
		});
	});
})();

(function testarea() {

	/** @namespace foo */
	
	/** @constructor bar */
	
	/**
		@property foo#fah
		@type number
	 */
	
	/**
		@property foo#fahfah
		@type number | Array.<number>
	 */
	
	/**
		@property bar.bah
		@type {number|function(string:a, string:b){}:number}
	 */
	
})();