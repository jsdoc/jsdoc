(function() {
	var jsdoc = { parser: require('jsdoc/parser') };
	
	jsdoc.parser.parseFiles(BASEDIR + 'tests/tag_namespace.js');
	var docset = jsdoc.parser.result;
	
	var testSuite = {
		suiteName: 'tag_namespace',
	
		setUp: function() {
		},
		
		tearDown: function() {
		},
	
		testNsDocs: function() {
			assertEqual(typeof docset, 'object');
		},
	
		testNsCompactTag: function() {
			var doc = docset.getDocsByPath('polygons');
			assertEqual(doc.length, 1, '1 doclet by that name is found.');
		},
		
		testNsNested: function() {
			var doc = docset.getDocsByPath('polygons.quadrilaterals');
			assertEqual(doc.length, 1, '1 doclet by that name is found.');
		}
	};
	
	testSuites.push(testSuite);
})();

function sample() {

	/** @namespace polygons Closed figure made by joining line segments. */
	this['polygons'] = {};
	
	/** @namespace */
	polygons.quadrilaterals = {};
}