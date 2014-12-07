'use strict';

describe('jsdoc/util/runtime', function() {
    var runtime = require('jsdoc/util/runtime');
    var isRhino;
    var isNode;

    it('should exist', function() {
        expect(runtime).toBeDefined();
        expect(typeof runtime).toEqual('object');
    });

    it("should export a 'RHINO' constant", function() {
        expect(runtime.RHINO).toBeDefined();
        expect(typeof runtime.RHINO).toEqual('string');
    });

    it("should export a 'NODE' constant", function() {
        expect(runtime.NODE).toBeDefined();
        expect(typeof runtime.NODE).toEqual('string');
    });
    it("should export an 'isRhino' function", function() {
        expect(runtime.isRhino).toBeDefined();
        expect(typeof runtime.isRhino).toEqual('function');
    });

    it("should export an 'isNode' function", function() {
        expect(runtime.isNode).toBeDefined();
        expect(typeof runtime.isNode).toEqual('function');
    });

    describe('isRhino', function() {
        isRhino = runtime.isRhino();

        it('should return a boolean', function() {
            expect(typeof isRhino).toEqual('boolean');
        });

        it('should return the opposite value from isNode()', function() {
            if (isNode === undefined) {
                isNode = runtime.isNode();
            }

            expect(!isRhino).toBe(isNode);
        });
    });

    describe('isNode', function() {
        isNode = runtime.isNode();

        it('should return a boolean', function() {
            expect(typeof isNode).toEqual('boolean');
        });

        it('should return the opposite value from isRhino()', function() {
            if (isRhino === undefined) {
                isRhino = runtime.isRhino();
            }

            expect(!isNode).toBe(isRhino);
        });
    });
});
