/*global env: true */
/**
 * @overview Translate doclet descriptions from MarkDown into HTML.
 * @module plugins/markdown
 * @author Michael Mathews <micmath@gmail.com>
 * @author Ben Blank <ben.blank@gmail.com>
 */

var conf = env.conf.markdown;
var defaultTags = [ "classdesc", "description", "params", "properties", "returns" ];
var parse = require('jsdoc/util/markdown').getParser();
var tags;

/**
 * Process the markdown source in a doclet. The properties that should be
 * processed are configurable, but always include "classdesc", "description",
 * "params", "properties", and "returns".  Handled properties can be bare
 * strings, objects, or arrays of objects.
 */
function process(doclet) {
    tags.forEach(function(tag) {
        if (!doclet.hasOwnProperty(tag)) {
            return;
        }

        if (typeof doclet[tag] === "string") {
            doclet[tag] = parse(doclet[tag]);
        } else if (doclet[tag] instanceof Array) {
            doclet[tag].forEach(process);
        } else if (doclet[tag]) {
            process(doclet[tag]);
        }
    });
}

// set up the list of "tags" (properties) to process
if (conf && conf.tags) {
    tags = conf.tags.slice();

    defaultTags.forEach(function(tag) {
        if (tags.indexOf(tag) === -1) {
            tags.push(tag);
        }
    });
} else {
    tags = defaultTags;
}

exports.handlers = {
    /**
     * Translate markdown syntax in a new doclet's description into HTML. Is run
     * by JSDoc 3 whenever a "newDoclet" event fires.
     */
    newDoclet: function(e) {
        process(e.doclet);
    }
};