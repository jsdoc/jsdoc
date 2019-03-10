const logger = require('jsdoc/util/logger');

describe('@package tag', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/packagetag.js');
    const foo = docSet.getByLongname('foo')[0];

    it('When a symbol has a @package tag, the doclet has an `access` property set to `package`.',
        () => {
            expect(foo.access).toBe('package');
        });

    describe('JSDoc tags', () => {
        afterEach(() => {
            jasmine.restoreTagDictionary();
        });

        it('When JSDoc tags are enabled, the @package tag does not accept a value.', () => {
            jasmine.replaceTagDictionary('jsdoc');
            spyOn(logger, 'warn');

            jasmine.getDocSetFromFile('test/fixtures/packagetag2.js');

            expect(logger.warn).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', () => {
        afterEach(() => {
            jasmine.restoreTagDictionary();
        });

        it('When Closure Compiler tags are enabled, the @package tag accepts a type expression.',
            () => {
                let connectionPorts;
                let privateDocs;

                jasmine.replaceTagDictionary('closure');
                spyOn(logger, 'warn');

                privateDocs = jasmine.getDocSetFromFile('test/fixtures/packagetag2.js');
                connectionPorts = privateDocs.getByLongname('connectionPorts')[0];

                expect(logger.warn).not.toHaveBeenCalled();

                expect(connectionPorts).toBeDefined();
                expect(connectionPorts.access).toBe('package');

                expect(connectionPorts.type).toBeDefined();
                expect(connectionPorts.type.names).toBeDefined();
                expect(connectionPorts.type.names.length).toBe(1);
                expect(connectionPorts.type.names[0]).toBe('Object.<string, number>');
            });
    });
});
