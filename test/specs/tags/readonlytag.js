/* global jsdoc */
describe('@readonly tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/readonlytag.js');
    const length = docSet.getByLongname('Collection#length')[0];

    it('When a symbol has an @readonly tag, the doclet has an readonly property that is true.', () => {
        expect(length.readonly).toBe(true);
    });
});
