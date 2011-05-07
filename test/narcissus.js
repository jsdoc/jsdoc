var narcissus = require('narcissus');

exports['Narcissus should exist.'] = function(t) {
    t.expect(2);
    t.equal( typeof narcissus, 'object' );
    t.equal( typeof narcissus.Narcissus, 'object' );
    t.done();
};

exports['Narcissus parse should be a function.'] = function(t) {
    t.expect(2);
    t.equal( typeof narcissus.Narcissus.parser, 'object' );
    t.equal( typeof narcissus.Narcissus.parser.parse, 'function' );
    t.done();
};

exports['Narcissus parse should generate an AST from source.'] = function(t) {
    t.expect(1);
    var src = 'var foo = 1;',
        ast = narcissus.Narcissus.parser.parse(src, 'filename', 1);
        
    t.equal( typeof ast, 'object' );
    t.done();
};