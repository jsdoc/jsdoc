describe('@jsdoc/parse.Syntax', () => {
    const { Syntax } = require('../../../index');

    it('is an object', () => {
        expect(Syntax).toBeObject();
    });

    it('has values identical to their keys', () => {
        for (const key of Object.keys(Syntax)) {
            expect(key).toBe(Syntax[key]);
        }
    });
});
