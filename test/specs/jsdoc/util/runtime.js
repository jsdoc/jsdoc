'use strict';

describe('jsdoc/util/runtime', function() {
    var runtime = require('jsdoc/util/runtime');
    var isNode;

    it('should exist', function() {
        expect(runtime).toBeDefined();
        expect(typeof runtime).toEqual('object');
    });

    it("should export a 'NODE' constant", function() {
        expect(runtime.NODE).toBeDefined();
        expect(typeof runtime.NODE).toEqual('string');
    });

    it("should export an 'isNode' function", function() {
        expect(runtime.isNode).toBeDefined();
        expect(typeof runtime.isNode).toEqual('function');
    });

    describe('isNode', function() {
        isNode = runtime.isNode();

        it('should return a boolean', function() {
            expect(typeof isNode).toEqual('boolean');
        });
    });
});
