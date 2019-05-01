describe('jsdoc/util/stripbom', () => {
    const stripBom = require('../../../lib/jsdoc/util/stripbom');

    it('should exist', () => {
        expect(typeof stripBom).toBe('object');
    });

    it('should export a "strip" method', () => {
        expect(typeof stripBom.strip).toBe('function');
    });

    describe('strip', () => {
        it('should strip the leading BOM when present', () => {
            const result = stripBom.strip('\uFEFFHello there!');

            expect(result).toBe('Hello there!');
        });

        it('should not change the text when no leading BOM is present', () => {
            const result = stripBom.strip('Hello there!');

            expect(result).toBe('Hello there!');
        });

        it('should return an empty string when the text is null or undefined', () => {
            expect(stripBom.strip()).toBe('');
        });
    });
});
