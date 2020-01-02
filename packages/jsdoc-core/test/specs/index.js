const core = require('../../index');

describe('@jsdoc/core', () => {
    it('is an object', () => {
        expect(core).toBeObject();
    });

    describe('config', () => {
        it('is lib/config', () => {
            const config = require('../../lib/config');

            expect(core.config).toBe(config);
        });
    });

    describe('name', () => {
        it('is lib/name', () => {
            const name = require('../../lib/name');

            expect(core.name).toBe(name);
        });
    });
});
