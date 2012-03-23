var scanner = new (require('jsdoc/src/scanner').Scanner)(),
    includeMatch = new RegExp(".+\\.js(doc|.erb)?$"),
    excludeMatch = new RegExp("(^|\\/)_"),
    sourceFiles = scanner.scan([__dirname+'/test/cases/src/'], 3, includeMatch, excludeMatch);

sourceFiles = sourceFiles.map(function($) {
    return $.replace(__dirname, '');
});

//console.log(sourceFiles); process.exit();

test('The scanner should return the correct source files', function() {

    assert.equal(sourceFiles.length, 4);
    assert.equal(sourceFiles.indexOf("/test/cases/src/one.js") > -1, true);
    assert.equal(sourceFiles.indexOf("/test/cases/src/two.js") > -1, true);
    assert.equal(sourceFiles.indexOf("/test/cases/src/dynamic_script.js.erb.js~") > -1, true);
    assert.equal(sourceFiles.indexOf("/test/cases/src/dir1/three.js") > -1, true);
    
});

test('The scanner should convert erb file in standard js file', function() {
  var fileContent = readFile("test/cases/src/dynamic_script.js.erb.js~");

  assert.ok(fileContent.match(/<%.*%>/) === null);
});
