/*
  Copyright 2022 the Baseline Authors.

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
import ConsoleReporter from 'jasmine-console-reporter';
import Jasmine from 'jasmine';
import { execa } from 'execa';
import { promises as fs } from 'fs';
import glob from 'fast-glob';
import path from 'path';
import swc from '@swc/core';
import { task } from 'hereby';

const BIN_DIR = 'node_modules/.bin';
const sourceGlob = {
  code: ['publish.js', 'lib/**/*.js', 'scripts/**/*.js'],
  css: ['styles/hljs-tomorrow.css'],
  helpers: ['test/helpers/**/*.js', 'node_modules/@jsdoc/test-matchers/index.js'],
  js: {
    copy: ['node_modules/jqtree/tree.jquery.js', 'node_modules/jquery/dist/jquery.min.js'],
    minify: ['scripts/*.js'],
  },
  lint: ['*.js', 'lib/**/*.js', 'scripts/**/*.js', 'test/**/*.js'],
  sass: ['styles/bootstrap/baseline.scss'],
  tests: ['test/specs/**/*.js'],
  views: ['views/**/*.hbs'],
};
const target = {
  css: 'static/css',
  js: 'static/scripts',
};
const swcOptions = {
  compress: true,
  format: {
    comments: 'some',
  },
  mangle: true,
};

function bin(name) {
  return path.join(BIN_DIR, name);
}

function changeExtension(file, extension) {
  return path.basename(file, path.extname(file)) + extension;
}

function copyTo(dest) {
  return async (file) => {
    const out = path.join(dest, path.basename(file));

    await fs.copyFile(file, out);
  };
}

async function removeMaps(filepath) {
  let files;

  if (!filepath) {
    throw new Error('You must specify a filepath in which to remove .map files.');
  }

  files = await glob(path.join(filepath, '**/*.map'));

  await Promise.all(files.map((file) => fs.rm(file)));
}

function writeTo(dest) {
  return async (file, data) => {
    const out = path.join(dest, path.basename(file));

    await fs.writeFile(out, data, 'utf8');
  };
}

const cssStatic = task({
  name: 'css-static',
  run: async () => {
    const files = await glob(sourceGlob.css);

    await Promise.all(files.map(copyTo(target.css)));
  },
});

const jsCopy = task({
  name: 'js-copy',
  run: async () => {
    const files = await glob(sourceGlob.js.copy);

    await Promise.all(files.map(copyTo(target.js)));
  },
});

const jsCopyAll = task({
  name: 'js-copy-all',
  run: async () => {
    const copy = await glob(sourceGlob.js.copy);
    const minify = await glob(sourceGlob.js.minify);
    const files = [...copy, ...minify];

    await Promise.all(files.map(copyTo(target.js)));
  },
});

const jsMinify = task({
  name: 'js-minify',
  run: async () => {
    const files = await glob(sourceGlob.js.minify);
    const writer = writeTo(target.js);

    await Promise.all(
      files.map(async (file) => {
        const src = await fs.readFile(file, 'utf8');
        const { code } = await swc.minify(src, swcOptions);

        await writer(file, code);
      })
    );
  },
});

const sassBuild = task({
  name: 'sass-build',
  run: async () => {
    const files = await glob(sourceGlob.sass);

    await Promise.all(
      files.map(async (file) => {
        const out = path.join(target.css, changeExtension(file, '.css'));

        await execa(bin('sass'), [file, out]);
      })
    );
  },
});

export const coverage = task({
  name: 'coverage',
  run: async () => {
    await execa(bin('c8'), [
      '--exclude=Herebyfile.mjs',
      "--exclude='test{,s}/**'",
      '--reporter=html',
      bin('hereby'),
      'test',
    ]);
  },
});

export const css = task({
  name: 'css',
  dependencies: [cssStatic, sassBuild],
  run: async () => {
    const files = await glob(path.join(target.css, '*.css'));

    await Promise.all(
      files.map(async (file) => {
        await execa(bin('csso'), ['--input', file, '--output', file]);
      })
    );
    await removeMaps(target.css);
  },
});

export const dev = task({
  name: 'dev',
  dependencies: [cssStatic, jsCopyAll, sassBuild],
});

export const format = task({
  name: 'format',
  run: async () => {
    await execa(bin('prettier'), ['--write', './']);
  },
});

export const js = task({
  name: 'js',
  dependencies: [jsCopy, jsMinify],
  run: async () => {
    await removeMaps(target.js);
  },
});

export const build = task({
  name: 'build',
  dependencies: [css, js],
});

// TODO: Also check that dependencies use acceptable licenses.
export const licenseCheck = task({
  name: 'license-check',
  run: async () => {
    await execa(bin('license-check-and-add'), ['check', '-f', '.license-check.json']);
  },
});

export const lint = task({
  name: 'lint',
  run: async () => {
    await execa(bin('eslint'), [...sourceGlob.lint]);
  },
});

export const report = task({
  name: 'coverage-report',
  run: async () => {
    await execa(bin('c8'), ['report']);
  },
});

export const test = task({
  name: 'test',
  run: async () => {
    const jasmine = new Jasmine();
    const reporter = new ConsoleReporter({
      beep: false,
      verbosity: {
        disabled: false,
        pending: false,
        specs: false,
        summary: true,
      },
    });

    jasmine.clearReporters();
    jasmine.addReporter(reporter);
    jasmine.exitOnCompletion = false;
    jasmine.loadConfig({
      helpers: sourceGlob.helpers,
      random: false,
      spec_files: sourceGlob.tests, // eslint-disable-line camelcase
    });

    await jasmine.execute();
  },
});

const lintAndTest = task({
  name: 'lint-and-test',
  dependencies: [lint, test],
});

export default lintAndTest;
