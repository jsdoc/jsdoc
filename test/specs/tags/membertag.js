describe('@member tag', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/membertag.js');
    const doc = docSet.getByLongname('x')[0];
    const doc2 = docSet.getByLongname('foobar')[0];
    const doc3 = docSet.getByLongname('baz')[0];
    const doc4 = docSet.getByLongname('y')[0];

    it("sets the doclet's 'kind' property to 'member'", () => {
        expect(doc.kind).toBe('member');
        expect(doc2.kind).toBe('member');
        expect(doc3.kind).toBe('member');
        expect(doc4.kind).toBe('member');
    });

    it("If specified with a name, sets the doclet's name property", () => {
        expect(doc.name).toBe('x');
        expect(doc2.name).toBe('foobar');
        expect(doc3.name).toBe('baz');
    });

    it("If specified with a type and name, sets the doclet's type appropriately", () => {
        expect(doc3.type).toBeDefined();
        expect(Array.isArray(doc3.type.names)).toBeTruthy();
        expect(doc3.type.names.length).toBe(1);
        expect(doc3.type.names[0]).toBe('string');
    });

    it("If specified with a type but no name, sets the doclet's name from the following JavaScript syntax", () => {
        expect(doc4.name).toBe('y');
    });

    it("If specified with a type but no name, sets the doclet's type appropriately", () => {
        expect(doc4.type).toBeDefined();
        expect(Array.isArray(doc4.type.names)).toBeTruthy();
        expect(doc4.type.names.length).toBe(1);
        expect(doc4.type.names[0]).toBe('Object');
    });
});
