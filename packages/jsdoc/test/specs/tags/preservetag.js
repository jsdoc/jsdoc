describe('@preserve tag', () => {
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

        it('should not recognize the @preserve tag', () => {
            function getDocSet() {
                jsdoc.getDocSetFromFile('test/fixtures/preservetag.js');
            }

            expect(jsdoc.didLog(getDocSet, 'error')).toBeTrue();
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('closure');
        });

        it('should set the doclet\'s `license` property to the tag value', () => {
            const docSet = jsdoc.getDocSetFromFile('test/fixtures/preservetag.js');
            const x = docSet.getByLongname('x')[0];

            expect(x.license).toBe('My cool license goes here.');
        });
    });
});
