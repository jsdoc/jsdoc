/**
 * @module jsdoc/src/scanner
 */
const { EventEmitter } = require('events');
const { log } = require('@jsdoc/util');
const { lsSync } = require('@jsdoc/util').fs;
const path = require('path');
const { statSync } = require('fs');

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
    scan(searchPaths, depth, filter) {
        let currentFile;
        let filePaths = [];

        searchPaths = searchPaths || [];
        depth = depth || 1;

        searchPaths.forEach($ => {
            const filepath = path.resolve(process.cwd(), decodeURIComponent($));

            try {
                currentFile = statSync(filepath);
            }
            catch (e) {
                log.error(`Unable to find the source file or directory ${filepath}`);

                return;
            }

            if ( currentFile.isFile() ) {
                filePaths.push(filepath);
            }
            else {
                filePaths = filePaths.concat(lsSync(filepath, depth));
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
