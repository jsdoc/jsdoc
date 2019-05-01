describe('@preserve tag', () => {
    const env = require('../../../lib/jsdoc/env');
    const logger = require('../../../lib/jsdoc/util/logger');

    const allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);

    beforeEach(() => {
        env.conf.tags.allowUnknownTags = false;
        spyOn(logger, 'error');
    });

    afterEach(() => {
        jasmine.restoreTagDictionary();
        env.conf.tags.allowUnknownTags = allowUnknownTags;
    });

    describe('JSDoc tags', () => {
        beforeEach(() => {
            jasmine.replaceTagDictionary('jsdoc');
        });

        it('should not recognize the @preserve tag', () => {
            jasmine.getDocSetFromFile('test/fixtures/preservetag.js');

            expect(logger.error).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jasmine.replaceTagDictionary('closure');
        });

        it('should set the doclet\'s `license` property to the tag value', () => {
            const docSet = jasmine.getDocSetFromFile('test/fixtures/preservetag.js');
            const x = docSet.getByLongname('x')[0];

            expect(x.license).toBe('My cool license goes here.');
        });
    });
});
