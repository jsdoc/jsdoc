const logger = require('jsdoc/util/logger');

describe('@ignore tag', () => {
    let docSet = jsdoc.getDocSetFromFile('test/fixtures/ignoretag.js');
    let foo = docSet.getByLongname('foo')[0];

    beforeEach(() => {
        spyOn(logger, 'warn');
    });

    it('When a symbol has an @ignore tag, the doclet has a ignore property set to true.', () => {
        expect(foo.ignore).toBe(true);
    });

    it('When a symbol has an @ignore tag with a value a warning is logged', () => {
        docSet = jsdoc.getDocSetFromFile('test/fixtures/ignoretag2.js');

        expect(logger.warn).toHaveBeenCalled();
    });
});
