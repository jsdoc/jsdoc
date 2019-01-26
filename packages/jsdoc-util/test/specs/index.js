const util = require('../../index');

describe('@jsdoc/util', () => {
    it('is an object', () => {
        expect(util).toBeObject();
    });

    it('has a cast method', () => {
        expect(util.cast).toBeFunction();
    });

    describe('cast', () => {
        it('is ./lib/cast', () => {
            const cast = require('../../lib/cast');

            expect(util.cast).toBe(cast);
        });
    });
});
