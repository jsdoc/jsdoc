const tag = require('../../index');

describe('@jsdoc/tag', () => {
    it('is an object', () => {
        expect(tag).toBeObject();
    });

    describe('inline', () => {
        it('is lib/inline', () => {
            const inline = require('../../lib/inline');

            expect(tag.inline).toBe(inline);
        });
    });

    describe('type', () => {
        it('is lib/type', () => {
            const type = require('../../lib/type');

            expect(tag.type).toBe(type);
        });
    });
});
