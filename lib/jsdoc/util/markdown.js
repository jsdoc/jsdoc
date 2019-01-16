/**
 * Provides access to Markdown-related functions.
 * @module jsdoc/util/markdown
 */
const env = require('jsdoc/env');
const logger = require('jsdoc/util/logger');
const MarkdownIt = require('markdown-it');
const marked = require('marked');
const mda = require('markdown-it-anchor');
const path = require('jsdoc/path');
const util = require('util');

/**
 * Enumeration of Markdown parsers that are available.
 * @enum {String}
 */
const parserNames = {
    /**
     * The [`markdown-js`](https://github.com/evilstreak/markdown-js) (aka "evilstreak") parser.
     *
     * @deprecated Replaced by `markdown-it`.
     */
    evilstreak: 'markdownit',
    /**
     * The "GitHub-flavored Markdown" parser.
     *
     * @deprecated Replaced by `markdown-it`.
     */
    gfm: 'markdownit',
    /**
     * The `markdown-it` parser.
     */
    markdownit: 'markdownit',
    /**
     * The [Marked](https://github.com/chjj/marked) parser.
     *
     * @deprecated Will be replaced by `markdown-it` in JSDoc 3.7.0.
     */
    marked: 'marked'
};

/**
 * Escape underscores that occur within an inline tag in order to protect them from the `marked`
 * parser.
 *
 * @param {string} source - The source text to sanitize.
 * @return {string} The source text, where underscores within inline tags have been protected with a
 * preceding backslash (e.g., `\_`). The `marked` parser will strip the backslash and protect the
 * underscore.
 */
function escapeUnderscores(source) {
    return source.replace(/\{@[^}\r\n]+\}/g, wholeMatch => wholeMatch.replace(/(^|[^\\])_/g, '$1\\_'));
}

/**
 * Escape HTTP/HTTPS URLs so that they are not automatically converted to HTML links.
 *
 * @param {string} source - The source text to escape.
 * @return {string} The source text with escape characters added to HTTP/HTTPS URLs.
 */
