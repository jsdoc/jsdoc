describe('@jsdoc/core/lib/util', () => {
    const util = require('../../../../lib/util');

    it('is an object', () => {
        expect(util).toBeObject();
    });

    describe('cast', () => {
        it('is lib/util/cast', () => {
            const cast = require('../../../../lib/util/cast');

            expect(util.cast).toBe(cast);
        });
    });

    describe('fs', () => {
        it('is lib/util/fs', () => {
            const fs = require('../../../../lib/util/fs');

            expect(util.fs).toBe(fs);
        });
    });
});
