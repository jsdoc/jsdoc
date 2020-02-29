describe('@protected tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/protectedtag.js');
    const uidCounter = docSet.getByLongname('module:uid~uidCounter')[0];
    const uidRoot = docSet.getByLongname('module:uid~uidObjects.root')[0];

    it('When a symbol has a @protected tag, the doclet has an `access` property set to ' +
        '`protected`.', () => {
        expect(uidCounter.access).toBe('protected');
    });

    it('When a symbol tagged with @protected has members, the members do not inherit the ' +
        '@protected tag.', () => {
        expect(uidRoot.access).toBeUndefined();
    });

    describe('JSDoc tags', () => {
        afterEach(() => {
            jsdoc.restoreTagDictionary();
        });

        it('When JSDoc tags are enabled, the @protected tag does not accept a value.', () => {
            function getDocSet() {
                jsdoc.replaceTagDictionary('jsdoc');
                jsdoc.getDocSetFromFile('test/fixtures/protectedtag2.js');
            }

            expect(jsdoc.didLog(getDocSet, 'warn')).toBeTrue();
        });
    });

    describe('Closure Compiler tags', () => {
        afterEach(() => {
            jsdoc.restoreTagDictionary();
        });

        it('When Closure Compiler tags are enabled, the @private tag accepts a type expression.',
            () => {
                function getDocSet() {
                    jsdoc.replaceTagDictionary('closure');
                    jsdoc.getDocSetFromFile('test/fixtures/protectedtag2.js');
                }

                expect(jsdoc.didLog(getDocSet, 'warn')).toBeFalse();
            });

        it('When Closure Compiler tags are enabled, the @private tag parses the type expression.',
            () => {
                let counter;
                let protectedDocs;

                jsdoc.replaceTagDictionary('closure');

                protectedDocs = jsdoc.getDocSetFromFile('test/fixtures/protectedtag2.js');
                counter = protectedDocs.getByLongname('uidCounter')[0];

                expect(counter).toBeObject();
                expect(counter.access).toBe('protected');

                expect(counter.type).toBeObject();
                expect(counter.type.names).toBeArrayOfSize(1);
                expect(counter.type.names[0]).toBe('number');
            });
    });
});
