describe('@define tag', () => {
    describe('JSDoc tags', () => {
        const env = require('jsdoc/env');

        const allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);

        afterEach(() => {
            jsdoc.restoreTagDictionary();
            env.conf.tags.allowUnknownTags = allowUnknownTags;
        });

        it('should not recognize the @define tag', () => {
            function getDocSet() {
                env.conf.tags.allowUnknownTags = false;
                jsdoc.replaceTagDictionary('jsdoc');
                jsdoc.getDocSetFromFile('test/fixtures/definetag.js');
            }

            expect(jsdoc.didLog(getDocSet, 'error')).toBeTrue();
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('closure');
        });

        afterEach(() => {
            jsdoc.restoreTagDictionary();
        });

        it('should recognize the @define tag', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/definetag.js');
            const enableDebug = docSet.getByLongname('ENABLE_DEBUG')[0];

            expect(enableDebug.kind).toBe('constant');
            expect(enableDebug.type).toBeObject();
            expect(enableDebug.type.names[0]).toBe('boolean');
        });
    });
});
