/*
  Copyright 2019 the JSDoc Authors.

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
import path from 'node:path';

import mockFs from 'mock-fs';

import * as fsUtil from '../../../lib/fs.js'; // eslint-disable-line sort-imports

describe('@jsdoc/util/lib/fs', () => {
  afterEach(() => mockFs.restore());

  it('has an lsSync method', () => {
    expect(fsUtil.lsSync).toBeFunction();
  });

  describe('lsSync', () => {
    beforeEach(() => {
      mockFs({
        head: {
          eyes: '',
          ears: '',
          mouth: '',
          nose: '',
          shoulders: {
            knees: {
              meniscus: '',
              toes: {
                phalanx: '',
                '.big-toe-phalanx': '',
              },
            },
          },
        },
      });
    });

    const cwd = process.cwd();

    function resolvePaths(files) {
      return files.map((f) => path.join(cwd, f)).sort();
    }

    const allFiles = resolvePaths([
      'head/eyes',
      'head/ears',
      'head/mouth',
      'head/nose',
      'head/shoulders/knees/meniscus',
      'head/shoulders/knees/toes/phalanx',
    ]);

    it('gets all non-hidden files from all levels by default', () => {
      const files = fsUtil.lsSync(cwd).sort();

      expect(files).toEqual(allFiles);
    });

    it('limits recursion depth when asked', () => {
      const files = fsUtil.lsSync(cwd, { depth: 1 }).sort();

      expect(files).toEqual(resolvePaths(['head/eyes', 'head/ears', 'head/mouth', 'head/nose']));
    });

    it('treats a depth of -1 as infinite', () => {
      const files = fsUtil.lsSync('head', { depth: -1 }).sort();

      expect(files).toEqual(allFiles);
    });
  });
});
