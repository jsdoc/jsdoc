describe('@define tag', () => {
    const logger = require('jsdoc/util/logger');

    describe('JSDoc tags', () => {
        const env = require('jsdoc/env');

        const allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);

        afterEach(() => {
            jsdoc.restoreTagDictionary();
            env.conf.tags.allowUnknownTags = allowUnknownTags;
        });

        it('should not recognize the @define tag', () => {
            env.conf.tags.allowUnknownTags = false;
            jsdoc.replaceTagDictionary('jsdoc');
            spyOn(logger, 'error');

            jsdoc.getDocSetFromFile('test/fixtures/definetag.js');

            expect(logger.error).toHaveBeenCalled();
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
