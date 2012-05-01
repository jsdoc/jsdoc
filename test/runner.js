var assert = require('common/assert');

/*
 * Tests Steps:
 * 1. Get Jasmine
 * 2. Get the test options
 * 3. Get the list of directories to run tests from
 * 4. Run Jasmine on each directory
 */
var jasmine = require('test/jasmine-jsdoc');
var extensions = "js";
var match = ".";
var verbose = env.opts.verbose || false;
var coffee = env.opts.coffee || false;
var matches = env.opts.match || false;
if (coffee) {
    extensions = "js|coffee";
}
if (matches) {
    if (matches instanceof Array) {
        match = matches.join("|");
    } else {
        match = matches;
    }
}

var helperCollection = require('test/spec-collection');
var specFolders = ['test/specs', 'plugins/test/specs'];
var failedCount = 0;
var index = 0;

for (var key in jasmine) {
    this[key] = jasmine[key];
}

// --------------OLD------------------
var passCount = 0,
    failCount = 0,
    errorLog = [],
    currentTestFile = '';

//helpers
var testhelpers = {
    getDocSetFromFile: function(filename) {
        var sourceCode = readFile(__dirname + '/' + filename),
            testParser,
            doclets;

        testParser = new (require('jsdoc/src/parser')).Parser();
        require('jsdoc/src/handlers').attachTo(testParser);

        doclets = testParser.parse('javascript:' + sourceCode);
        testhelpers.indexAll(doclets);

        require('jsdoc/augment').addInherited(doclets);

        // test assume borrows have not yet been resolved
        // require('jsdoc/borrow').resolveBorrows(doclets);

        return {
            doclets: doclets,
            getByLongname: function(longname) {
                return doclets.filter(function(doclet) {
                    return (doclet.longname || doclet.name) === longname;
                });
            }
        };
    },
    indexAll: function(docs) {
        var index = {};
        docs.forEach(function(doc) {
            if (!index.hasOwnProperty(doc.longname)){index[doc.longname] = [];}
            index[doc.longname].push(doc);
        });
        docs.index = index;
    }
};

//--------------END OLD------------------

var onComplete = function(runner, log) {
    if (runner.results().failedCount != 0) {
        failedCount++;
    }
    index++;
    runNextFolder();
};

var specFolder = null;

var runNextFolder = function() {
    if (index < specFolders.length) {
        jasmine.loadHelpersInFolder(specFolders[index], new RegExp("helpers\\.(" + extensions + ")$", 'i'));

        var regExpSpec = new RegExp("(" + match + ")\\.(" + extensions + ")$", 'i');
        jasmine.executeSpecsInFolder(specFolders[index], onComplete, verbose, regExpSpec);
    }
};

runNextFolder();
//process.exit(failedCount);

//--------------OLD------------------
function test(description, f) {
    try {
        f();
        passCount++;
    }
    catch(e) {
        errorLog.push(description + (currentTestFile? ' ['+currentTestFile+']':'') + '\n' + (e.message||'') + '\n     - Expected: ' + e.expected + '\n     - Actual:   ' + e.actual);
        failCount++;
    }
}

function testFile(filepath) {
    currentTestFile = filepath;
    include(filepath);
    currentTestFile = '';
}

function report() {
    console.log('\033[032mPASSED: ' + passCount + ' test' + (passCount == 1? '' : 's') + '.\033[0m');
    if (failCount) {
        console.log('\033[031mFAILED: '+ failCount + ' test' + (passCount == 1? '' : 's') + '.\033[0m');
        for (var i = 0, leni = errorLog.length; i < leni; i++) {
            console.log(' ' + (i+1) + '. ' + (i+1 < 10? ' ' : '') + (errorLog[i]||'') + '\n');
        }
    }
}

testFile('test/specs/tags/file.js');

testFile('test/specs/documentation/virtual.js');

testFile('test/specs/documentation/objectlit.js');
testFile('test/specs/documentation/objectlit2.js');

testFile('test/specs/documentation/this.js');
testFile('test/specs/documentation/this2.js');
testFile('test/specs/documentation/this3.js');

