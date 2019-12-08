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

    describe('Engine', () => {
        it('is lib/engine', () => {
            const Engine = require('../../lib/engine');

            expect(core.Engine).toBe(Engine);
        });
    });

    describe('util', () => {
        it('is lib/util', () => {
            const util = require('../../lib/util');

            expect(core.util).toBe(util);
        });
    });
});
