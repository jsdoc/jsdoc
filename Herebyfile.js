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

import { promises as fs } from 'node:fs';
import { basename, join } from 'node:path';

import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import escapeStringRegexp from 'escape-string-regexp';
import { execa } from 'execa';
import { task } from 'hereby';
import { glob } from 'tinyglobby';

import runTests from './packages/jsdoc/test/index.js';

const BIN_DIR = 'node_modules/.bin';
const EXECA_OUT = {
  stdout: 'inherit',
  stderr: 'inherit',
};
const WEB_ASSETS = 'packages/jsdoc-web-assets';

const sourceGlob = {
  css: [],
  js: {
    minify: [join(WEB_ASSETS, 'scripts/index.js')],
  },
  lint: ['*.cjs', '*.js', 'packages/**/*/*.cjs', 'packages/**/*.js'],
  sass: [join(WEB_ASSETS, 'styles/baseline.scss')],
};

const target = {
  // TODO: Add JS path so we can delete .js.map files.
  css: join(WEB_ASSETS, 'static'),
};

function bin(name) {
  return join(BIN_DIR, name);
}

function esbuildTextReplace(options) {
  options ??= { filter: /.*/, contentFilter: /.*/, replacers: [] };

  function applyReplacers(source, replacers) {
    let contents = source.slice();

    replacers?.forEach(({ regexp, replacement }) => {
      contents = contents.replaceAll(regexp, replacement);
    });

    return contents;
  }

  return {
    name: 'textReplace',
    setup(build) {
      build.onLoad({ filter: options.filter, namespace: options.namespace }, async ({ path }) => {
        let contents;
        let source;

        source = await fs.readFile(path, 'utf8');
        if (!options.contentFilter || options.contentFilter.test(source)) {
          contents = applyReplacers(source, options?.replacers);
        } else {
          contents = source;
        }

        return { contents };
      });
    },
  };
}

const esbuildDevOptions = {
  css: {
    metafile: true,
    minify: false,
  },
  js: {
    metafile: true,
    minify: false,
    // TODO: figure out why this isn't working as expected in Chrome
    // sourcemap: true,
  },
};

const esbuildOptions = {
  css: {
    bundle: true,
    minify: true,
    outfile: join(WEB_ASSETS, 'static/css/baseline.css'),
    plugins: [
      sassPlugin({
        embedded: true,
      }),
    ],
  },
  js: {
    bundle: true,
    minify: true,
    outfile: join(WEB_ASSETS, 'static/scripts/jsdoc.js'),
    plugins: [
      esbuildTextReplace({
        filter: /\/webawesome\/dist\/chunks\/.+\.js$/,
        contentFilter: new RegExp(escapeStringRegexp('src/components/icon/library.system.ts')),
        replacers: [
          {
            // Remove unused data from JS bundle.
            //
            // We want to match everything up to the next `var`. RE2 doesn't support negative
            // lookahead, so we fake it.
            regexp: /.*?\s*(var \S+)(?:[^v]|v[^a]|va[^r]|var[^\s])*/gs,
            replacement: `export $1 = {};`,
          },
        ],
      }),
    ],
    target: ['es2020'],
  },
};

function copyTo(dest) {
  return async (file) => {
    const out = join(dest, basename(file));

    await fs.copyFile(file, out);
  };
}

async function removeMaps(filepath) {
  let files;

  if (!filepath) {
    throw new Error('You must specify a filepath in which to remove .map files.');
  }

  files = await glob(join(filepath, '**/*.map'));

  await Promise.all(files.map((file) => fs.rm(file)));
}

const cssStatic = task({
  name: 'css-static',
  run: async () => {
    const files = await glob(sourceGlob.css);

    await Promise.all(files.map(copyTo(target.css)));
  },
});

// TODO: Rename some of these so we don't have, e.g., both `js-build` and `build-js`.
const jsBuild = task({
  name: 'js-build',
  run: async () => {
    const files = await glob(sourceGlob.js.minify);

    const result = await esbuild.build({
      ...esbuildDevOptions.js,
      ...esbuildOptions.js,
      entryPoints: files,
    });

    await fs.writeFile('meta.json', JSON.stringify(result.metafile));
  },
});

const jsMinify = task({
  name: 'js-minify',
  run: async () => {
    const files = await glob(sourceGlob.js.minify);

    return esbuild.build({
      ...esbuildOptions.js,
      entryPoints: files,
      metafile: true,
    });
  },
});

const sassBuild = task({
  name: 'sass-build',
  run: async () => {
    const files = await glob(sourceGlob.css.concat(sourceGlob.sass));

    return esbuild.build({
      ...esbuildDevOptions.css,
      ...esbuildOptions.css,
      entryPoints: files,
    });
  },
});

export const css = task({
  name: 'build-css',
  run: async () => {
    const files = await glob(sourceGlob.css.concat(sourceGlob.sass));

    await removeMaps(target.css);

    return esbuild.build({
      ...esbuildOptions.css,
      entryPoints: files,
    });
  },
});

export const dev = task({
  name: 'build-dev',
  dependencies: [cssStatic, jsBuild, sassBuild],
});

export const js = task({
  name: 'build-js',
  dependencies: [jsMinify],
});

export const build = task({
  name: 'build',
  dependencies: [css, js],
});

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

export const dependencyEngines = task({
  name: 'dependency-engines',
  run: async () => {
    await execa(bin('installed-check'), ['--no-include-workspace-root'], EXECA_OUT);
  },
});

export const dependencyLicenses = task({
  name: 'dependency-licenses',
  run: async () => {
    await execa(bin('licensee'), ['--errors-only']);
  },
});

export const dependencies = task({
  name: 'dependencies',
  dependencies: [dependencyEngines, dependencyLicenses],
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
    await execa(bin('eslint'), [...sourceGlob.lint], EXECA_OUT);
  },
});

export const test = task({
  name: 'test',
  run: async () => {
    const result = await runTests();

    if (result.overallStatus === 'failed') {
      throw new Error('Test failed.');
    }
  },
});

const lintAndTest = task({
  name: 'lint-and-test',
  dependencies: [lint, test],
});

export default lintAndTest;
