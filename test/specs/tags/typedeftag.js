describe("@typedef tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/typedeftag.js'),
        numberlike = docSet.getByLongname('calc.NumberLike')[0];

    it('When a symbol has an @typedef tag, the doclet has a kind property set to "typedef".', function() {
        expect(numberlike.kind).toBe('typedef');
    });

    it('When a symbol has an @typedef tag with a type, the doclet has a type property set to that type.', function() {
        expect(typeof numberlike.type).toBe('object');
        expect(typeof numberlike.type.names).toBe('object');
        expect(numberlike.type.names.length).toBe(2);
        expect(numberlike.type.names[0]).toBe('string');
        expect(numberlike.type.names[1]).toBe('number');
    });

    it('When a symbol has an @typedef tag with a name, the doclet has a name property set to that name.', function() {
        expect(numberlike.name).toBe('NumberLike');
        expect(numberlike.longname).toBe('calc.NumberLike');
    });
});