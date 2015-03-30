'use strict';

describe('jsdoc/util/markdown', function() {
    var env = require('jsdoc/env');
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
        var originalMarkdownConf = env.conf.markdown;

        function setMarkdownConf(hash) {
            env.conf.markdown = hash;
        }

        afterEach(function() {
            env.conf.markdown = originalMarkdownConf;
        });

        it('should retrieve a function when called with default settings', function() {
            var storage = setMarkdownConf({});

            var parser = markdown.getParser();
            expect(typeof parser).toEqual('function');

            setMarkdownConf({parser: 'marked'});
            parser = markdown.getParser();
            expect(typeof parser).toEqual('function');
        });

        it('should use the marked parser when evilstreak is requested', function() {
            var storage = setMarkdownConf({parser: 'evilstreak'});
            var parser = markdown.getParser();
            expect(parser._parser).toEqual('marked');
        });

        it('should use the marked parser when requested', function() {
            var storage = setMarkdownConf({parser: 'marked'});
            var parser = markdown.getParser();
            expect(parser._parser).toEqual('marked');
        });

        it('should use the marked parser when GFM is requested', function() {
            var storage = setMarkdownConf({parser: 'gfm'});
            var parser = markdown.getParser();
            expect(parser._parser).toEqual('marked');
        });

        it('should log an error if an unrecognized Markdown parser is requested', function() {
            var logger = require('jsdoc/util/logger');
            var parser;
            var storage = setMarkdownConf({parser: 'not-a-real-markdown-parser'});

            spyOn(logger, 'error');

            parser = markdown.getParser();

            expect(logger.error).toHaveBeenCalled();
        });

        it('should not apply formatting to inline tags when the marked parser is enabled', function() {
            var storage = setMarkdownConf({parser: 'marked'});
            var parser = markdown.getParser();

            // get the marked parser and do the test
            expect(parser('{@link MyClass#_x} and {@link MyClass#_y}')).toEqual(
                '<p>{@link MyClass#_x} and {@link MyClass#_y}</p>');
        });

        it('should not automatically convert HTTP/HTTPS URLs to links', function() {
            var parser = markdown.getParser();

            expect(parser('Visit {@link http://usejsdoc.com}.'))
                .toBe('<p>Visit {@link http://usejsdoc.com}.</p>');
            expect(parser('Visit {@link https://google.com}.'))
                .toBe('<p>Visit {@link https://google.com}.</p>');
        });

        it('should escape characters in code blocks as needed', function() {
            var parser = markdown.getParser();
            var markdownText = '' +
                '```html\n' +
                '<p><a href="#">Sample \'HTML.\'</a></p>\n' +
                '```';
            var convertedText = '' +
                '<pre class="prettyprint source lang-html"><code>' +
                '&lt;p>&lt;a href=&quot;#&quot;>Sample \'HTML.\'&lt;/a>&lt;/p>' +
                '</code></pre>';

            expect(parser(markdownText)).toBe(convertedText);
        });

        it('should hardwrap new lines when hardwrap is enabled', function() {
            var storage = setMarkdownConf({hardwrap: true});
            var parser = markdown.getParser();

            expect(parser('line one\nline two')).toEqual(
                '<p>line one<br>line two</p>');
        });
    });
});
