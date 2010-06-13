(function() {
	var jsdoc = { parser: require('jsdoc/parser') };
	
	jsdoc.parser.parseFiles(BASEDIR + 'tests/tag_constructor.js');
	var docset = jsdoc.parser.result;
	
	var testSuite = {
		suiteName: 'tag_constructor',
	
		setUp: function() {
		},
		
		tearDown: function() {
		},
	
		testConstructorDocs: function() {
			assertEqual(typeof docset, 'object');
		},
	
		testConstructorCompactTag: function() {
			var doc = docset.getDocsByPath('Triangle');
			assertEqual(doc.length, 1, '1 doclet by that name is found.');
			
			doc = doc[0];
			
			assertEqual(typeof doc, 'object', 'The found doclet is an object.');
			assertEqual(doc.tagText('name'), 'Triangle', 'The found doclet has the expected name.');
 			assertEqual(doc.tagText('path'), 'Triangle', 'The found doclet has the expected path.');
 			assertEqual(doc.tagText('denom'), 'constructor', 'The found doclet has the expected denom.');
 			assertEqual(doc.tagText('desc'), 'A three-sided polygon.', 'The found doclet has the expected desc.');
		},
	
		testConstructorFromCode: function() {
			var doc = docset.getDocsByPath('shapes.Quadrilateral');
			assertEqual(doc.length, 1, '1 doclet by that name is found.');
			
			doc = doc[0];
			
			assertEqual(typeof doc, 'object', 'The found doclet is an object.');
			assertEqual(doc.tagText('path'), 'shapes.Quadrilateral', 'The found doclet has the expected path.');
			assertEqual(doc.tagText('name'), 'Quadrilateral', 'The found doclet has the expected name.');
			assertEqual(doc.tagText('memberof'), 'shapes', 'The found doclet has the expected memberof.');
			assertEqual(doc.tagText('desc'), '', 'The found doclet has the expected desc.');
		},
	
		testConstructorBeforeVar: function() {
			var doc = docset.getDocsByPath('Polygon');
			assertEqual(doc.length, 1, '1 doclet by that name is found.');
			
			doc = doc[0];
			
			assertEqual(typeof doc, 'object', 'The found doclet is an object.');
			assertEqual(doc.tagText('path'), 'Polygon', 'The found doclet has the expected path.');
			assertEqual(doc.tagText('name'), 'Polygon', 'The found doclet has the expected name.');
			assertEqual(doc.tagText('memberof'), '', 'The found doclet has the expected memberof.');
			assertEqual(doc.tagText('desc'), 'Jsdoc is before the `var`.', 'The found doclet has the expected desc.');
		},
	
		testConstructorNested: function() {
			var doc = docset.getDocsByPath('Polygon#Rhombus');
			assertEqual(doc.length, 1, '1 doclet by that name is found.');
			
			doc = doc[0];
			
			assertEqual(typeof doc, 'object', 'The found doclet is an object.');
			assertEqual(doc.tagText('path'), 'Polygon#Rhombus', 'The found doclet has the expected path.');
			assertEqual(doc.tagText('name'), 'Rhombus', 'The found doclet has the expected name.');
			assertEqual(doc.tagText('memberof'), 'Polygon#', 'The found doclet has the expected memberof.');
			assertEqual(doc.tagText('denom'), 'constructor', 'The found doclet has the expected denom.');
		},
		
		testConstructorInVarList: function() {
			var doc = docset.getDocsByPath('Trapezoid');
			assertEqual(doc.length, 1, '1 doclet by that name is found.');
			
			doc = doc[0];
			
			assertEqual(typeof doc, 'object', 'The found doclet is an object.');
		}
	};
	
	testSuites.push(testSuite);
})();

function sample() {

	/**@constructor Triangle A three-sided polygon.*/
	/**
	 * A four-sided polygon having equal-length sides meeting at right angles.
	 * @constructor
	 * @name Square
	 */
	someIgnoredCode = function() {}
	
	/** @constructor */
	shapes.Quadrilateral = new Klass("shapes", "Quadrilateral");
	
	/** 
		Jsdoc is before the `var`.
		@constructor
	*/
	var Polygon = function() {
		/** A nested constructor
			@constructor
		 */
		this.Rhombus = function () {}
	},
	/** 
		In a list of vars.
		@constructor
	*/
	Trapezoid = function() {};
}