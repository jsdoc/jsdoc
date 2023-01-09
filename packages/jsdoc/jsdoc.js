#!/usr/bin/env node
/*
  Copyright 2011 the JSDoc Authors.

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

const { env } = require('@jsdoc/core');

// initialize the environment for Node.js
(() => {
  const path = require('path');

  // Create a custom require method that adds `lib/jsdoc` and `node_modules` to the module
  // lookup path. This makes it possible to `require('jsdoc/foo')` from external templates and
  // plugins, and within JSDoc itself. It also allows external templates and plugins to
  // require JSDoc's module dependencies without installing them locally.
  /* eslint-disable no-global-assign, no-redeclare */
  require = require('requizzle')({
    requirePaths: {
      before: [path.join(__dirname, 'lib')],
      after: [path.join(__dirname, 'node_modules')],
    },
    infect: true,
  });
  /* eslint-enable no-global-assign, no-redeclare */

  env.args = process.argv.slice(2);
})();

(async () => {
  const cli = require('./cli');

  cli.setEnv(env).setVersionInfo().loadConfig().configureLogger().logStart();

  await cli.runCommand();
})();
