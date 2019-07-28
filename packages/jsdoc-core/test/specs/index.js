const config = require('../../lib/config');
const core = require('../../index');

describe('@jsdoc/core', () => {
    it('exists', () => {
        expect(core).toBeObject();
    });

    describe('config', () => {
        it('is lib/config', () => {
            expect(core.config).toBe(config);
        });
    });
});
