var assert = require('common/assert');

var passCount = 0,
    failCount = 0,
    errorLog = [],
    currentTestFile = '';

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
    print('\033[032mPASSED: ' + passCount + ' test' + (passCount == 1? '' : 's') + '.\033[0m');
    if (failCount) {
        print('\033[031mFAILED: '+ failCount + ' test' + (passCount == 1? '' : 's') + '.\033[0m');
        for (var i = 0, leni = errorLog.length; i < leni; i++) {
            print(' ' + (i+1) + '. ' + (i+1 < 10? ' ' : '') + (errorLog[i]||'') + '\n');
        }
    }
}

// helpers
var testhelpers = {
    getDocSetFromFile: function(filename) {
        var sourceCode = readFile(BASEDIR + filename),
            docs;
            
        app.jsdoc.parser = new (require('jsdoc/src/parser')).Parser();
        require('jsdoc/src/handlers');
        docs = app.jsdoc.parser.parse('javascript:' + sourceCode);
        
        return new (require('jsdoc/docset')).DocSet(docs);
    }
};

testFile('test/t/common/dumper.js');
testFile('test/t/jsdoc/opts/parser.js');
testFile('test/t/jsdoc/src/parser.js');

testFile('test/t/cases/file.js');

testFile('test/t/cases/virtual.js');

testFile('test/t/cases/objectlit.js');
testFile('test/t/cases/objectlit2.js');

testFile('test/t/cases/this.js');
testFile('test/t/cases/this2.js');
testFile('test/t/cases/this3.js');

testFile('test/t/cases/this-and-objectlit.js');

testFile('test/t/cases/var.js');

testFile('test/t/cases/inner.js');

report();

