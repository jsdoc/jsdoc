const ConsoleReporter = require('jasmine-console-reporter');
const env = require('jsdoc/env');
const Jasmine = require('jasmine');
const klawSync = require('klaw-sync');
const path = require('path');

const SCHEMA_SPEC = path.resolve('test/specs/jsdoc/schema.js');
const SPEC_FILES = (() => {
    // Normal specs are specs that don't need filtering.
    const normalSpecs = [
        'packages/**/test/specs/**/*.js',
        'plugins/test/specs/**/*.js'
    ];
    // Klawed specs are specs we've filtered to avoid the schema spec, which must run last.
    const klawedSpecs = klawSync('test/specs', {
        filter: (item) => (item.path !== SCHEMA_SPEC),
        nodir: true
    }).map((item) => item.path);

    // We want an array of spec files with the schema spec at the end.
    return normalSpecs.concat(klawedSpecs).concat([SCHEMA_SPEC]);
})();

module.exports = () => {
    const jasmine = new Jasmine();
    const matcher = env.opts.matcher;
    /* eslint-disable no-empty-function */
    const promise = new Promise(() => {});
    /* eslint-enable no-empty-function */
    const reporter = new ConsoleReporter({
        beep: false,
        verbosity: {
            disabled: false,
            pending: false,
            specs: false,
            summary: true
        }
    });

    jasmine.loadConfig({
        helpers: [
            'node_modules/jasmine-expect/index.js',
            'test/helpers/**/*.js'
        ],
        random: false,
        stopSpecOnExpectationFailure: false
    });
    jasmine.env.clearReporters();
    jasmine.addReporter(reporter);

    jasmine.onComplete(() => promise.resolve());
    jasmine.execute(SPEC_FILES, matcher);

    return promise;
};

