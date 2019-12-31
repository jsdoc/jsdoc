const util = require('../../index');

describe('@jsdoc/util', () => {
    it('is an object', () => {
        expect(util).toBeObject();
    });

    describe('cast', () => {
        it('is lib/cast', () => {
            const cast = require('../../lib/cast');

            expect(util.cast).toBe(cast);
        });
    });

    describe('EventBus', () => {
        it('is lib/bus', () => {
            const bus = require('../../lib/bus');

            expect(util.EventBus).toBe(bus);
        });
    });

    describe('fs', () => {
        it('is lib/fs', () => {
            const fs = require('../../lib/fs');

            expect(util.fs).toBe(fs);
        });
    });
});
