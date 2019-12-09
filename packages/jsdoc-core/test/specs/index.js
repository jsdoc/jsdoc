const core = require('../../index');

describe('@jsdoc/core', () => {
    it('is an object', () => {
        expect(core).toBeObject();
    });

    describe('cast', () => {
        it('is lib/cast', () => {
            const cast = require('../../lib/cast');

            expect(core.cast).toBe(cast);
        });
    });

    describe('config', () => {
        it('is lib/config', () => {
            const config = require('../../lib/config');

            expect(core.config).toBe(config);
        });
    });

    describe('fs', () => {
        it('is lib/fs', () => {
            const fs = require('../../lib/fs');

            expect(core.fs).toBe(fs);
        });
    });
});
