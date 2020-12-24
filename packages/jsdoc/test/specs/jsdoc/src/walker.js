describe('jsdoc/src/walker', () => {
    const walker = require('jsdoc/src/walker');

    it('should exist', () => {
        expect(walker).toBeObject();
    });

    it('should export a "walkers" object', () => {
        expect(walker.walkers).toBeObject();
    });

    it('should export a "Walker" class', () => {
        expect(walker.Walker).toBeFunction();
    });

    describe('walkers', () => {
        const { Syntax } = require('@jsdoc/parse');

        // TODO: tests for default functions

        it('should contain a function for each known node type', () => {
            Object.keys(Syntax).forEach(nodeType => {
                expect(walker.walkers[nodeType]).toBeFunction();
            });
        });
    });

    xdescribe('Walker', () => {
        // TODO
    });
});
