/*global describe: true, env: true, expect: true, it: true, xit: true */
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
            var storage = setMarkdownConf({});

            var parser = markdown.getParser();
            expect(typeof parser).toEqual('function');

            setMarkdownConf({parser: 'marked'});
            parser = markdown.getParser();
            expect(typeof parser).toEqual('function');

            restoreMarkdownConf(storage);
        });

        it('should use the marked parser when evilstreak is requested', function() {
            var storage = setMarkdownConf({parser: 'evilstreak'});
            var parser = markdown.getParser();
            expect(parser._parser).toEqual('marked');
            restoreMarkdownConf(storage);
        });

        it('should use the marked parser when requested', function() {
            var storage = setMarkdownConf({parser: 'marked'});
            var parser = markdown.getParser();
            expect(parser._parser).toEqual('marked');
            restoreMarkdownConf(storage);
        });

        it('should use the marked parser when GFM is requested', function() {
            var storage = setMarkdownConf({parser: 'gfm'});
            var parser = markdown.getParser();
            expect(parser._parser).toEqual('marked');
            restoreMarkdownConf(storage);
        });

        it('should not apply formatting to inline tags when the marked parser is enabled', function() {
            var storage = setMarkdownConf({parser: 'marked'});
            var parser = markdown.getParser();
            
            // get the marked parser and do the test
            expect(parser('{@link MyClass#_x} and {@link MyClass#_y}')).toEqual(
                '<p>{@link MyClass#_x} and {@link MyClass#_y}</p>');
            restoreMarkdownConf(storage);
        });
    });
});
