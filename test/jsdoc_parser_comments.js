var parser = require('jsdoc/parser');
var dumper = require('jsdoc/util/dumper');

exports['Parse a source containing only a jsdoc comment.'] = function(t) {
    t.expect(1);
    var docs = parser.parse('/**@doc*/');
    t.equal( docs.length, 1, 'should result in docs that contain the comment' );
    t.done();
};

exports['Parse a source ending with a jsdoc comment.'] = function(t) {
    t.expect(1);
    var docs = parser.parse(';/**@doc*/');
    t.equal( docs.length, 1, 'should result in docs that contain the comment' );
    t.done();
};

exports['Parse a source with a jsdoc comment preceding a jsdoc comment.'] = function(t) {
    t.expect(1);
    var docs = parser.parse('/**@doc1*/ /**@doc2*/ var x;');
    t.equal( docs.length, 2, 'should result in docs containing both the comments' );
    t.done();
};

exports['Parse a source with only single line comments.'] = function(t) {
    t.expect(1);
    var docs = parser.parse('// foo');
    t.equal( docs.length, 0, 'should result in docs that are empty' );

    t.done();
};

exports['Parse a source with only single non-jsdoc multi-line comments.'] = function(t) {
    t.expect(1);
    var docs = parser.parse('/*foo*/');
    t.equal( docs.length, 0, 'should result in docs that are empty' );
    t.done();
};

exports['Parse second source, should be unaffected by the first pasre.'] = function(t) {
    t.expect(2);
    var docs = parser.parse('/**@doc1*/ /**@doc2*/ var x;');
    t.equal( docs.length, 2 );
    
    docs = parser.parse('function y(){}');
    t.equal( docs.length, 1 );
    
    t.done();
};
