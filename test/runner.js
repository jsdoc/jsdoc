/*global env: true */
/*
 * Test Steps:
 * 1. Get Jasmine
 * 2. Get the test options
 * 3. Get the list of directories to run tests from
 * 4. Run Jasmine on each directory
 */
var fs = require('jsdoc/fs');
var jasmine = require('test/jasmine-jsdoc');
var path = require('path');

fs.existsSync = fs.existsSync || path.existsSync;

var hasOwnProp = Object.prototype.hasOwnProperty;

for (var key in jasmine) {
    if (hasOwnProp.call(jasmine, key)) {
        this[key] = jasmine[key];
    }
}

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

var helperCollection = require('test/spec-collection');
var specFolders = ['test/specs', 'plugins/test/specs'];

var failedCount = 0;
var index = 0;

var onComplete;

function runNextFolder() {
    if (index < specFolders.length) {
        jasmine.loadHelpersInFolder(specFolders[index],
            new RegExp("helpers?\\.(" + extensions + ")$", 'i'));

        jasmine.executeSpecsInFolder(specFolders[index], onComplete, opts);
    }
}

onComplete = function(runner, log) {
    if (runner.results().failedCount !== 0) {
        failedCount += runner.results().failedCount;
    }
    index++;
    runNextFolder();
};

runNextFolder();
process.exit(failedCount);
