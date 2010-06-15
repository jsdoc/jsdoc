(function() {
	var jsdoc = { parser: require('jsdoc/parser') };
	
	jsdoc.parser.parseFiles(BASEDIR + 'tests/tag_param.js');
	var docset = jsdoc.parser.result;
	
	var testSuite = {
		suiteName: 'tag_param',
	
		setUp: function() {
		},
		
		tearDown: function() {
		},
	
		testParamWithSimpleType: function() {
			var docs = docset.getDocsByPath('Shape');
			
			assertEqual(docs.length, 1, 'All constructor doclets by that path name are found.');
			
			var doc = docs[0].toObject(),
				params = doc.param;
//print('>>> doc is '+doc.toSource());
//print('>>> params is '+params.toSource());
			assertEqual(params[0].name, 'top', 'The found parameter has the correct name.');
 			assertEqual(typeof params[0].type, 'object', 'The found parameter has types.');
			assertEqual(params[0].type.length, 1, 'The found parameter has the correct number of types.');
 			assertEqual(params[0].type[0], 'number', 'The found parameter has the correct type value.');
 			
		},
	
		testParamWithNullableType: function() {
			var docs = docset.getDocsByPath('Shape');
			
			assertEqual(docs.length, 1, 'All constructor doclets by that path name are found.');
			
			var doc = docs[0].toObject(),
				params = doc.param;
			
			assertEqual(params[1].name, 'left', 'The found parameter has the correct name.');
 			assertEqual(typeof params[1].type, 'object', 'The found parameter has types.');
			assertEqual(params[1].type.length, 1, 'The found parameter has the correct number of types.');
 			assertEqual(params[1].type[0], 'number', 'The found parameter has the correct type value.');
 			assertEqual(params[1].nullable, false, 'The found parameter has the correct !nullable value.');
			assertEqual(params[2].nullable, true, 'The found parameter has the correct ?nullable value.');
		},
	
		testParamWithOptionalType: function() {
			var docs = docset.getDocsByPath('Shape');
			
			assertEqual(docs.length, 1, 'All doclets by that path name are found.');
			
			var doc = docs[0].toObject(),
				params = doc.param;
			
			assertEqual(params[3].name, 'fixed', 'The found parameter has the correct name.');
 			assertEqual(typeof params[1].type, 'object', 'The found parameter has types.');
			assertEqual(params[3].type.length, 1, 'The found parameter has the correct number of types.');
 			assertEqual(params[3].type[0], 'boolean', 'The found parameter has the correct type value.');
 			assertEqual(params[3].nullable, undefined, 'The found parameter has the default nullable value.');
			assertEqual(params[3].optional, true, 'The found parameter has the correct optional value.');
		},
	
		testParamWithMultipleType: function() {
			var docs = docset.getDocsByPath('rotate');
			
			assertEqual(docs.length, 1, 'All doclets by that path name are found.');
			
			var doc = docs[0].toObject(),
				params = doc.param;
			
			assertEqual(params[0].name, 'deg', 'The found parameter has the correct name.');
 			assertEqual(typeof params[0].type, 'object', 'The found parameter has types.');
			assertEqual(params[0].type.length, 2, 'The found parameter has the correct number of types.');
 			assertEqual(params[0].type[0], 'Degree', 'The found parameter has the correct type[0] value.');
 			assertEqual(params[0].type[1], 'number', 'The found parameter has the correct type[1] value.');
		
			assertEqual(params[1].name, 'axis', 'The found parameter has the correct name.');
			assertEqual(params[1].optional, true, 'The found parameter has the correct optional.');

		},
	
		testParamDesc: function() {
			var docs = docset.getDocsByPath('resize');
			
			assertEqual(docs.length, 1, 'All doclets by that path name are found.');
			
			var doc = docs[0].toObject(),
				param = doc.param;
				
			assertEqual(typeof param, 'object', 'The found parameter has the expected type.');
			assertEqual(param.name, 'ratio', 'The found parameter has the correct name.');
 			assertEqual(typeof param.type, 'object', 'The found parameter has types.');
			assertEqual(param.type.length, 2, 'The found parameter has the correct number of types.');
 			assertEqual(param.type[0], 'Function', 'The found parameter has the correct type[0] value.');
 			assertEqual(param.type[1], 'number', 'The found parameter has the correct type[1] value.');
			assertEqual(param.desc, 'A number\n		or a function.', 'The found parameter has the expected description.');
		}
	};
	
	testSuites.push(testSuite);
})();

function sample() {

	/** @constructor
		@param {number} top
		@param {!number} left
		@param {?number} sides
		@param {boolean=} fixed
	 */
	function Shape(top, left, sides, fixed) {
	}
	
	/** @method
		@param {Degree|number} deg
		@param [axis]
	 */
	function rotate(deg, axis) {
	
	}
	
	/** @method
		@param {Function|number} ratio A number
		or a function.
	 */
	function resize(ratio) {
	
	}
}
