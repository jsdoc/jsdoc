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
import Jasmine from 'jasmine';
import ConsoleReporter from 'jasmine-console-reporter';

const SCHEMA_SPEC = 'packages/jsdoc/test/specs/validate.js';
const SPEC_FILES = [
  `!${SCHEMA_SPEC}`,
  '!node_modules',
  'packages/jsdoc/test/specs/add-matchers.cjs',
  'packages/**/test/specs/**/*.js',
  SCHEMA_SPEC,
];

export default function test(deps) {
  const jasmine = new Jasmine();
  const matcher = deps.get('options').matcher;
  const reporter = new ConsoleReporter({
    beep: false,
    verbosity: {
      disabled: false,
      pending: false,
      specs: false,
      summary: true,
    },
  });

  // Treat an unhandled promise rejection as an error.
  process.on('unhandledRejection', (e) => {
    throw e;
  });

  jasmine.clearReporters();
  jasmine.addReporter(reporter);
  jasmine.exitOnCompletion = false;
  jasmine.loadConfig({
    helpers: ['packages/jsdoc/test/helpers/**/*.js'],
    random: false,
    stopSpecOnExpectationFailure: false,
  });

  // Make dependencies available to all tests.
  if (!global.jsdoc) {
    global.jsdoc = {};
  }
  global.jsdoc.deps = deps;

  return jasmine.execute(SPEC_FILES, matcher);
}
