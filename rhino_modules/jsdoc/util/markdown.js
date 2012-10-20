/*global env: true */

/**
 * Provides access to Markdown-related functions.
 * @module jsdoc/util/markdown
 * @author Michael Mathews <micmath@gmail.com>
 * @author Ben Blank <ben.blank@gmail.com>
 */

var conf = env.conf.markdown;

/**
 * Enumeration of Markdown parsers that are available.
 * @enum {String}
 */
var parsers = {
    /** The "[markdown-js](https://github.com/evilstreak/markdown-js)" (aka "evilstreak") parser. */
    evilstreak: "markdown",
    /**
     * The "[GitHub-flavored Markdown](https://github.com/hegemonic/github-flavored-markdown)"
     * parser.
     */
    gfm: "github-flavored-markdown"
};

/**
 * Retrieve a function that accepts a single parameter containing Markdown source. The function uses
 * the specified parser to transform the Markdown source to HTML, then returns the HTML as a string.
 *
 * @private
 * @param {String} parser The name of the selected parser.
 * @param {Object} [conf] Configuration for the selected parser, if any.
 * @returns {Function} A function that accepts Markdown source, feeds it to the selected parser, and
 * returns the resulting HTML.
 * @throws {Error} If the name does not correspond to a known parser.
 */
function getParseFunction(parser, conf) {
    conf = conf || {};

    if (parser === parsers.gfm) {
        parser = require(parser);

        var githubConf = {
            repoName: conf.githubRepoName
        };
        if (conf.githubRepoOwner && conf.githubRepoName) {
            githubConf.nameWithOwner = conf.githubRepoOwner + "/" + conf.githubRepoName;
        }

        parser.hardwrap = !!conf.hardwrap;

        return function(source) {
            return parser.parse(source, githubConf);
        };
    } else if (parser === parsers.evilstreak) {
        parser = require(parser).markdown;

        return function(source) {
            // evilstreak parser expects line endings to be \n
            source = source.replace(/\r\n|\r/g, '\n');
            return parser.toHTML(source, conf.dialect);
        };
    } else {
        throw new Error("unknown Markdown parser: '" + parser + "'");
    }
}

/**
 * Retrieve a Markdown parsing function based on the value of the `conf.json` file's
 * `env.conf.markdown` property. The parsing function accepts a single parameter containing Markdown
 * source. The function uses the parser specified in `conf.json` to transform the Markdown source to
 * HTML, then returns the HTML as a string.
 * @returns {Function} A function that accepts Markdown source, feeds it to the selected parser, and
 * returns the resulting HTML.
 * @throws {Error} If the value of `env.conf.markdown.parser` does not correspond to a known parser.
 */
exports.getParser = function() {
    if (conf && conf.parser) {
        return getParseFunction(parsers[conf.parser], conf);
    } else if (conf && conf.githubRepoOwner && conf.githubRepoName) {
        // use GitHub-friendly parser if GitHub-specific options are present
        return getParseFunction(parsers.gfm, conf);
    } else {
        // evilstreak is the default parser
        return getParseFunction(parsers.evilstreak, conf);
    }
};
