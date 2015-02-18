/**
 * @overview Translate doclet descriptions from MarkDown into HTML.
 * @module plugins/markdown
 * @author Michael Mathews <micmath@gmail.com>
 * @author Ben Blank <ben.blank@gmail.com>
 */
'use strict';

var env = require('jsdoc/env');

var config = env.conf.markdown || {};
var defaultTags = [
    'author',
    'classdesc',
    'description',
    'exceptions',
    'params',
    'properties',
    'returns',
    'see'
];
var hasOwnProp = Object.prototype.hasOwnProperty;
var parse = require('jsdoc/util/markdown').getParser();
var tags = [];
var excludeTags = [];

function shouldProcessString(tagName, text) {
    var shouldProcess = true;

    // we only want to process `@author` and `@see` tags that contain Markdown links
    if ( (tagName === 'author' || tagName === 'see') && text.indexOf('[') === -1 ) {
        shouldProcess = false;
    }

    return shouldProcess;
}

/**
 * Process the markdown source in a doclet. The properties that should be
 * processed are configurable, but always include "classdesc", "description",
 * "params", "properties", and "returns".  Handled properties can be bare
 * strings, objects, or arrays of objects.
 */
function process(doclet) {
    tags.forEach(function(tag) {
        if ( !hasOwnProp.call(doclet, tag) ) {
            return;
        }

        if (typeof doclet[tag] === 'string' && shouldProcessString(tag, doclet[tag]) ) {
            doclet[tag] = parse(doclet[tag]);
        }
        else if ( Array.isArray(doclet[tag]) ) {
            doclet[tag].forEach(function(value, index, original) {
                var inner = {};
                inner[tag] = value;
                process(inner);
                original[index] = inner[tag];
            });
        }
        else if (doclet[tag]) {
            process(doclet[tag]);
        }
    });
}

// set up the list of "tags" (properties) to process
if (config.tags) {
    tags = config.tags.slice();
}
// set up the list of default tags to exclude from processing
if (config.excludeTags) {
    excludeTags = config.excludeTags.slice();
}
defaultTags.forEach(function(tag) {
    if (excludeTags.indexOf(tag) === -1 && tags.indexOf(tag) === -1) {
        tags.push(tag);
    }
});

exports.handlers = {
    /**
     * Translate markdown syntax in a new doclet's description into HTML. Is run
     * by JSDoc 3 whenever a "newDoclet" event fires.
     */
    newDoclet: function(e) {
        process(e.doclet);
    }
};
