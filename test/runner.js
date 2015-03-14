/*global jasmine */
/*
 * Test Steps:
 * 1. Get Jasmine
 * 2. Get the test options
 * 3. Get the list of directories to run tests from
 * 4. Run Jasmine on each directory
 */
var env = require('jsdoc/env');
var fs = require('jsdoc/fs');
var logger = require('jsdoc/util/logger');
var path = require('path');

fs.existsSync = fs.existsSync || path.existsSync;

require( path.join(env.dirname, 'test/jasmine-jsdoc') );

var hasOwnProp = Object.prototype.hasOwnProperty;

var opts = {
    verbose: env.opts.verbose || false,
    showColors: env.opts.nocolor === true ? false : true
};

var extensions = 'js';
var match = env.opts.match || '.';
if (match instanceof Array) {
    match = match.join("|");
}
opts.matcher = new RegExp("(" + match + ")\\.(" + extensions + ")$", 'i');

var specFolders = [
    path.join(env.dirname, 'test/specs'),
    path.join(env.dirname, 'plugins/test/specs')
];

var failedCount = 0;
var index = 0;

var testsCompleteCallback;
var onComplete;

var runNextFolder = module.exports = function(callback) {
    testsCompleteCallback = testsCompleteCallback || callback;

    // silence the logger while we run the tests
    logger.setLevel(logger.LEVELS.SILENT);

    if (index < specFolders.length) {
        jasmine.executeSpecsInFolder(specFolders[index], onComplete, opts);
    }
    else {
        process.nextTick(function() {
            testsCompleteCallback(null, failedCount);
        });
    }
};

onComplete = function(runner, log) {
    if (runner.results().failedCount !== 0) {
        failedCount += runner.results().failedCount;
    }

    index++;
    runNextFolder();
};
