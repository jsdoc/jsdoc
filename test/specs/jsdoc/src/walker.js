describe('jsdoc/src/walker', () => {
    const walker = require('jsdoc/src/walker');

    it('should exist', () => {
        expect(walker).toBeDefined();
        expect(typeof walker).toBe('object');
    });

    it('should export a "walkers" object', () => {
        expect(walker.walkers).toBeDefined();
        expect(typeof walker.walkers).toBe('object');
    });

    it('should export a "Walker" class', () => {
        expect(walker.Walker).toBeDefined();
        expect(typeof walker.Walker).toBe('function');
    });

    describe('walkers', () => {
        const Syntax = require('@jsdoc/syntax');

        // TODO: tests for default functions

        it('should contain a function for each known node type', () => {
            Object.keys(Syntax).forEach(nodeType => {
                expect(walker.walkers[nodeType]).toBeDefined();
                expect(typeof walker.walkers[nodeType]).toBe('function');
            });
        });
    });

    xdescribe('Walker', () => {
        // TODO
    });
});
