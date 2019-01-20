const logger = require('@jsdoc/logger');

describe('@type tag', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/typetag.js');

    it('When a symbol has a @type tag, the doclet has a type property set to that value\'s type.', () => {
        const foo = docSet.getByLongname('foo')[0];

        expect(typeof foo.type).toBe('object');
        expect(typeof foo.type.names).toBe('object');
        expect(foo.type.names.join(', ')).toBe('string, Array.<string>');
    });

    it('When a symbol has a @type tag set to a plain string, the doclet has a type property set to that value\'s type.', () => {
        const bar = docSet.getByLongname('bar')[0];

        expect(bar.type.names.join(', ')).toBe('integer');
    });

    it('When a symbol has a @type tag for a non-nullable type, the doclet indicates that the type is non-nullable', () => {
        const baz = docSet.getByLongname('baz')[0];

        expect(baz.nullable).toBe(false);
    });

    describe('JSDoc tags', () => {
        afterEach(() => {
            jasmine.restoreTagDictionary();
        });

        it('When JSDoc tags are enabled, the @type tag does not accept a description.', () => {
            jasmine.replaceTagDictionary('jsdoc');
            spyOn(logger, 'warn');

            jasmine.getDocSetFromFile('test/fixtures/typetag2.js');

            expect(logger.warn).toHaveBeenCalled();
        });
    });

    describe('Closure tags', () => {
        afterEach(() => {
            jasmine.restoreTagDictionary();
        });

        it('When Closure tags are enabled, the @type tag accepts a description.', () => {
            let stringOrNumber;
            let typeDocs;

            jasmine.replaceTagDictionary('closure');
            spyOn(logger, 'warn');

            typeDocs = jasmine.getDocSetFromFile('test/fixtures/typetag2.js');
            stringOrNumber = typeDocs.getByLongname('stringOrNumber')[0];

            expect(logger.warn).not.toHaveBeenCalled();

            expect(stringOrNumber).toBeDefined();
            expect(stringOrNumber.description).toBe('A string or a number.');
        });
    });
});
