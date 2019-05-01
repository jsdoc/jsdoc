/* global jasmine: true */
'use strict';

var fs = require('../lib/jsdoc/fs');
var path = require('../lib/jsdoc/path');

var jsdoc = {
    augment: require('../lib/jsdoc/augment'),
    doclet: require('../lib/jsdoc/doclet'),
    env: require('../lib/jsdoc/env'),
    schema: require('../lib/jsdoc/schema'),
    src: {
        handlers: require('../lib/jsdoc/src/handlers'),
        parser: require('../lib/jsdoc/src/parser')
    },
    tag: {
        dictionary: require('../lib/jsdoc/tag/dictionary'),
        definitions: require('../lib/jsdoc/tag/dictionary/definitions')
    }
};

var originalDictionary = jsdoc.tag.dictionary;

var jasmineAll = require('./lib/jasmine');
var jasmine = jasmineAll.jasmine;
var jasmineNode = ( require('./reporter') )(jasmine);

var reporter = null;

var parseResults = [];

jasmine.addParseResults = function(filename, doclets) {
    parseResults.push({
        filename: filename,
        doclets: doclets
    });
};

jasmine.getParseResults = function() {
    return parseResults;
};

// use the requested parser, or default to the pure JS parser (on Node.js)
jasmine.jsParser = (function() {
    var parser = 'js';

    if (jsdoc.env.opts.query && jsdoc.env.opts.query.parser) {
        parser = jsdoc.env.opts.query.parser;
        // remove this so the config tests don't complain
        delete jsdoc.env.opts.query;
    }

    return parser;
})();

jasmine.initialize = function(done) {
    var jasmineEnv = jasmine.getEnv();

    if (reporter !== null) {
        // If we've run before, we need to reset the runner
        jasmineEnv.currentRunner_ = new jasmine.Runner(jasmineEnv);
        // And clear the reporter
        jasmineEnv.reporter.subReporters_.splice(jasmineEnv.reporter.subReporters_.indexOf(reporter));
    }

    var reporterOpts = {
        color: !jsdoc.env.opts.nocolor,
        onComplete: done
    };

    reporter = jsdoc.env.opts.verbose ? new jasmineNode.TerminalVerboseReporter(reporterOpts) :
        new jasmineNode.TerminalReporter(reporterOpts);
    jasmineEnv.addReporter(reporter);

    // updateInterval is set to 0 because there were not-fully-understood
    // issues with asynchronous behavior in jasmine otherwise.
    jasmineEnv.updateInterval = 0;

    return jasmineEnv;
};

jasmine.createParser = function(type) {
    return jsdoc.src.parser.createParser(type || jasmine.jsParser);
};

/**
 * Execute the specs in the specified folder.
 *
 * @param {string} folder The folder in which the specs are to be found.
 * @param {function?} done Callback function to execute when finished.
 * @param {object} opts Options for executing the specs.
 * @param {boolean} opts.verbose Whether or not to output verbose results.
 * @param {RegExp} opts.matcher A regular expression to filter specs by. Only matching specs run.
 */
jasmine.executeSpecsInFolder = function(folder, done, opts) {
    var specs = require('./spec-collection');

    var fileMatcher = opts.matcher || new RegExp('.(js)$', 'i');
    var jasmineEnv = jasmine.initialize(done, opts.verbose);

    // Load the specs
    specs.load(folder, fileMatcher, true, function() {
        var specsList = specs.getSpecs();
        var filename;

        // Add the specs to the context
        for (var i = 0, len = specsList.length; i < len; ++i) {
            filename = specsList[i];
            require(filename.path().replace(/\\/g, '/')
                .replace(new RegExp('^' + jsdoc.env.dirname + '/test'), './')
                .replace(/\.\w+$/, ''));
        }

        // Run Jasmine
        jasmineEnv.execute();
    });
};

function now() {
    return new Date().getTime();
}

jasmine.asyncSpecWait = function() {
    var wait = this.asyncSpecWait;

    wait.start = now();
    wait.done = false;
    (function innerWait() {
        waits(10);
        runs(function() {
            if (wait.start + wait.timeout < now()) {
                expect('timeout waiting for spec').toBeNull();
            } else if (wait.done) {
                wait.done = false;
            } else {
                innerWait();
            }
        });
    })();
};
jasmine.asyncSpecWait.timeout = 4 * 1000;
jasmine.asyncSpecDone = function() {
    jasmine.asyncSpecWait.done = true;
};

jasmine.getDocSetFromFile = function(filename, parser, validate, augment) {
    var doclets;

    var sourceCode = fs.readFileSync( path.join(jsdoc.env.dirname, filename), 'utf8' );
    var testParser = parser || jasmine.createParser();

    jsdoc.src.handlers.attachTo(testParser);

    /* eslint-disable no-script-url */
    doclets = testParser.parse('javascript:' + sourceCode);
    /* eslint-enable no-script-url */

    if (augment !== false) {
        jsdoc.augment.augmentAll(doclets);
    }

    // test assume borrows have not yet been resolved
    // require('../lib/jsdoc/borrow').resolveBorrows(doclets);

    // store the parse results for later validation
    if (validate !== false) {
        jasmine.addParseResults(filename, doclets);
    }

    return {
        doclets: doclets,
        getByLongname: function(longname) {
            return doclets.filter(function(doclet) {
                return (doclet.longname || doclet.name) === longname;
            });
        }
    };
};

jasmine.replaceTagDictionary = function(dictionaryNames) {
    var dict = new jsdoc.tag.dictionary.Dictionary();
    var originalDictionaries = jsdoc.env.conf.tags.dictionaries.slice(0);

    if (!Array.isArray(dictionaryNames)) {
        dictionaryNames = [dictionaryNames];
    }

    jsdoc.env.conf.tags.dictionaries = dictionaryNames;

    jsdoc.tag.definitions.defineTags(dict);
    jsdoc.doclet._replaceDictionary(dict);

    jsdoc.env.conf.tags.dictionaries = originalDictionaries;
};

jasmine.restoreTagDictionary = function() {
    jsdoc.doclet._replaceDictionary(originalDictionary);
};

// set up jasmine's global functions
Object.keys(jasmine).forEach(function(key) {
    exports[key] = global[key] = jasmine[key];
});
global.jasmine = jasmine;
require('./async-callback');
['spyOn', 'it', 'xit', 'expect', 'runs', 'waitsFor', 'beforeEach', 'afterEach', 'describe',
    'xdescribe'].forEach(function(item) {
    global[item] = jasmineAll[item];
});
