/*global describe: true, expect: true, it: true, xit: true */
describe('jsdoc/util/markdown', function() {
	var markdown = require('jsdoc/util/markdown');

	it('should exist', function() {
		expect(markdown).toBeDefined();
		expect(typeof markdown).toEqual('object');
	});

	it('should export a "getParser" function', function() {
		expect(markdown.getParser).toBeDefined();
		expect(typeof markdown.getParser).toEqual('function');
	});

	describe('getParser', function() {
		xit('should retrieve a function when called with default settings', function() {
			// TODO
		});

		xit('should use the evilstreak parser when requested', function() {
			// TODO
		});

		xit('should use the GFM parser when requested', function() {
			// TODO
		});

		xit('should convert GitHub repo references to links when the correct options are defined', function() {
			// TODO
		});

		it('should not apply formatting to inline tags when the evilstreak parser is enabled', function() {
			// TODO
		});

		it('should not apply formatting to inline tags when the GFM parser is enabled', function() {
			// TODO
		});
	});
});