describe('documenting symbols with special names', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/specialnames.js');
    const construct = docSet.getByLongname('constructor')[0];
    const constructToString = docSet.getByLongname('constructor.toString')[0];
    const hasOwnProp = docSet.getByLongname('hasOwnProperty')[0];
    const proto = docSet.getByLongname('prototype')[0];
    const protoValueOf = docSet.getByLongname('prototype.valueOf')[0];

    it('When a symbol is named "constructor", the symbol should appear in the docs.', () => {
        expect(construct).toBeObject();
    });

    it('When a symbol is named "constructor", its members are resolved correctly.', () => {
        expect(constructToString).toBeObject();
    });

    it('When a symbol is named "hasOwnProperty," the symbol should appear in the docs.', () => {
        expect(hasOwnProp).toBeObject();
    });

    it('When a symbol is named "prototype", the symbol should appear in the docs.', () => {
        expect(proto).toBeObject();
    });

    it('When a symbol is named "prototype", its members are resolved correctly.', () => {
        expect(protoValueOf).toBeObject();
    });
});
