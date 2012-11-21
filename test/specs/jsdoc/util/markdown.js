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
            // store the old configuration
            var old = (env.conf.markdown ? env.conf.markdown.parser : undefined);
            env.conf.markdown = {parser: 'evilstreak'};

            // get the evilstreak parser and do the test
            var parser = markdown.getParser();
            expect(parser('{@link MyClass#_x} and {@link MyClass#_y}')).toEqual(
                '<p>{@link MyClass#_x} and {@link MyClass#_y}</p>');

            // restore the old value
            if (old === undefined) {
                env.conf.markdown.parser = old;
            } else {
                delete env.conf.markdown;
            }
		});

		it('should not apply formatting to inline tags when the GFM parser is enabled', function() {
            // store the old configuration
            var old = (env.conf.markdown ? env.conf.markdown.parser : undefined);
            env.conf.markdown = {parser: 'gfm'};

            // get the gfm parser and do the test
            var parser = markdown.getParser();
            expect(parser('{@link MyClass#_x} and {@link MyClass#_y}')).toEqual(
                '<p>{@link MyClass#_x} and {@link MyClass#_y}</p>');

            // restore the old value
            if (old === undefined) {
                env.conf.markdown.parser = old;
            } else {
                delete env.conf.markdown;
            }
		});
	});
});
