describe("@constant tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/constanttag.js'),
        FOO = docSet.getByLongname('FOO')[0],
        BAR = docSet.getByLongname('BAR')[0],
        BAZ = docSet.getByLongname('BAZ')[0];

    it("sets the doclet's 'kind' property to 'constant'", function() {
        expect(FOO.kind).toBe('constant');
        expect(BAR.kind).toBe('constant');
        expect(BAZ.kind).toBe('constant');
    });

    it("If used as a standalone, takes the name from the code", function() {
        expect(FOO.name).toBe('FOO');
    });

    it("If used with just a name, sets the doclet's name to that", function() {
        expect(BAR.name).toBe('BAR');
    });

    it("If used with a name and a type, sets the doclet's name and type appropriately", function() {
        expect(BAZ.name).toBe('BAZ');
        expect(typeof BAZ.type).toBe('object');
        expect(BAZ.type.names).toBeDefined();
        expect(BAZ.type.names.length).toBe(1);
        expect(BAZ.type.names[0]).toBe('string');
    });
});
