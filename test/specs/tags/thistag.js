describe("@this tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/thistag.js'),
        setName = docSet.getByLongname('setName')[0],
        fooName = docSet.getByLongname('Foo#name')[0];

    it('When a symbol has a @this tag, the doclet has a this property that is set to that value.', function() {
        expect(setName['this']).toBe('Foo');
    });

    it('When a this symbol is documented inside a function with a @this tag, the symbol is documented as a member of that tags value.', function() {
        expect(typeof fooName).toBe('object');
        expect(fooName.name).toBe('name');
        expect(fooName.memberof).toBe('Foo');
        expect(fooName.scope).toBe('instance');
    });
});