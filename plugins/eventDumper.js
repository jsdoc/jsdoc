/*global env: true */
/**
 * @overview Dump information about parser events to the console.
 * @module plugins/eventDumper
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 */

var _ = require('underscore');
var util = require('util');

var conf = env.conf.eventDumper || {};

// Dump the included parser events (defaults to all events)
var events = conf.include || [
    'parseBegin',
    'fileBegin',
    'beforeParse',
    'jsdocCommentFound',
    'symbolFound',
    'newDoclet',
    'fileComplete',
    'parseComplete',
    'processingComplete'
];
// Don't dump the excluded parser events
if (conf.exclude) {
    events = _.difference(events, conf.exclude);
}

/**
 * Get rid of native Java crud in an event object so that JSON.stringify() works.
 * @param {object} e The event object.
 * @return {object} The fixed-up object.
 */
function cleanse(e) {
    var result = {};

    Object.keys(e).forEach(function(prop) {
        // by default, don't stringify properties that contain an array of functions
        if (!conf.includeFunctions && util.isArray(e[prop]) && e[prop][0] &&
            String(typeof e[prop][0]) === 'function') {
            result[prop] = 'function[' + e[prop].length + ']';
        }
        // never include functions that belong to the object
        else if (typeof e[prop] === 'function') {
            // do nothing
        }
        // go down an extra level for these
        else if (['code', 'doclet', 'meta'].indexOf(prop) !== -1) {
            result[prop] = cleanse(e[prop]);
        }
        else {
            result[prop] = String(e[prop]);
        }
    });

    return result;
}


exports.handlers = {};

events.forEach(function(eventType) {
    exports.handlers[eventType] = function(e) {
        console.log( JSON.stringify({
            type: eventType,
            content: cleanse(e)
        }, null, 4) );
    };
});
