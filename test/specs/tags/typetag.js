/*global describe, expect, it, jasmine */
describe('@type tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/typetag.js');

    it('When a symbol has a @type tag, the doclet has a type property set to that value\'s type.', function() {
        var foo = docSet.getByLongname('foo')[0];

        expect(typeof foo.type).toBe('object');
        expect(typeof foo.type.names).toBe('object');
        expect(foo.type.names.join(', ')).toBe('string, Array.<string>');
    });

    it('When a symbol has a @type tag set to a plain string, the doclet has a type property set to that value\'s type.', function() {
        var bar = docSet.getByLongname('bar')[0];

        expect(bar.type.names.join(', ')).toBe('integer');
    });

    it('When a symbol has a @type tag for a non-nullable type, the doclet indicates that the type is non-nullable', function() {
        var baz = docSet.getByLongname('baz')[0];

        expect(baz.nullable).toBe(false);
    });
});
