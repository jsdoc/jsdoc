const logger = require('../../../lib/jsdoc/util/logger');

describe('@private tag', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/privatetag.js');
    const foo = docSet.getByLongname('Foo')[0];
    const bar = docSet.getByLongname('Foo#bar')[0];

    it('When a symbol has a @private tag, the doclet has an `access` property set to `private`.',
        () => {
            expect(foo.access).toBe('private');
        });

    it('When a symbol tagged with @private has members, the members do not inherit the @private ' +
        'tag.', () => {
        expect(bar.access).not.toBeDefined();
    });

    describe('JSDoc tags', () => {
        afterEach(() => {
            jasmine.restoreTagDictionary();
        });

        it('When JSDoc tags are enabled, the @private tag does not accept a value.', () => {
            jasmine.replaceTagDictionary('jsdoc');
            spyOn(logger, 'warn');

            jasmine.getDocSetFromFile('test/fixtures/privatetag2.js');

            expect(logger.warn).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', () => {
        afterEach(() => {
            jasmine.restoreTagDictionary();
        });

        it('When Closure Compiler tags are enabled, the @private tag accepts a type expression.',
            () => {
                let connectionPorts;
                let privateDocs;

                jasmine.replaceTagDictionary('closure');
                spyOn(logger, 'warn');

                privateDocs = jasmine.getDocSetFromFile('test/fixtures/privatetag2.js');
                connectionPorts = privateDocs.getByLongname('connectionPorts')[0];

                expect(logger.warn).not.toHaveBeenCalled();

                expect(connectionPorts).toBeDefined();
                expect(connectionPorts.access).toBe('private');

                expect(connectionPorts.type).toBeDefined();
                expect(connectionPorts.type.names).toBeDefined();
                expect(connectionPorts.type.names.length).toBe(1);
                expect(connectionPorts.type.names[0]).toBe('Object.<string, number>');
            });
    });
});
