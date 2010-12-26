(function() {

    var src = { parser: require('jsdoc/src/parser')};
    
    test('There is a src/parser module.', function() {
        assert.notEqual(typeof src, 'undefined', 'The src/parser module should be defined.');
        assert.equal(typeof src, 'object', 'The src/parser module should be an object.');
    });
    
    test('The src/parser module has a "parse" function.', function() {
        assert.notEqual(typeof src.parser.parse, 'undefined', 'The src.parser.parse method should be defined.');
        assert.equal(typeof src.parser.parse, 'function', 'The src.parser.parse method should be a function.');
    });
    
    test('The src/parser module has a "parseSource" function.', function() {
        assert.notEqual(typeof src.parser.parseSource, 'undefined', 'The src.parser.parseSource method should be defined.');
        assert.equal(typeof src.parser.parseSource, 'function', 'The src.parser.parseSource method should be a function.');
    });
    
    test('The src/parser module has a "result" function.', function() {
        assert.notEqual(typeof src.parser.result, 'undefined', 'The src.parser.result method should be defined.');
        assert.equal(typeof src.parser.result, 'function', 'The src.parser.result method should be a function.');
    });
    
    test('The src/parser module has a "clear" function.', function() {
        assert.notEqual(typeof src.parser.clear, 'undefined', 'The src.parser.clear method should be defined.');
        assert.equal(typeof src.parser.clear, 'function', 'The src.parser.clear method should be a function.');
    });
    
    test('The src/parser.result function can return the result array.', function() {
        var docs = src.parser.result;
    
        assert.notEqual(typeof docs, 'undefined', 'The src.parser.result method should return a result.');
        assert.equal(docs.length, 0, 'The src.parser.result method should return an array of 0 results if there has been nothing parsed yet.');
    });
    
    test('The src/parser.parseSource function can parse js source code containing a jsdoc comment.', function() {
        var sourceCode = '/** @name foo */';
        
        var docs = src.parser.parseSource(sourceCode, '/bar/foo.js');
    
        assert.notEqual(typeof docs, 'undefined', 'The src.parser.parseSource method should return a result.');
        assert.equal(docs.length, 1, 'The src.parser.parseSource method should return an array of 1 result if there is 1 jsdoc comment.');
        assert.notEqual(typeof docs[0].tags, 'undefined', 'The result array returned by src.parser.parseSource should be a collection of Doclets with Tags.');
    });
    
    test('The src/parser.clear function can empty the result array.', function() {
        src.parser.clear();
        var docs = src.parser.result;
    
        assert.equal(docs.length, 0, 'The src.parser.result method should return an array of 0 results if clear was called.');
    });
    
    test('The src/parser.parse function can parse js source code containing a doc comment.', function() {
        var sourceCode = 'javascript:/** @name bar */';
        
        src.parser.clear();
        var docs = src.parser.parse([sourceCode]);
    
        assert.notEqual(typeof docs, 'undefined', 'The src.parser.parse method should return a result.');
        assert.equal(docs.length, 1, 'The src.parser.parse method should return an array of 1 result if there is 1 jsdoc comment.');
        assert.notEqual(typeof docs[0].tags, 'undefined', 'The result array returned by src.parser.parse should be a collection of Doclets with Tags.');
    });
    
    test('The src/parser.parse function can cope with source code containing no jsdoc comments.', function() {
        var sourceCode = 'javascript:var blah;';
        
        src.parser.clear();
        var docs = src.parser.parse([sourceCode]);
    
        assert.notEqual(typeof docs, 'undefined', 'The src.parser.parse method should return a result.');
        assert.equal(docs.length, 0, 'The src.parser.parse method should return an array of 0 Doclets if there are no jsdocc omments.');
    });

})();