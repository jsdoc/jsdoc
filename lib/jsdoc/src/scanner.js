/**
 * @module jsdoc/src/scanner
 * @requires module:jsdoc/fs
 */
const EventEmitter = require('events').EventEmitter;
const env = require('jsdoc/env');
const fs = require('jsdoc/fs');
const logger = require('jsdoc/util/logger');
const path = require('jsdoc/path');

/**
 * @extends module:events.EventEmitter
 */
class Scanner extends EventEmitter {
    constructor() {
        super();
    }

    /**
     * Recursively searches the given searchPaths for js files.
     * @param {Array.<string>} searchPaths
     * @param {number} [depth]
     * @fires sourceFileFound
     */
    scan(searchPaths = [], depth = 1, filter) {
        let currentFile;
        let filePaths = [];

        searchPaths.forEach($ => {
            const filepath = path.resolve( env.pwd, decodeURIComponent($) );

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

        filePaths = filePaths.filter($ => filter.isIncluded($));

        filePaths = filePaths.filter($ => {
            const e = { fileName: $ };

            this.emit('sourceFileFound', e);

            return !e.defaultPrevented;
        });

        return filePaths;
    }
}
exports.Scanner = Scanner;
