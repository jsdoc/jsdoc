describe('@dict tag', () => {
    const env = require('jsdoc/env');

    const allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);

    beforeEach(() => {
        env.conf.tags.allowUnknownTags = false;
    });

    afterEach(() => {
        jsdoc.restoreTagDictionary();
        env.conf.tags.allowUnknownTags = allowUnknownTags;
    });

    describe('JSDoc tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('jsdoc');
        });

        it('should not recognize the @dict tag', () => {
            function getDocSet() {
                jsdoc.getDocSetFromFile('test/fixtures/dicttag.js');
            }

            expect(jsdoc.didLog(getDocSet, 'error')).toBeTrue();
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('closure');
        });

        it('should recognize the @dict tag', () => {
            function getDocSet() {
                jsdoc.getDocSetFromFile('test/fixtures/dicttag.js');
            }

            expect(jsdoc.didLog(getDocSet, 'error')).toBeFalse();
        });
    });
});