testFile('test/specs/documentation/this-and-objectlit.js');

testFile('test/specs/documentation/var.js');

testFile('test/specs/documentation/inner.js');
testFile('test/specs/documentation/innerscope.js');
testFile('test/specs/documentation/innerscope2.js');

testFile('test/specs/tags/abstracttag.js');
testFile('test/specs/tags/accesstag.js');
testFile('test/specs/tags/alias.js');
testFile('test/specs/tags/alias2.js');
testFile('test/specs/tags/alias3.js');
testFile('test/specs/tags/aliasglobal.js');
testFile('test/specs/tags/aliasresolve.js');
testFile('test/specs/tags/aliasresolve2.js');
testFile('test/specs/documentation/also.js');
testFile('test/specs/tags/augmentstag.js');
testFile('test/specs/tags/authortag.js');
testFile('test/specs/tags/borrowstag.js');
testFile('test/specs/tags/borrowstag2.js');
testFile('test/specs/tags/classtag.js');
testFile('test/specs/tags/constructstag.js');
testFile('test/specs/tags/constructstag2.js');
testFile('test/specs/tags/constructstag3.js');
testFile('test/specs/tags/constructstag4.js');
testFile('test/specs/tags/constructstag5.js');
testFile('test/specs/tags/constructortag.js');
testFile('test/specs/documentation/constructorproperty.js');
testFile('test/specs/tags/copyrighttag.js');
testFile('test/specs/tags/defaulttag.js');
testFile('test/specs/tags/deprecatedtag.js');
testFile('test/specs/tags/enumtag.js');
testFile('test/specs/tags/eventfirestag.js');
testFile('test/specs/documentation/exports.js');
testFile('test/specs/tags/exportstag.js');
testFile('test/specs/tags/exportstag2.js');
testFile('test/specs/tags/exportstag3.js');
testFile('test/specs/tags/exportstag4.js');
testFile('test/specs/tags/exceptiontag.js');
testFile('test/specs/tags/globaltag.js');
testFile('test/specs/tags/ignoretag.js');
testFile('test/specs/documentation/inlinecomment.js');
testFile('test/specs/tags/lends.js');
testFile('test/specs/tags/lends2.js');
testFile('test/specs/tags/lendsglobal.js');
testFile('test/specs/documentation/moduleinner.js');
testFile('test/specs/tags/memberoftag.js');
testFile('test/specs/tags/memberoftag2.js');
testFile('test/specs/tags/memberoftag3.js');
testFile('test/specs/tags/memberoftag4.js');
testFile('test/specs/tags/memberoftagforced.js');
testFile('test/specs/tags/moduletag.js');
testFile('test/specs/tags/moduletag2.js');
testFile('test/specs/documentation/namedFuncStatement.js');
testFile('test/specs/tags/paramtag.js');
testFile('test/specs/tags/privatetag.js');
testFile('test/specs/documentation/quotename.js');
testFile('test/specs/documentation/quotename2.js');
testFile('test/specs/tags/readonlytag.js');
testFile('test/specs/tags/requirestag.js');
testFile('test/specs/tags/returnstag.js');
testFile('test/specs/tags/seetag.js');
testFile('test/specs/tags/sincetag.js');
testFile('test/specs/documentation/starbangstar.js');
testFile('test/specs/tags/thistag.js');
testFile('test/specs/tags/typekind.js');
testFile('test/specs/tags/typetag.js');
testFile('test/specs/tags/typedeftag.js');
testFile('test/specs/documentation/variations.js');
testFile('test/specs/tags/variations3.js');
testFile('test/specs/tags/versiontag.js');


var os    = java.lang.System.getProperty('os.name'),
	isWin = !!os.startsWith('Windows');

/** Add codes to display string in color (red) on the console (if OS supports). */
function red(str) {
	if (isWin) { return str; }
	else { return '\033[031m' + str + '\033[0m'; }
}

/** Add codes to display string in color (red) on the console (if OS supports). */
function green(str) {
	if (isWin) { return str; }
	else { return '\033[032m' + str + '\033[0m'; }
}


report();
//--------------END OLD------------------