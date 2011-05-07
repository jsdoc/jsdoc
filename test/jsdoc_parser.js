var parser = require('jsdoc/parser');

exports['The jsdoc parser should exist.'] = function(t) {
    t.expect(1);
    t.equal( typeof parser, 'object' );
    t.done();
};

exports['The parser should have a parse function.'] = function(t) {
    t.expect(1);
    t.equal( typeof parser.parse, 'function' );
    t.done();
};
