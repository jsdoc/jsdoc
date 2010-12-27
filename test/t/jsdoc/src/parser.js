(function() {

    var src = { parser: require('jsdoc/src/parser')};
    
    test('There is a src/parser module.', function() {
        assert.equal(typeof src, 'object', 'The src/parser module should be an object.');
    });
    
    test('The src/parser module has a "Parser" constructor.', function() {
        assert.equal(typeof src.parser.Parser, 'function', 'The src.parser.Parser member should be a function.');
    });
    
    test('The src/parser module has a "Parser#parse" function.', function() {
        assert.equal(typeof src.parser.Parser.prototype.parse, 'function', 'The src.parser.Parser#parse member should be a function.');
    });
    
    test('The src/parser module has a "results" function.', function() {
        assert.equal(typeof src.parser.Parser.prototype.results, 'function', 'The src.parser.Parser#results member should be a function.');
    });
    
    test('The src/parser.Parser#parse function fires jsdocCommentFound events when parsing source code containing a jsdoc comment.', function() {
        var sourceCode = 'javascript:/** @name bar */',
            jsdocCounter = 0;
            
        (new src.parser.Parser())
            .on('jsdocCommentFound', function(e) {
                jsdocCounter++;
            })
            .parse(sourceCode);
        
        assert.equal(jsdocCounter, 1, 'The Parser#parse method should fire jsdocCommentFound once if there is 1 jsdoc comment.');
     });
})();