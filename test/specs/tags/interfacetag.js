describe('@interface tag', () => {
    const logger = require('jsdoc/util/logger');

    const docSet = jasmine.getDocSetFromFile('test/fixtures/interface-implements.js');
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
            jasmine.restoreTagDictionary();
        });

        it('should support virtual doclets with the JSDoc tag dictionary', () => {
            let docSet2;
            let virtualInterface;

            jasmine.replaceTagDictionary('jsdoc');

            docSet2 = jasmine.getDocSetFromFile('test/fixtures/interfacetag2.js');
            virtualInterface = docSet2.getByLongname('VirtualInterface')[0];

            expect(logger.warn).not.toHaveBeenCalled();
            expect(virtualInterface).toBeDefined();
            expect(virtualInterface.longname).toBe('VirtualInterface');
        });

        it('should not support virtual doclets with the Closure tag dictionary', () => {
            let docSet2;
            let virtualInterface;

            jasmine.replaceTagDictionary('closure');

            docSet2 = jasmine.getDocSetFromFile('test/fixtures/interfacetag2.js');
            virtualInterface = docSet2.getByLongname('VirtualInterface')[0];

            expect(logger.warn).toHaveBeenCalled();
            expect(virtualInterface).not.toBeDefined();
        });
    });

    describe('Closure Compiler tags', () => {
        afterEach(() => {
            jasmine.restoreTagDictionary();
        });

        it('should support @record as a synonym for @interface', () => {
            let docSet2;
            let myStructuralInterface;

            jasmine.replaceTagDictionary('closure');

            docSet2 = jasmine.getDocSetFromFile('test/fixtures/interfacetag3.js');
            myStructuralInterface = docSet2.getByLongname('MyStructuralInterface')[0];

            expect(myStructuralInterface.kind).toBe('interface');
        });
    });
});
