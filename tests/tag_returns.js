(function() {
	var jsdoc = { parser: require('jsdoc/parser') };
	
	jsdoc.parser.parseFiles(BASEDIR + 'tests/tag_returns.js');
	var docset = jsdoc.parser.result;
	
	var testSuite = {
		suiteName: 'tag_returns',
	
		setUp: function() {
		},
		
		tearDown: function() {
		},
	
		testExample: function() {
			var docs = docset.getDocsByPath('data');
			
			assertEqual(docs.length, 1, 'All doclets by that path name are found.');
			
			var doc = docs[0].toObject(),
				returns = doc.returns;

			assertEqual(typeof returns, 'object', 'The doclet has examples.');
			assertEqual(returns.length, 2, 'The doclet has the expected number of examples.');
			assertEqual(returns[0].text, 'blah blah', 'The tag has the expected text.');
 		
 			assertEqual(returns[1].type, 'boolean', 'The tag has the expected type.');
 		}
	};
	
	testSuites.push(testSuite);
})();

function sample() {

	/**
	 * @method
	 * @returns {boolean}
	 */
	function data(name, value) {
	}
}
