/*global describe: true, expect: true, it: true, jasmine: true */
describe("@requires tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/requirestag.js');
    var foo = docSet.getByLongname('foo')[0];
    var bar = docSet.getByLongname('bar')[0];
    var baz = docSet.getByLongname('baz')[0];

    it('When a symbol has a @requires tag, the doclet has a requires property that includes that value, with the "module:" namespace added.', function() {
        expect( Array.isArray(foo.requires) ).toBe(true);
        expect(foo.requires[0]).toBe('module:foo/helper');

        expect( Array.isArray(bar.requires) ).toBe(true);
        expect(bar.requires[0]).toBe('module:foo');
        expect(bar.requires[1]).toBe('module:Pez#blat');
    });

    it('When a symbol has a @requires tag whose value is an inline {@link} tag, the doclet has a requires property that includes that tag without modification.', function() {
        expect( Array.isArray(baz.requires) ).toBe(true);
        expect(baz.requires[0]).toBe('{@link module:zest}');
        expect(baz.requires[1]).toBe('{@linkplain module:zing}');
        // by design, we don't validate the tag name, as long as it starts with @link
        expect(baz.requires[2]).toBe('{@linkstupid module:pizzazz}');
    });
});
