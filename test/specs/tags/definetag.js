describe('@define tag', () => {
    const logger = require('@jsdoc/logger');

    describe('JSDoc tags', () => {
        const env = require('jsdoc/env');

        const allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);

        afterEach(() => {
            jasmine.restoreTagDictionary();
            env.conf.tags.allowUnknownTags = allowUnknownTags;
        });

        it('should not recognize the @define tag', () => {
            env.conf.tags.allowUnknownTags = false;
            jasmine.replaceTagDictionary('jsdoc');
            spyOn(logger, 'error');

            jasmine.getDocSetFromFile('test/fixtures/definetag.js');

            expect(logger.error).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jasmine.replaceTagDictionary('closure');
        });

        afterEach(() => {
            jasmine.restoreTagDictionary();
        });

        it('should recognize the @define tag', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/definetag.js');
            const enableDebug = docSet.getByLongname('ENABLE_DEBUG')[0];

            expect(enableDebug.kind).toBe('constant');
            expect(enableDebug.type).toBeDefined();
            expect(enableDebug.type.names[0]).toBe('boolean');
        });
    });
});
