/**
    @overview Translate doclet descriptions from MarkDown into HTML.
 */

(function() {

    var markdown = require('evilstreak/markdown');
    
    app.jsdoc.parser.on('newDoclet', function(e) {
        if (e.doclet.description) {
            e.doclet.description = markdown.toHTML(e.doclet.description)
                .replace( /&amp;/g, "&" ) // because markdown escapes these
                .replace( /&lt;/g, "<" )
                .replace( /&gt;/g, ">" );
        }
    });
    
})();