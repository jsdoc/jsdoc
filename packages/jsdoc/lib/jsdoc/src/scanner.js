/*
  Copyright 2010 the JSDoc Authors.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
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

    searchPaths.forEach(($) => {
      const filepath = path.resolve(process.cwd(), decodeURIComponent($));

      try {
        currentFile = statSync(filepath);
      } catch (e) {
        log.error(`Unable to find the source file or directory ${filepath}`);

        return;
      }

      if (currentFile.isFile()) {
        filePaths.push(filepath);
      } else {
        filePaths = filePaths.concat(lsSync(filepath, depth));
      }
    });

    filePaths = filePaths.filter(($) => filter.isIncluded($));

    filePaths = filePaths.filter(($) => {
      const e = { fileName: $ };

      this.emit('sourceFileFound', e);

      return !e.defaultPrevented;
    });

    return filePaths;
  }
}
exports.Scanner = Scanner;
