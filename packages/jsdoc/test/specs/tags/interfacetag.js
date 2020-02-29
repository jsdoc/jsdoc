describe('@interface tag', () => {
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
        afterEach(() => {
            jsdoc.restoreTagDictionary();
        });

        it('should support virtual doclets with the JSDoc tag dictionary', () => {
            let docSet2;
            let virtualInterface;

            function getDocSet() {
                jsdoc.replaceTagDictionary('jsdoc');

                return jsdoc.getDocSetFromFile('test/fixtures/interfacetag2.js');
            }

            expect(jsdoc.didLog(getDocSet, 'warn')).toBeFalse();

            docSet2 = getDocSet();
            virtualInterface = docSet2.getByLongname('VirtualInterface')[0];

            expect(virtualInterface).toBeObject();
            expect(virtualInterface.longname).toBe('VirtualInterface');
        });

        it('should not support virtual doclets with the Closure tag dictionary', () => {
            let docSet2;
            let virtualInterface;

            function getDocSet() {
                jsdoc.replaceTagDictionary('closure');

                return jsdoc.getDocSetFromFile('test/fixtures/interfacetag2.js');
            }

            expect(jsdoc.didLog(getDocSet, 'warn')).toBeTrue();

            docSet2 = getDocSet();
            virtualInterface = docSet2.getByLongname('VirtualInterface')[0];

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
