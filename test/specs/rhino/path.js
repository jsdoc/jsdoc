'use strict';

describe('rhino/path', function() {
    // TODO: more tests
    var path = require('path');

    var pathChunks = [
        'foo',
        'bar',
        'baz',
        'qux.html'
    ];
    var joinedPath = path.join.apply(this, pathChunks);

    describe('basename', function() {
        it('should exist', function() {
            expect(path.basename).toBeDefined();
        });

        it('should be a function', function() {
            expect(typeof path.basename).toBe('function');
        });

        it('should work correctly without an "ext" parameter', function() {
            expect( path.basename(joinedPath) ).toBe( pathChunks[pathChunks.length - 1] );
        });

        it('should work correctly with an "ext" parameter', function() {
            var fn = pathChunks[pathChunks.length - 1];
            var ext = Array.prototype.slice.call( fn, fn.indexOf('.') ).join('');
            var bn = Array.prototype.slice.call( fn, 0, fn.indexOf('.') ).join('');

            expect( path.basename(joinedPath, ext) ).toBe(bn);
        });
    });
});
