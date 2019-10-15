/**
 * @module jsdoc/src/scanner
 * @requires module:jsdoc/fs
 */
const { EventEmitter } = require('events');
const env = require('jsdoc/env');
const fs = require('jsdoc/fs');
const logger = require('jsdoc/util/logger');
const path = require('jsdoc/path');

/**
 * @augments module:events.EventEmitter
 */
class Scanner extends EventEmitter {
    constructor() {
        super();
    }

    /**
     * Recursively search `searchPaths` for files.
     *
     * @todo Default parameters should be last. (Fix `filter`.)
     *
     * @param {Array.<string>} [searchPaths=[]] - The paths to search.
     * @param {number} [depth=1] - Depth to search.
     * @param {module:jsdoc/src/filter.Filter} filter - The filter which determines which file(s) to return.
     *
     * @fires sourceFileFound
     *
     * @returns {Array.<string>} Filepaths found during the search.
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
