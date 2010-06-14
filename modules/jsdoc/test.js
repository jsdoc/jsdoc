/**
	@overview
	@author Michael Mathews <micmath@gmail.com>
	@license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */

/**
	Unit tests runner for JSDoc Toolkit.
	@module jsdoc/test
 */
(function() {	
	
	exports.runAll = function() {
		load(BASEDIR + 'lib/jsunity.js');
		
		testSuites = [];
 		load(BASEDIR + 'tests/opts.js');
 		load(BASEDIR + 'tests/docset.js');
 		load(BASEDIR + 'tests/tag_namespace.js');
		load(BASEDIR + 'tests/tag_constructor.js');
 		load(BASEDIR + 'tests/tag_const.js');
 		load(BASEDIR + 'tests/tag_enum.js');
 		load(BASEDIR + 'tests/tag_param.js');
		
		jsUnity.attachAssertions();
		jsUnity.log = function (s) { print(s); };
		var results = jsUnity.run.apply(jsUnity, testSuites);
		summarize(results);
	}
	
	function summarize(results) {
		var colorStart,
			colorEnd = '\033[m';
			
		print('------------------');
		print('Total: ' + results.total + ' tests');
		
		if (results.failed === 0) {
			colorStart = '\033[1;37;42m', // green
			print(colorStart + 'ALL PASS' + colorEnd);
		}
		else {
			colorStart = '\033[1;37;41m'; // red
			print(colorStart + results.failed + 'FAILED' + colorEnd);
		}
		print('');
	}
	
})();