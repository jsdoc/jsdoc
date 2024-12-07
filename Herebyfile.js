/*
  Copyright 2023 the JSDoc Authors.

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

import { execa } from 'execa';
import { task } from 'hereby';
import { LicenseChecker } from 'js-green-licenses';

import runTests from './packages/jsdoc/test/index.js';

const BIN_DIR = 'node_modules/.bin';

const sourceGlob = ['*.cjs', '*.js', 'packages/**/*/*.cjs', 'packages/**/*.js'];

function bin(name) {
  return path.join(BIN_DIR, name);
}

export const coverage = task({
  name: 'coverage',
  run: async () => {
    await execa(bin('c8'), [
      '--exclude=Herebyfile.js',
      "--exclude='**/test{,s}/**'",
      '--reporter=html',
      bin('hereby'),
      'test',
    ]);
  },
});

export const dependencyLicenses = task({
  name: 'dependency-licenses',
  run: () => {
    const checker = new LicenseChecker({ verbose: false });
    const log = console.log;

    return new Promise((resolve, reject) => {
      // Temporarily silence console.log() to prevent unnecessary output.
      console.log = () => {}; // eslint-disable-line no-empty-function

      checker.on('end', () => {
        console.log = log;
        resolve();
      });
      checker.on('error', (e) => {
        const message =
          `Error while processing ${e.packageName}@${e.versionSpec}: ${e.err}. ` +
          `Parent packages: ${JSON.stringify(e.parentPackages, null, 0)}`;

        console.log = log;
        reject(new Error(message));
      });
      checker.on('non-green-license', (e) => {
        const message =
          `${e.packageName}@${e.version} has an invalid license: ${e.licenseName}. ` +
          `Parent packages: ${JSON.stringify(e.parentPackages, null, 0)}`;

        console.log = log;
        reject(new Error(message));
      });

      checker.checkLocalDirectory('.');
    });
  },
});

export const format = task({
  name: 'format',
  run: async () => {
    await execa(bin('prettier'), ['--write', './']);
  },
});

export const licenseHeaders = task({
  name: 'license-headers',
  run: async () => {
    await execa(bin('license-check-and-add'), ['check', '-f', '.license-check.json']);
  },
});

export const licenseCheck = task({
  name: 'license-check',
  dependencies: [dependencyLicenses, licenseHeaders],
});

export const lint = task({
  name: 'lint',
  run: async () => {
    await execa(bin('eslint'), [...sourceGlob], { stdout: 'inherit', stderr: 'inherit' });
  },
});

export const test = task({
  name: 'test',
  run: async () => {
    await runTests();
  },
});

const lintAndTest = task({
  name: 'lint-and-test',
  dependencies: [lint, test],
});

export default lintAndTest;
