const parse = require('../../index');

describe('@jsdoc/parse', () => {
    it('is an object', () => {
        expect(parse).toBeObject();
    });

    describe('Syntax', () => {
        it('is lib/syntax.Syntax', () => {
            const { Syntax } = require('../../lib/syntax');

            expect(parse.Syntax).toBe(Syntax);
        });
    });
});
