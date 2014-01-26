/*global env: true */
/**
 * @overview Dump information about parser events to the console.
 * @module plugins/eventDumper
 * @author Jeff Williams <jeffrey.l.williams@gmail.com>
 */
'use strict';

var _ = require('underscore');
var util = require('util');

var conf = env.conf.eventDumper || {};
var isRhino = require('jsdoc/util/runtime').isRhino();

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
 * Check whether a variable appears to be a Java native object.
 *
 * @param {*} o - The variable to check.
 * @return {boolean} Set to `true` for Java native objects and `false` in all other cases.
 */
function isJavaNativeObject(o) {
    if (!isRhino) {
        return false;
    }

    return o && typeof o === 'object' && typeof o.getClass === 'function';
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
        else {
            result[prop] = isJavaNativeObject(e[prop]) ? String(e[prop]) : e[prop];
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
