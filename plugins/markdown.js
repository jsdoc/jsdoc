/**
    @overview Translate doclet descriptions from MarkDown into HTML.
    @module plugins/markdown
    @author Michael Mathews <micmath@gmail.com>
    @author Ben Blank <ben.blank@gmail.com>
 */

var conf = env.conf.markdown;
var parse;

/**
    Pull in the selected parser and wrap it in a common interface.

    @param {String} parser The name of the selected parser.
    @param {Object} [conf] Configuration for the selected parser, if any.

    @returns {Function} A function which accepts markdown source, feeds it to
                        the selected parser, and returns the resulting HTML.

    @throws {Exception} If the name does not correspond to a known parser.
 */
function getParser(parser, conf) {
    conf = conf || {};

    if (parser === "gfm") {
        parser = new (require("gfm/showdown").Converter)();
        parser.githubRepoOwner = conf.githubRepoOwner;
        parser.githubRepoName = conf.githubRepoName;

        return function(source) {
            return parser.makeHtml(source);
        };
    } else if (parser === "evilstreak") {
        parser = require("evilstreak/markdown");

        return function(source) {
            return parser.toHTML(source);
        }
    } else {
        throw "unknown Markdown parser: '" + parser + "'";
    }
}

// determine which parser should be used based on configuration options, if any
if (conf && conf.parser) {
    parse = getParser(conf.parser, conf);
} else if (conf && conf.githubRepoOwner && conf.githubRepoName) {
    // use GitHub-friendly parser if GitHub-specific options are present
    parse = getParser("gfm", conf);
} else {
    // evilstreak is the default parser
    parse = getParser("evilstreak");
}

exports.handlers = {
    /**
        Translate markdown syntax in a new doclet's description into HTML. Is run
        by JSDoc 3 whenever a "newDoclet" event fires.
     */
    newDoclet: function(e) {
        if (e.doclet.description) {
            e.doclet.description = parse(e.doclet.description)
                .replace( /&amp;/g, "&" ) // because markdown escapes these
                .replace( /&lt;/g, "<" )
                .replace( /&gt;/g, ">" );
        }
    }
};