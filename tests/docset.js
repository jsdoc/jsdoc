(function() {
	var jsdoc = { parser: require('jsdoc/parser') };
	
	jsdoc.parser.parseFiles(BASEDIR + 'tests/docset.js');
	var docset = jsdoc.parser.result;
	
	var testSuite = {
		suiteName: 'docset',
	
		setUp: function() {
		},
		
		tearDown: function() {
		},
	
		testDocsetGetMethodDocsByPath: function() {
			var docs = docset.getDocsByPath('Shape');
			
			assertEqual(docs.length, 1, 'All constructor doclets by that path name are found.');
			assertEqual(docs[0].tagText('isa'), 'constructor', 'The found constructor doclet has the correct isa.');
			assertEqual(docs[0].tagText('name'), 'Shape', 'The found constructor doclet has the correct name.');
			assertEqual(docs[0].tagText('memberof'), '', 'The found constructor doclet has the correct memberof.');
		
			docs = docset.getDocsByPath('Shape#init');
			
			assertEqual(docs.length, 1, 'All instance method doclets by that path name are found.');
			assertEqual(docs[0].tagText('isa'), 'method', 'The found instance method doclet has the correct isa.');
			assertEqual(docs[0].tagText('name'), 'init', 'The found instance method doclet has the correct name.');
			assertEqual(docs[0].tagText('memberof'), 'Shape#', 'The found instance method doclet has the correct memberof.');
		

			docs = docset.getDocsByPath('Shape.validate');
			
			assertEqual(docs.length, 1, 'All static method doclets by that path name are found.');
			assertEqual(docs[0].tagText('isa'), 'method', 'The found static method doclet has the correct isa.');
			assertEqual(docs[0].tagText('name'), 'validate', 'The found static method doclet has the correct name.');
			assertEqual(docs[0].tagText('memberof'), 'Shape', 'The found static method doclet has the correct memberof.');
		},
	
		testDocsetGetEventDocsByPath: function() {
			var docs = docset.getDocsByPath('Shape#event:init');
			
			assertEqual(docs.length, 1, 'All instance event doclets by that path name are found.');
			assertEqual(docs[0].tagText('isa'), 'event', 'The found instance event doclet has the correct isa.');
			assertEqual(docs[0].tagText('name'), 'init', 'The found instance event doclet has the correct name.');
			assertEqual(docs[0].tagText('memberof'), 'Shape#', 'The found instance event doclet has the correct memberof.');

			docs = docset.getDocsByPath('Shape.event:validate');
			
			assertEqual(docs.length, 1, 'All static event doclets by that path name are found.');
			assertEqual(docs[0].tagText('isa'), 'event', 'The found static event doclet has the correct isa.');
			assertEqual(docs[0].tagText('name'), 'validate', 'The static instance event doclet has the correct name.');
			assertEqual(docs[0].tagText('memberof'), 'Shape', 'The static instance event doclet has the correct memberof.');
		}
	};
	
	testSuites.push(testSuite);
})();

function sample() {

	/** @constructor */
	function Shape() {
	}
	
	/** @method */
	Shape.validate = function(shape) {};
	
	/** @event Shape.validate */
	addEvent(Shape, 'validate');
	
	/** @method */
	Shape.prototype.init = function(opts) {};
	
	/** @event Shape#event:init */
	addEvent(Shape.prototype, 'init');
}
