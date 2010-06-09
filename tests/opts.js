(function() {
	var jsdoc = { opts: require('jsdoc/opts') };
	
	testSuite = {
		suiteName: 'jsdoc/opts',
	
		setUp: function() {
		},
		
		tearDown: function() {
		},
	
		testOptsApi: function() {
			assertEqual(typeof jsdoc.opts.set, 'function');
		},
	
		testOptsSetDefault: function() {
			var opts =  jsdoc.opts.set();
			
			assertEqual(typeof opts, 'object');
			assertEqual(typeof opts.destination, 'string');
			assertEqual(opts.destination, 'jsdoc.xml');
		},
	
		testOptsSet: function() {
			var opts =  jsdoc.opts.set(['-d', 'mydestination.json']);
			
			assertEqual(typeof opts, 'object');
			assertEqual(typeof opts.destination, 'string');
			assertEqual(opts.destination, 'mydestination.json');
		}
	};
})();