const env = require('jsdoc/env');

describe('multiple doclets per symbol', () => {
    function undocumented($) {
        return !($.undocumented);
    }

    const docSet = jsdoc.getDocSetFromFile('test/fixtures/also.js');
    const name = docSet.getByLongname('Asset#name').filter(undocumented);
    const shape = docSet.getByLongname('Asset#shape').filter(undocumented);

    it('When a symbol has multiple adjacent JSDoc comments, both apply to the symbol.', () => {
        expect(name).toBeArrayOfSize(2);
        expect(shape).toBeArrayOfSize(3);
    });

    it('When a symbol has multiple adjacent JSDoc comments that are not identical, the doclets ' +
        'have different comments.', () => {
        expect(name[0].comment).not.toBe(name[1].comment);
        expect(shape[0].comment).not.toBe(shape[1].comment);
        expect(shape[1].comment).not.toBe(shape[2].comment);
    });

    it('When a symbol has multiple adjacent JSDoc comments with different descriptions, ' +
        'the doclets have different descriptions.', () => {
        expect(name[0].description).not.toBe(name[1].description);
        expect(shape[0].description).not.toBe(shape[1].description);
        expect(shape[1].description).not.toBe(shape[2].description);
    });

    it('When a symbol has multiple adjacent JSDoc comments with different numbers of ' +
        '@param tags, the doclets have different parameter lists.', () => {
        expect(name[0].params).not.toEqual(name[1].params);
        expect(shape[0].params).not.toEqual(shape[1].params);
        expect(shape[1].params).not.toEqual(shape[2].params);
    });

    it('When a symbol has multiple adjacent JSDoc comments with different numbers of ' +
        '@returns tags, the doclets have different lists of return values.', () => {
        expect(name[0].returns).not.toEqual(name[1].returns);
        // Neither shape[0] nor shape[1] returns a value.
        expect(shape[0].returns).toBeUndefined();
        expect(shape[1].returns).toBeUndefined();
        expect(shape[2].returns).toBeArray();
    });

    it('When a file contains a JSDoc comment with an @also tag, and the "tags.allowUnknownTags" ' +
        'option is set to false, the file can be parsed without errors.', () => {
        const allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);

        function getDocSet() {
            env.conf.tags.allowUnknownTags = false;
            jsdoc.getDocSetFromFile('test/fixtures/also2.js');
            env.conf.tags.allowUnknownTags = allowUnknownTags;
        }

        expect(jsdoc.didLog(getDocSet, 'error')).toBeFalse();
    });
});