function escapeUrls(source) {
    return source.replace(/(https?):\/\//g, '$1:\\/\\/');
}

/**
 * Unescape HTTP/HTTPS URLs after Markdown parsing is complete.
 *
 * @param {string} source - The source text to unescape.
 * @return {string} The source text with escape characters removed from HTTP/HTTPS URLs.
 */
function unescapeUrls(source) {
    return source.replace(/(https?):\\\/\\\//g, '$1://');
}

/**
 * Escape backslashes within inline tags so that they are not stripped.
 *
 * @param {string} source - The source text to escape.
 * @return {string} The source text with backslashes escaped within inline tags.
 */
function escapeInlineTagBackslashes(source) {
    return source.replace(/\{@[^}\r\n]+\}/g, wholeMatch => wholeMatch.replace(/\\/g, '\\\\'));
}

/**
 * Escape characters in text within a code block.
 *
 * @param {string} source - The source text to escape.
 * @return {string} The escaped source text.
 */
function escapeCode(source) {
    return source.replace(/</g, '&lt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Wrap a code snippet in HTML tags that enable syntax highlighting.
 *
 * @param {string} code - The code snippet.
 * @param {string?} language - The language of the code snippet.
 * @return {string} The wrapped code snippet.
 */
function highlight(code, language) {
    let classString;
    let langClass = '';

    if (language && (language !== 'plain')) {
        langClass = ` lang-${language}`;
    }

    if (language !== 'plain') {
        classString = util.format(' class="prettyprint source%s"', langClass);
    }
    else {
        classString = ' class="source"';
    }

    return util.format('<pre%s><code>%s</code></pre>', classString, escapeCode(code));
}

/**
 * Unencode quotes that occur within {@ ... } after the Markdown parser has turned them into HTML
 * entities.
 *
 * @param {string} source - The source text to unencode.
 * @return {string} The source text with HTML entity `&quot;` converted back to standard quotes.
 */
function unencodeQuotes(source) {
    return source.replace(/\{@[^}\r\n]+\}/g, wholeMatch => wholeMatch.replace(/&quot;/g, '"'));
}

/**
 * Get the appropriate function for applying syntax highlighting to text, based on the user's
 * Markdown configuration settings.
 *
 * @param {Object} conf - The user's Markdown configuration settings.
 * @return {function} The highlighter function.
 */
function getHighlighter(conf) {
    let highlighter;
    let highlighterPath;

    switch (typeof conf.highlight) {
        case 'string':
            highlighterPath = path.getResourcePath(conf.highlight);

            if (highlighterPath) {
                highlighter = require(highlighterPath).highlight;

                if (typeof highlighter !== 'function') {
                    logger.error('The syntax highlighting module "%s" does not assign a method ' +
                        'to exports.highlight. Using the default syntax highlighter.',
                    conf.highlight);
                    highlighter = highlight;
                }
            }
            else {
                logger.error('Unable to find the syntax highlighting module "%s". Using the ' +
                    'default syntax highlighter.', conf.highlight);
                highlighter = highlight;
            }

            break;

        case 'function':
            highlighter = conf.highlight;

            break;

        default:
            highlighter = highlight;
    }

    return highlighter;
}

/**
 * Retrieve a function that accepts a single parameter containing Markdown source. The function uses
 * the specified parser to transform the Markdown source to HTML, then returns the HTML as a string.
 *
 * @private
 * @param {String} parserName The name of the selected parser.
 * @param {Object} [conf] Configuration for the selected parser, if any.
 * @returns {Function} A function that accepts Markdown source, feeds it to the selected parser, and
 * returns the resulting HTML.
 */
function getParseFunction(parserName, conf) {
    let highlighter;
    let parserFunction;
    let renderer;

    conf = conf || {};
    highlighter = getHighlighter(conf);

    switch (parserName) {
        case parserNames.marked:
            if (conf.hardwrap) {
                marked.setOptions({breaks: true});
            }

            // Marked generates an "id" attribute for headers; this custom renderer suppresses it
            renderer = new marked.Renderer();

            if (!conf.idInHeadings) {
                renderer.heading = (text, level) => util.format('<h%s>%s</h%s>', level, text, level);
            }

            renderer.code = highlighter;

            parserFunction = source => {
                let result;

                source = escapeUnderscores(source);
                source = escapeUrls(source);

                result = marked(source, { renderer: renderer })
                    .replace(/\s+$/, '')
                    .replace(/&#39;/g, "'");

                result = unescapeUrls(result);
                result = unencodeQuotes(result);

                return result;
            };
            parserFunction._parser = parserNames.marked;

            return parserFunction;

        case parserNames.markdownit:
            renderer = new MarkdownIt({
                breaks: Boolean(conf.hardwrap),
                highlight: highlighter,
                html: true
            });

            if (conf.idInHeadings) {
                renderer.use(mda);
            }

            parserFunction = source => {
                let result;

                source = escapeUrls(source);
                source = escapeInlineTagBackslashes(source);

                result = renderer.render(source)
                    .replace(/\s+$/, '')
                    .replace(/&#39;/g, "'");

                result = unescapeUrls(result);
                result = unencodeQuotes(result);

                return result;
            };
            parserFunction._parser = parserNames.markdownit;

            return parserFunction;

        default:
            logger.error('Unrecognized Markdown parser "%s". Markdown support is disabled.',
                parserName);

            return undefined;
    }
}

/**
 * Retrieve a Markdown parsing function based on the value of the `conf.json` file's
 * `env.conf.markdown` property. The parsing function accepts a single parameter containing Markdown
 * source. The function uses the parser specified in `conf.json` to transform the Markdown source to
 * HTML, then returns the HTML as a string.
 *
 * @returns {function} A function that accepts Markdown source, feeds it to the selected parser, and
 * returns the resulting HTML.
 */
exports.getParser = () => {
    const conf = env.conf.markdown;
    const parser = (conf && conf.parser) ? parserNames[conf.parser] : parserNames.markdownit;

    return getParseFunction(parser, conf);
};
