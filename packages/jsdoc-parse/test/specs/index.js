const parse = require('../../index');

describe('@jsdoc/parse', () => {
    it('is an object', () => {
        expect(parse).toBeObject();
    });

    describe('AstBuilder', () => {
        it('is lib/ast-builder.AstBuilder', () => {
            const { AstBuilder } = require('../../lib/ast-builder');

            expect(parse.AstBuilder).toBe(AstBuilder);
        });
    });

    describe('astNode', () => {
        it('is lib/ast-node', () => {
            const astNode = require('../../lib/ast-node');

            expect(parse.astNode).toBe(astNode);
        });
    });

    describe('Syntax', () => {
        it('is lib/syntax.Syntax', () => {
            const { Syntax } = require('../../lib/syntax');

            expect(parse.Syntax).toBe(Syntax);
        });
    });
});
