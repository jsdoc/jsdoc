describe('@jsdoc/util', () => {
    const util = require('../..');

    it('is an object', () => {
        expect(util).toBeObject();
    });

    it('has a cast method', () => {
        expect(util.cast).toBeFunction();
    });

    it('has an fs object', () => {
        expect(util.fs).toBeObject();
    });

    it('has a path object', () => {
        expect(util.path).toBeObject();
    });

    describe('cast', () => {
        it('is ./lib/cast', () => {
            const cast = require('../../lib/cast');

            expect(util.cast).toBe(cast);
        });
    });

    describe('fs', () => {
        it('is ./lib/fs', () => {
            const fs = require('../../lib/fs');

            expect(util.fs).toBe(fs);
        });
    });

    describe('path', () => {
        it('is ./lib/path', () => {
            const path = require('../../lib/path');

            expect(util.path).toBe(path);
        });
    });
});
