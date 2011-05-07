/**
    @overview Converts the text of a doclet's description, from MarkDown to HTML.
 */

var plugin = require('jsdoc/plugin'),
    markdown = require('markdown/lib/markdown'); // TODO: allow rhino to use commonjs module id here

plugin.manager.on('doclet', function(doclet) {
    if (typeof doclet.description === 'string') {
        doclet.description = markdown.toHTML(doclet.description);
    }
});