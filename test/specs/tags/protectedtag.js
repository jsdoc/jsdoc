const logger = require('../../../lib/jsdoc/util/logger');

describe('@protected tag', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/protectedtag.js');
    const uidCounter = docSet.getByLongname('module:uid~uidCounter')[0];
    const uidRoot = docSet.getByLongname('module:uid~uidObjects.root')[0];

    it('When a symbol has a @protected tag, the doclet has an `access` property set to ' +
        '`protected`.', () => {
        expect(uidCounter.access).toBe('protected');
    });

    it('When a symbol tagged with @protected has members, the members do not inherit the ' +
        '@protected tag.', () => {
        expect(uidRoot.access).not.toBeDefined();
    });

    describe('JSDoc tags', () => {
        afterEach(() => {
            jasmine.restoreTagDictionary();
        });

        it('When JSDoc tags are enabled, the @protected tag does not accept a value.', () => {
            jasmine.replaceTagDictionary('jsdoc');
            spyOn(logger, 'warn');

            jasmine.getDocSetFromFile('test/fixtures/protectedtag2.js');

            expect(logger.warn).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', () => {
        afterEach(() => {
            jasmine.restoreTagDictionary();
        });

        it('When Closure Compiler tags are enabled, the @private tag accepts a type expression.',
            () => {
                let counter;
                let protectedDocs;

                jasmine.replaceTagDictionary('closure');
                spyOn(logger, 'warn');

                protectedDocs = jasmine.getDocSetFromFile('test/fixtures/protectedtag2.js');
                counter = protectedDocs.getByLongname('uidCounter')[0];

                expect(logger.warn).not.toHaveBeenCalled();

                expect(counter).toBeDefined();
                expect(counter.access).toBe('protected');

                expect(counter.type).toBeDefined();
                expect(counter.type.names).toBeDefined();
                expect(counter.type.names.length).toBe(1);
                expect(counter.type.names[0]).toBe('number');
            });
    });
});
