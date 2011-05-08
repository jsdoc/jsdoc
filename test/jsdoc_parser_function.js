var parser = require('jsdoc/parser');

exports['An undocumented named function.'] = function(t) {
    t.expect(3);
    var docs = parser.parse('function foo() {}');
    t.equal( docs.length, 1, 'should result in 1 doc' );
    t.equal( typeof docs[0].longname, 'string', 'should have a longname set' );
    t.equal( docs[0].longname, 'foo', 'should have a longname equal to the function name' );
    t.done();
};

exports['A documented named function.'] = function(t) {
    t.expect(4);
    var docs = parser.parse('/**@desc a function*/ function foo() {}');
    t.equal( docs.length, 1, 'should result in 1 doc' );
    t.equal( docs[0].longname, 'foo', 'should have a longname equal to the function name' );
    t.equal( typeof docs[0], 'object', 'should have a jsdoc set' );
    t.equal( docs[0].jsdoc, '@desc a function', 'should have a jsdoc equal to the preceding doc comment' );
    t.done();
};

exports['A nested documented named function.'] = function(t) {
    t.expect(2);
    var docs = parser.parse('function foo() { /**@desc a function*/ function bar() {} }');
    t.equal( docs.length, 2, 'should result in 2 docs' );
    t.equal( docs[1].longname, 'foo~bar', 'the inner function should have a longname equal to <the outer function name>~<the inner function name>' );
    t.done();
};

exports['A nested documented named function.'] = function(t) {
    t.expect(2);
    var docs = parser.parse('function foo() { /**@desc a function*/ function bar() {} }');
    t.equal( docs.length, 2, 'should result in 2 docs' );
    t.equal( docs[1].longname, 'foo~bar', 'the inner function should have a longname equal to <the outer function name>~<the inner function name>' );
    t.done();
};

exports['An undocumented anonymous function.'] = function(t) {
    t.expect(4);
    var docs = parser.parse('var foo = function() {}');
    t.equal( docs.length, 1, 'should result in 1 doc' );
    t.equal( docs[0].longname, 'foo', 'should have a longname set' );
    t.equal( docs[0].kind, 'function', 'should have a kind set to function' );
    t.equal( docs[0].longname, 'foo', 'should have a longname equal to the function name' );
    t.done();
};

exports['An undocumented anonymous function nested inside an undocumented anonymous function.'] = function(t) {
    t.expect(3);
    var docs = parser.parse('var foo = function() { var bar = function() {} }');
    t.equal( docs.length, 2, 'should result in 2 docs' );
    t.equal( typeof docs[1].longname, 'string', 'the inner function doc should have a longname set' );
    t.equal( docs[1].longname, 'foo~bar', 'should have a longname equal to <the outer function name>~<the inner function name>' );
    t.done();
};

exports['An anonymous function as a child of a var.'] = function(t) {
    t.expect(3);
    var docs = parser.parse('var x, foo = function() {}');
    t.equal( docs.length, 2, 'should result in 3 docs' );
    t.equal( docs[1].longname, 'foo', 'the inner function doc should have a longname set' );
    t.equal( docs[1].kind, 'function', 'should have a kind set to function' );
    t.done();
};