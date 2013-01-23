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
        // couple of convenience functions letting me set conf variables and restore
        // them back to the originals later.
        function setMarkdownConf(hash) {
            if (!env.conf.markdown) {
                env.conf.markdown = {};
            }
            var keys = Object.keys(hash);
            var storage = {};
            for (var i = 0; i < keys.length; ++i) {
                storage[keys[i]] = env.conf.markdown[keys[i]];
                // works because hash[key] is a scalar not an array/object
                env.conf.markdown[keys[i]] = hash[keys[i]];
            }
            return storage;
        }

        function restoreMarkdownConf(storage) {
            var keys = Object.keys(storage);
            for (var i = 0; i < keys.length; ++i) {
                env.conf.markdown[keys[i]] = storage[keys[i]];
            }
            if (keys.length === 0) {
                delete env.conf.markdown;
            }
        }

		it('should retrieve a function when called with default settings', function() {
            var storage = setMarkdownConf({parser: 'evilstreak'});

            var parser = markdown.getParser();
            expect(typeof parser).toEqual('function');

            setMarkdownConf({parser: 'gfm'});
            parser = markdown.getParser();
            expect(typeof parser).toEqual('function');

            restoreMarkdownConf(storage);
		});

		it('should use the evilstreak parser when requested', function() {
            var storage = setMarkdownConf({parser: 'evilstreak'});
            var parser = markdown.getParser();
            expect(parser._parser).toEqual('markdown');
            restoreMarkdownConf(storage);
		});

		it('should use the GFM parser when requested', function() {
            var storage = setMarkdownConf({parser: 'gfm'});
            var parser = markdown.getParser();
            expect(parser._parser).toEqual('github-flavored-markdown');
            restoreMarkdownConf(storage);
		});

        it('should use GFM parser when parser is not specified but github owner and repo are', function() {
            var storage = setMarkdownConf({githubRepoOwner: 'jsdoc', githubRepoName: 'jsdoc3'});
            var parser = markdown.getParser();
            expect(parser._parser).toEqual('github-flavored-markdown');
            restoreMarkdownConf(storage);
        });

		it('should convert GitHub repo references to links when the correct options are defined', function() {
            var storage = setMarkdownConf({parser: 'gfm', githubRepoOwner: 'jsdoc', githubRepoName: 'jsdoc3'});
            var parser = markdown.getParser();
            expect(parser._parser).toEqual('github-flavored-markdown');

            var sha = '228c940816b5f799a12f83f071a1c67cbb478f39';
            var sha7 = sha.substr(0, 7);

            // Auto-link sha1 if GitHub.nameWithOwner is defined
            expect(parser(sha)).toEqual(
                "<p><a href='http://github.com/jsdoc/jsdoc3/commit/" + sha + "'>" + sha7 + "</a></p>");

            // ** GFM ** Auto-link user@sha1 if GitHub.nameWithOwner is defined
            expect(parser('mathematicalcoffee@' + sha)).toEqual(
                "<p><a href='http://github.com/mathematicalcoffee/jsdoc3/commit/" + sha + "'>mathematicalcoffee@" + sha7 + "</a></p>");

            // ** GFM ** Auto-link user/repo@sha1
            expect(parser('jsdoc/jsdoc3@' + sha)).toEqual(
                "<p><a href='http://github.com/jsdoc/jsdoc3/commit/" + sha + "'>jsdoc/jsdoc3@" + sha7 + "</a></p>");

            // ** GFM ** Auto-link #issue if GitHub.nameWithOwner is defined
            expect(parser('Fixes #1')).toEqual(
                "<p>Fixes <a href='http://github.com/jsdoc/jsdoc3/issues/#issue/1'>#1</a></p>");

            // ** GFM ** Auto-link user#issue if GitHub.nameWithOwner is defined
            expect(parser('mathematicalcoffee#12')).toEqual(
                "<p><a href='http://github.com/mathematicalcoffee/jsdoc3/issues/#issue/12'>mathematicalcoffee#12</a></p>");

            // ** GFM ** Auto-link user/repo#issue
            expect(parser('jsdoc/jsdoc3#1')).toEqual(
                "<p><a href='http://github.com/jsdoc/jsdoc3/issues/#issue/1'>jsdoc/jsdoc3#1</a></p>");
            
            restoreMarkdownConf(storage);
		});

		it('should not apply formatting to inline tags when the evilstreak parser is enabled', function() {
            var storage = setMarkdownConf({parser: 'evilstreak'});

            // get the evilstreak parser and do the test
            var parser = markdown.getParser();
            expect(parser('{@link MyClass#_x} and {@link MyClass#_y}')).toEqual(
                '<p>{@link MyClass#_x} and {@link MyClass#_y}</p>');

            restoreMarkdownConf(storage);
		});

		it('should not apply formatting to inline tags when the GFM parser is enabled', function() {
            var storage = setMarkdownConf({parser: 'gfm'});

            // get the gfm parser and do the test
            var parser = markdown.getParser();
            expect(parser('{@link MyClass#_x} and {@link MyClass#_y}')).toEqual(
                '<p>{@link MyClass#_x} and {@link MyClass#_y}</p>');

            restoreMarkdownConf(storage);
		});

        it('GFM parser with no conf.markdown.hardwrap has it to false', function() {
            var storage = setMarkdownConf({parser: 'gfm'});

            var parser = markdown.getParser();
            expect(parser('Testing\nhardwrap')).toEqual('<p>Testing\nhardwrap</p>');

            restoreMarkdownConf(storage);
        });

        it('GFM parser respects conf.markdown.hardwrap=false', function() {
            var storage = setMarkdownConf({parser: 'gfm', hardwrap: false});

            var parser = markdown.getParser();
            expect(parser('Testing\nhardwrap')).toEqual('<p>Testing\nhardwrap</p>');

            restoreMarkdownConf(storage);
        });

        it('GFM parser respects conf.markdown.hardwrap=true', function() {
            var storage = setMarkdownConf({parser: 'gfm', hardwrap: true});

            var parser = markdown.getParser();
            expect(parser('Testing\nhardwrap')).toEqual('<p>Testing<br />hardwrap</p>');

            restoreMarkdownConf(storage);
        });
	});
});
