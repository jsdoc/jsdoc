/**
 * @module jsdoc/src/scanner
 * @requires module:jsdoc/fs
 */
'use strict';

var env = require('jsdoc/env');
var fs = require('jsdoc/fs');
var logger = require('jsdoc/util/logger');
var path = require('jsdoc/path');

/* eslint-disable no-empty-function */
/**
 * @constructor
 * @mixes module:events
 */
exports.Scanner = function() {};
/* eslint-enable no-empty-function */
exports.Scanner.prototype = Object.create( require('events').EventEmitter.prototype );

/**
 * Recursively searches the given searchPaths for js files.
 * @param {Array.<string>} searchPaths
 * @param {number} [depth=1]
 * @fires sourceFileFound
 */
exports.Scanner.prototype.scan = function(searchPaths, depth, filter) {
    var currentFile;
    var filePaths = [];
    var self = this;

    searchPaths = searchPaths || [];
    depth = depth || 1;

    searchPaths.forEach(function($) {
        var filepath = path.resolve( env.pwd, decodeURIComponent($) );

        try {
            currentFile = fs.statSync(filepath);
        }
        catch (e) {
            logger.error('Unable to find the source file or directory %s', filepath);

            return;
        }

        if ( currentFile.isFile() ) {
            filePaths.push(filepath);
        }
        else {
            filePaths = filePaths.concat( fs.ls(filepath, depth) );
        }
    });

    filePaths = filePaths.filter(function($) {
        return filter.isIncluded($);
    });

    filePaths = filePaths.filter(function($) {
        var e = { fileName: $ };

        self.emit('sourceFileFound', e);

        return !e.defaultPrevented;
    });

    return filePaths;
};
