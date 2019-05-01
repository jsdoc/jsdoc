const env = require('../../../lib/jsdoc/env');

describe('multiple doclets per symbol', () => {
    function undocumented($) {
        return !($.undocumented);
    }

    function checkInequality(doclets, property) {
        for (let l = doclets.length - 1; l > 0; l--) {
            if (doclets[l][property] !== undefined && doclets[l - 1][property] !== undefined) {
                expect(doclets[l][property]).not.toBe(doclets[l - 1][property]);
            }
        }
    }

    const docSet = jasmine.getDocSetFromFile('test/fixtures/also.js');
    const name = docSet.getByLongname('Asset#name').filter(undocumented);
    const shape = docSet.getByLongname('Asset#shape').filter(undocumented);

    it('When a symbol has multiple adjacent JSDoc comments, both apply to the symbol.', () => {
        expect(name.length).toBe(2);
        expect(shape.length).toBe(3);
    });

    it('When a symbol has multiple adjacent JSDoc comments that are not identical, the doclets ' +
        'have different comments.', () => {
        checkInequality(name, 'comment');
        checkInequality(shape, 'comment');
    });

    it('When a symbol has multiple adjacent JSDoc comments with different descriptions, ' +
        'the doclets have different descriptions.', () => {
        checkInequality(name, 'description');
        checkInequality(shape, 'description');
    });

    it('When a symbol has multiple adjacent JSDoc comments with different numbers of ' +
        '@param tags, the doclets have different parameter lists.', () => {
        checkInequality(name, 'params.length');
        checkInequality(shape, 'params.length');
    });

    it('When a symbol has multiple adjacent JSDoc comments with different numbers of ' +
        '@returns tags, the doclets have different lists of return values.', () => {
        checkInequality(name, 'returns.length');
        checkInequality(shape, 'returns.length');
    });

    it('When a file contains a JSDoc comment with an @also tag, and the "tags.allowUnknownTags" ' +
        'option is set to false, the file can be parsed without errors.', () => {
        const logger = require('../../../lib/jsdoc/util/logger');

        const allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);
        const errors = [];

        function errorListener(err) {
            errors.push(err);
        }

        logger.addListener('logger:error', errorListener);
        env.conf.tags.allowUnknownTags = false;

        jasmine.getDocSetFromFile('test/fixtures/also2.js');
        expect(errors[0]).not.toBeDefined();

        logger.removeListener('logger:error', errorListener);
        env.conf.tags.allowUnknownTags = allowUnknownTags;
    });
});
