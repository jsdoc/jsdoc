const ConsoleReporter = require('jasmine-console-reporter');
const Jasmine = require('jasmine');

const SCHEMA_SPEC = 'packages/jsdoc/test/specs/jsdoc/schema.js';
const SPEC_FILES = [
  `!${SCHEMA_SPEC}`,
  '!node_modules',
  'packages/**/test/specs/**/*.js',
  SCHEMA_SPEC,
];

module.exports = (deps) => {
  const jasmine = new Jasmine();
  const matcher = deps.get('options').matcher;
  /* eslint-disable no-empty-function */
  const promise = new Promise(() => {});
  /* eslint-enable no-empty-function */
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

  jasmine.loadConfig({
    helpers: ['node_modules/@jsdoc/test-matchers', 'packages/jsdoc/test/helpers/**/*.js'],
    random: false,
    stopSpecOnExpectationFailure: false,
  });
  jasmine.env.clearReporters();
  jasmine.addReporter(reporter);

  // Make dependencies available to all tests.
  if (!global.jsdoc) {
    global.jsdoc = {};
  }
  global.jsdoc.deps = deps;

  jasmine.onComplete(() => promise.resolve());
  jasmine.execute(SPEC_FILES, matcher);

  return promise;
};
