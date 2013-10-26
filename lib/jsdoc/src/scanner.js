/*global env: true */
/**
    @module jsdoc/src/scanner
    @requires module:fs
    
    @author Michael Mathews <micmath@gmail.com>
    @license Apache License 2.0 - See file 'LICENSE.md' in this project.
 */


var fs = require('jsdoc/fs');
var path = require('jsdoc/path');

/**
    @constructor
    @mixes module:events
 */
exports.Scanner = function() {};
exports.Scanner.prototype = Object.create( require('events').EventEmitter.prototype );

/**
    Recursively searches the given searchPaths for js files.
    @param {Array.<string>} searchPaths
    @param {number} [depth=1]
    @fires sourceFileFound
 */
exports.Scanner.prototype.scan = function(searchPaths, depth, filter) {
    var isFile;

    var filePaths = [];
    var self = this;

    searchPaths = searchPaths || [];
    depth = depth || 1;

    searchPaths.forEach(function($) {
        var filepath = decodeURIComponent($);

        try {
            isFile = fs.statSync(filepath).isFile();
        }
        catch(e) {
            isFile = false;
        }

        if (isFile) {
            // TODO: should we replace env.dirname with the CWD before launching JSDoc?
            filePaths.push( path.resolve(env.dirname, filepath) );
        }
        else {
            filePaths = filePaths.concat( fs.ls(filepath, depth).map(function(item) {
                // TODO: should we replace env.dirname with the CWD before launching JSDoc?
                return path.resolve(env.dirname, item);
            }) );
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
