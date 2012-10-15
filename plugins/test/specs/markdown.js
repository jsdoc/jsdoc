/**
    @overview Translate doclet descriptions from MarkDown into HTML.
    @module plugins/markdown
    @author Michael Mathews <micmath@gmail.com>
 */

var mdParser = require('evilstreak/markdown');

exports.handlers = {
    /**
        Translate markdown syntax in a new doclet's description into HTML. Is run
        by JSDoc 3 whenever a "newDoclet" event fires.
     */
    newDoclet: function(e) {
        if (e.doclet.description) {
            // filters EOL of source so evilstreak/markdown doesn't screw the pooch.
            e.doclet.description = e.doclet.description.replace(/(\r\n|\n|\r)/g, '\n');
            e.doclet.description = mdParser.toHTML(e.doclet.description)
                .replace( /&amp;/g, "&" ) // because markdown escapes these
                .replace( /&lt;/g, "<" )
                .replace( /&gt;/g, ">" );
        }
    }
};