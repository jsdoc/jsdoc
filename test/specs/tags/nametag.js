/* global jsdoc */
describe('@name tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/nametag.js');
    const view = docSet.getByLongname('View')[0];
    const controller = docSet.getByLongname('Controller')[0];
    const addToParent = docSet.getByLongname('MvcHelpers~addToParent')[0];

    it('applies the specified name to the doclet', () => {
        expect(view).toBeDefined();
    });

    it('uses the name in the @name tag, ignoring the name in the code', () => {
        expect(controller).toBeDefined();
    });

    it('sets the doclet\'s scope to `global` by default', () => {
        expect(view.scope).toBeDefined();
        expect(view.scope).toBe('global');

        expect(controller.scope).toBeDefined();
        expect(controller.scope).toBe('global');
    });

    it('uses the specified scope if one is provided', () => {
        expect(addToParent).toBeDefined();
        expect(addToParent.scope).toBe('inner');
    });
});
