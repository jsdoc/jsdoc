describe('@interface tag', () => {
    const logger = require('jsdoc/util/logger');

    const docSet = jsdoc.getDocSetFromFile('test/fixtures/interface-implements.js');
    const testerInterface = docSet.getByLongname('ITester')[0];
    const testerImplementation = docSet.getByLongname('MyTester')[0];

    it('ITester has its kind set to "interface"', () => {
        expect(testerInterface.kind).toBe('interface');
    });

    it('MyTester class has its kind set to "class" (not "interface")', () => {
        expect(testerImplementation.kind).toBe('class');
    });

    describe('virtual doclets', () => {
        beforeEach(() => {
            spyOn(logger, 'warn');
        });

        afterEach(() => {
            jsdoc.restoreTagDictionary();
        });

        it('should support virtual doclets with the JSDoc tag dictionary', () => {
            let docSet2;
            let virtualInterface;

            jsdoc.replaceTagDictionary('jsdoc');

            docSet2 = jsdoc.getDocSetFromFile('test/fixtures/interfacetag2.js');
            virtualInterface = docSet2.getByLongname('VirtualInterface')[0];

            expect(logger.warn).not.toHaveBeenCalled();
            expect(virtualInterface).toBeObject();
            expect(virtualInterface.longname).toBe('VirtualInterface');
        });

        it('should not support virtual doclets with the Closure tag dictionary', () => {
            let docSet2;
            let virtualInterface;

            jsdoc.replaceTagDictionary('closure');

            docSet2 = jsdoc.getDocSetFromFile('test/fixtures/interfacetag2.js');
            virtualInterface = docSet2.getByLongname('VirtualInterface')[0];

            expect(logger.warn).toHaveBeenCalled();
            expect(virtualInterface).toBeUndefined();
        });
    });

    describe('Closure Compiler tags', () => {
        afterEach(() => {
            jsdoc.restoreTagDictionary();
        });

        it('should support @record as a synonym for @interface', () => {
            let docSet2;
            let myStructuralInterface;

            jsdoc.replaceTagDictionary('closure');

            docSet2 = jsdoc.getDocSetFromFile('test/fixtures/interfacetag3.js');
            myStructuralInterface = docSet2.getByLongname('MyStructuralInterface')[0];

            expect(myStructuralInterface.kind).toBe('interface');
        });
    });
});
