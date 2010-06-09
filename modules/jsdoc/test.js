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
		load(BASEDIR + 'tests/opts.js');
		
		jsUnity.attachAssertions();
		jsUnity.log = function (s) { print(s); };
		var results = jsUnity.run(testSuite);
		summarize(results);
	}
	
	function summarize(results) {
		var colorStart = '\033[1;37;42m', // green
			colorEnd = '\033[m';
			
		print('--------');
		if (results.failed !== 0) {
			colorStart = '\033[1;37;41m'; // red
		}
		print(colorStart + 'Total: ' + results.total + ', Pass: ' + results.passed + ', Fail: ' + results.failed + colorEnd);
	}
	
})();