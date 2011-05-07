load('lib/rhino-shim.js');
load('lib/nodeunit.js');

var fs = require('fs'),
    testFiles = fs.ls('./test/'),
    testFile;

while ( testFile = testFiles.shift() ) {
    var testName = testFile.replace(/\.js$/, '');
    var test = {};
    
    test[testName] = require(testName);
    
    nodeunit.run(test);
}