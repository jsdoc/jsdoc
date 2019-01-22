/* global jsdoc */
describe('documenting symbols with special names', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/specialnames.js');
    const construct = docSet.getByLongname('constructor')[0];
    const constructToString = docSet.getByLongname('constructor.toString')[0];
    const hasOwnProp = docSet.getByLongname('hasOwnProperty')[0];
    const proto = docSet.getByLongname('prototype')[0];
    const protoValueOf = docSet.getByLongname('prototype.valueOf')[0];

    it('When a symbol is named "constructor", the symbol should appear in the docs.', () => {
        expect(construct).toBeDefined();
    });

    it('When a symbol is named "constructor", its members are resolved correctly.', () => {
        expect(constructToString).toBeDefined();
    });

    it('When a symbol is named "hasOwnProperty," the symbol should appear in the docs.', () => {
        expect(hasOwnProp).toBeDefined();
    });

    it('When a symbol is named "prototype", the symbol should appear in the docs.', () => {
        expect(proto).toBeDefined();
    });

    it('When a symbol is named "prototype", its members are resolved correctly.', () => {
        expect(protoValueOf).toBeDefined();
    });
});
