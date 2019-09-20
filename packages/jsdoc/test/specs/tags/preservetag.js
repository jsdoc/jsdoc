describe('@preserve tag', () => {
    const env = require('jsdoc/env');
    const logger = require('jsdoc/util/logger');

    const allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);

    beforeEach(() => {
        env.conf.tags.allowUnknownTags = false;
        spyOn(logger, 'error');
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
            jsdoc.getDocSetFromFile('test/fixtures/preservetag.js');

            expect(logger.error).toHaveBeenCalled();
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
