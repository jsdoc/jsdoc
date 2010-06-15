(function() {
	var jsdoc = { parser: require('jsdoc/parser') };
	
	jsdoc.parser.parseFiles(BASEDIR + 'tests/tag_example.js');
	var docset = jsdoc.parser.result;
	
	var testSuite = {
		suiteName: 'tag_example',
	
		setUp: function() {
		},
		
		tearDown: function() {
		},
	
		testExample: function() {
			var docs = docset.getDocsByPath('rotate');
			
			assertEqual(docs.length, 1, 'All doclets by that path name are found.');
			
			var doc = docs[0].toObject(),
				examples = doc.example;

			assertEqual(typeof examples, 'object', 'The doclet has examples.');
			assertEqual(examples.length, 2, 'The doclet has the expected number of examples.');
			assertEqual(examples[0], '    var myShape = new Shape();\n    rotate(myShape, 90, {0, 0});\n', 'The doclet has the expected text.');
 		
 			assertEqual(examples[1], '{key:  rotate(myShape, -45) } // thats not a type expression\n', 'The doclet has the expected text when braces are at the start.');

 		}
	};
	
	testSuites.push(testSuite);
})();

function sample() {

	/**
	 * @method
	 * @example
	 *     var myShape = new Shape();
	 *     rotate(myShape, 90, {0, 0});
	 * @example {key:  rotate(myShape, -45) } // thats not a type expression
	 */
	function rotate(shape, deg, axis) {
	}
}
