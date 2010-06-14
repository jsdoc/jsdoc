(function() {
	var jsdoc = { parser: require('jsdoc/parser') };
	
	jsdoc.parser.parseFiles(BASEDIR + 'tests/tag_const.js');
	var docset = jsdoc.parser.result;
	
	var testSuite = {
		suiteName: 'tag_const',
	
		setUp: function() {
		},
		
		tearDown: function() {
		},
	
		testConstDocs: function() {
			assertEqual(typeof docset, 'object');
		},
	
		testConstCompactTag: function() {
			var docs = docset.getDocsByPath('pi');
			assertEqual(docs.length, 1, '1 doclet by that name is found.');
			
			var doc = docs[0].toObject();

			assertEqual(typeof doc, 'object', 'The found doclet is an object.');
			assertEqual(doc.path, 'pi', 'The found doclet has the expected path.');
 			assertEqual(doc.type, 'number', 'The found doclet has the expected type.');
 			assertEqual(doc.desc, "The ratio of any circle's circumference to its diameter.", 'The found doclet has the expected desc.');
		},
	
		testConstCompactVerbose: function() {
			var doc = docset.getDocsByPath('e');
			assertEqual(doc.length, 1, '1 doclet by that name is found.');
			
			doc = doc[0];
			
			assertEqual(typeof doc, 'object', 'The found doclet is an object.');
			assertEqual(doc.tagText('path'), 'e', 'The found doclet has the expected path.');
			assertEqual(doc.tagText('type'), 'number', 'The found doclet has the expected type.');
			assertEqual(doc.tagText('desc'), "Euler's number.", 'The found doclet has the expected desc.');
		},
	
		testConstCodename: function() {
			var doc = docset.getDocsByPath('c');
			assertEqual(doc.length, 1, '1 doclet by that name is found.');
			
			doc = doc[0];
			
			assertEqual(typeof doc, 'object', 'The found doclet is an object.');
			assertEqual(doc.tagText('path'), 'c', 'The found doclet has the expected path.');
			assertEqual(doc.tagText('type'), 'number', 'The found doclet has the expected type.');
			assertEqual(doc.tagText('desc'), "Speed of light(m/s)", 'The found doclet has the expected desc.');
		}
	};
	
	testSuites.push(testSuite);
})();

function sample() {

	/**
	 * @const {number} pi The ratio of any circle's circumference to its diameter.
	 */
	
	/**
	 * Euler's number.
	 * @const {number} e
	 */
	
	/**
	 * Speed of light(m/s)
	 * @const {number}
	 * 
	 */
	var c = 299792458; // <- name will be found here

}