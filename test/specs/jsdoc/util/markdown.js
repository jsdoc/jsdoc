describe('jsdoc/util/markdown', () => {
    const env = require('jsdoc/env');
    const logger = require('@jsdoc/logger');
    const markdown = require('jsdoc/util/markdown');

    it('should exist', () => {
        expect(markdown).toBeDefined();
        expect(typeof markdown).toBe('object');
    });

    it('should export a "getParser" function', () => {
        expect(markdown.getParser).toBeDefined();
        expect(typeof markdown.getParser).toBe('function');
    });

    describe('getParser', () => {
        const originalMarkdownConf = env.conf.markdown;

        function setMarkdownConf(hash) {
            env.conf.markdown = hash;
        }

        afterEach(() => {
            env.conf.markdown = originalMarkdownConf;
        });

        it('should retrieve a function when called with default settings', () => {
            let parser;

            setMarkdownConf({});
            parser = markdown.getParser();
            expect(typeof parser).toBe('function');
        });

        it('should use the markdown-it parser by default', () => {
            let parser;

            setMarkdownConf({});
            parser = markdown.getParser();
            expect(parser._parser).toBe('markdownit');
        });

        it('should use the markdown-it parser when evilstreak is requested', () => {
            let parser;

            setMarkdownConf({parser: 'evilstreak'});
            parser = markdown.getParser();
            expect(parser._parser).toBe('markdownit');
        });

        it('should use the marked parser when requested', () => {
            let parser;

            setMarkdownConf({parser: 'marked'});
            parser = markdown.getParser();
            expect(parser._parser).toBe('marked');
        });

        it('should use the markdown-it parser when GFM is requested', () => {
            let parser;

            setMarkdownConf({parser: 'gfm'});
            parser = markdown.getParser();
            expect(parser._parser).toBe('markdownit');
        });

        it('should log an error if an unrecognized Markdown parser is requested', () => {
            setMarkdownConf({parser: 'not-a-real-markdown-parser'});
            spyOn(logger, 'error');
            markdown.getParser();

            expect(logger.error).toHaveBeenCalled();
        });

        it('should not apply formatting to inline tags', () => {
            const parser = markdown.getParser();

            expect(parser('{@link MyClass#_x} and {@link MyClass#_y}')).toBe(
                '<p>{@link MyClass#_x} and {@link MyClass#_y}</p>');
        });

        it('should not automatically convert HTTP/HTTPS URLs to links', () => {
            const parser = markdown.getParser();

            expect(parser('Visit {@link http://usejsdoc.com}.'))
                .toBe('<p>Visit {@link http://usejsdoc.com}.</p>');
            expect(parser('Visit {@link https://google.com}.'))
                .toBe('<p>Visit {@link https://google.com}.</p>');
        });

        it('should escape characters in code blocks as needed', () => {
            const parser = markdown.getParser();
            const markdownText = '' +
                '```html\n' +
                '<p><a href="#">Sample \'HTML.\'</a></p>\n' +
                '```';
            const convertedText = '' +
                '<pre class="prettyprint source lang-html"><code>' +
                '&lt;p>&lt;a href=&quot;#&quot;>Sample \'HTML.\'&lt;/a>&lt;/p>\n' +
                '</code></pre>';

            expect(parser(markdownText)).toBe(convertedText);
        });

        it('should hardwrap new lines when hardwrap is enabled', () => {
            let parser;

            setMarkdownConf({hardwrap: true});
            parser = markdown.getParser();

            expect(parser('line one\nline two')).toBe(
                '<p>line one<br>\nline two</p>');
        });

        it('should add heading IDs when idInHeadings is enabled', () => {
            let parser;

            setMarkdownConf({idInHeadings: true});
            parser = markdown.getParser();

            expect(parser('# Hello')).toBe('<h1 id="hello">Hello</h1>');
        });

        it('should not pretty-print code blocks that start with "```plain"', () => {
            const parser = markdown.getParser();
            const markdownText = '```plain\nconsole.log("foo");\n```';
            const convertedText = '<pre class="source"><code>console.log(&quot;foo&quot;);\n' +
                '</code></pre>';

            expect(parser(markdownText)).toBe(convertedText);
        });

        describe('syntax highlighter', () => {
            it('should support a `highlight` function defined in the config file', () => {
                let parser;

                setMarkdownConf({
                    highlight(code, language) {
                        return `<pre><code>${code} highlighted as ${language}</code></pre>`;
                    }
                });
                parser = markdown.getParser();

                expect(parser('```js\nhello\n```')).toBe(
                    '<pre><code>hello\n highlighted as js</code></pre>'
                );
            });

            it('should support `highlight` as the path to a highlighter module', () => {
                let parser;

                setMarkdownConf({ highlight: 'test/fixtures/markdown/highlighter' });
                parser = markdown.getParser();

                expect(parser('```js\nhello\n```')).toBe(
                    '<pre><code>hello\n in this language: js</code></pre>'
                );
            });

            it('should log an error if the `highlight` module cannot be found', () => {
                spyOn(logger, 'error');

                setMarkdownConf({ highlight: 'foo/bar/baz' });
                markdown.getParser();

                expect(logger.error).toHaveBeenCalled();
            });

            it('should log an error if the `highlight` module does not assign a method to ' +
                '`exports.highlight`', () => {
                spyOn(logger, 'error');

                setMarkdownConf({ highlight: 'test/fixtures/markdown/badhighlighter' });
                markdown.getParser();

                expect(logger.error).toHaveBeenCalled();
            });
        });
    });
});
