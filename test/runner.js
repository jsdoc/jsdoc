/*global env: true, jasmine: true */
/*
 * Test Steps:
 * 1. Get Jasmine
 * 2. Get the test options
 * 3. Get the list of directories to run tests from
 * 4. Run Jasmine on each directory
 */
var fs = require('jsdoc/fs');
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

function testedAllParsers() {
    // TODO: We currently support testing one parser per runtime; see jasmine-jsdoc.js
    //return jasmine.jsParsers.indexOf(jasmine.currentParser) === jasmine.jsParsers.length - 1;
    return true;
}

var runNextFolder = module.exports = function(callback) {
    testsCompleteCallback = testsCompleteCallback || callback;

    if (index < specFolders.length) {
        // we need to run the test specs once for each parser
        // TODO: We currently support testing one parser per runtime
        //jasmine.jsParsers.forEach(function(jsParser) {
        //    jasmine.currentParser = jsParser;
            jasmine.executeSpecsInFolder(specFolders[index], onComplete, opts);
        //});
    }
    else {
        process.nextTick(function() {
            testsCompleteCallback(failedCount);
        });
    }
};

onComplete = function(runner, log) {
    if (runner.results().failedCount !== 0) {
        failedCount += runner.results().failedCount;
    }

    if ( testedAllParsers() ) {
        index++;
        runNextFolder();        
    }
};
