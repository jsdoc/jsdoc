'use strict';

describe('jsdoc/util/markdown', function() {
    var env = require('jsdoc/env');
    var logger = require('jsdoc/util/logger');
    var markdown = require('jsdoc/util/markdown');

    it('should exist', function() {
        expect(markdown).toBeDefined();
        expect(typeof markdown).toBe('object');
    });

    it('should export a "getParser" function', function() {
        expect(markdown.getParser).toBeDefined();
        expect(typeof markdown.getParser).toBe('function');
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
            var parser;

            setMarkdownConf({});
            parser = markdown.getParser();
            expect(typeof parser).toBe('function');
        });

        it('should use the markdown-it parser by default', function() {
            var parser;

            setMarkdownConf({});
            parser = markdown.getParser();
            expect(parser._parser).toBe('markdownit');
        });

        it('should use the markdown-it parser when evilstreak is requested', function() {
            var parser;

            setMarkdownConf({parser: 'evilstreak'});
            parser = markdown.getParser();
            expect(parser._parser).toBe('markdownit');
        });

        it('should use the marked parser when requested', function() {
            var parser;

            setMarkdownConf({parser: 'marked'});
            parser = markdown.getParser();
            expect(parser._parser).toBe('marked');
        });

        it('should use the markdown-it parser when GFM is requested', function() {
            var parser;

            setMarkdownConf({parser: 'gfm'});
            parser = markdown.getParser();
            expect(parser._parser).toBe('markdownit');
        });

        it('should log an error if an unrecognized Markdown parser is requested', function() {
            setMarkdownConf({parser: 'not-a-real-markdown-parser'});
            spyOn(logger, 'error');
            markdown.getParser();

            expect(logger.error).toHaveBeenCalled();
        });

        it('should not apply formatting to inline tags', function() {
            var parser = markdown.getParser();

            expect(parser('{@link MyClass#_x} and {@link MyClass#_y}')).toBe(
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
                '&lt;p>&lt;a href=&quot;#&quot;>Sample \'HTML.\'&lt;/a>&lt;/p>\n' +
                '</code></pre>';

            expect(parser(markdownText)).toBe(convertedText);
        });

        it('should hardwrap new lines when hardwrap is enabled', function() {
            var parser;

            setMarkdownConf({hardwrap: true});
            parser = markdown.getParser();

            expect(parser('line one\nline two')).toBe(
                '<p>line one<br>\nline two</p>');
        });

        it('should add heading IDs when idInHeadings is enabled', function() {
            var parser;

            setMarkdownConf({idInHeadings: true});
            parser = markdown.getParser();

            expect(parser('# Hello')).toBe('<h1 id="hello">Hello</h1>');
        });

        it('should not pretty-print code blocks that start with "```plain"', function() {
            var parser = markdown.getParser();
            var markdownText = '```plain\nconsole.log("foo");\n```';
            var convertedText = '<pre class="source"><code>console.log(&quot;foo&quot;);\n' +
                '</code></pre>';

            expect(parser(markdownText)).toBe(convertedText);
        });

        describe('syntax highlighter', function() {
            it('should support a `highlight` function defined in the config file', function() {
                var parser;

                setMarkdownConf({
                    highlight: function(code, language) {
                        return '<pre><code>' + code + ' highlighted as ' + language +
                            '</code></pre>';
                    }
                });
                parser = markdown.getParser();

                expect(parser('```js\nhello\n```')).toBe(
                    '<pre><code>hello\n highlighted as js</code></pre>'
                );
            });

            it('should support `highlight` as the path to a highlighter module', function() {
                var parser;

                setMarkdownConf({ highlight: 'test/fixtures/markdown/highlighter' });
                parser = markdown.getParser();

                expect(parser('```js\nhello\n```')).toBe(
                    '<pre><code>hello\n in this language: js</code></pre>'
                );
            });

            it('should log an error if the `highlight` module cannot be found', function() {
                spyOn(logger, 'error');

                setMarkdownConf({ highlight: 'foo/bar/baz' });
                markdown.getParser();

                expect(logger.error).toHaveBeenCalled();
            });

            it('should log an error if the `highlight` module does not assign a method to ' +
                '`exports.highlight`', function() {
                spyOn(logger, 'error');

                setMarkdownConf({ highlight: 'test/fixtures/markdown/badhighlighter' });
                markdown.getParser();

                expect(logger.error).toHaveBeenCalled();
            });
        });
    });
});
