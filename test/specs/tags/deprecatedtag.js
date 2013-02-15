describe("@deprecated tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/deprecatedtag.js'),
        foo = docSet.getByLongname('foo')[0],
        bar = docSet.getByLongname('bar')[0];

    it('When a symbol has a @deprecated tag with no value, the doclet has a deprecated property set to true.', function() {
        expect(foo.deprecated).toBe(true);
    });

    it('When a symbol has a @deprecated tag with a value, the doclet has a deprecated property set to that value.', function() {
        expect(bar.deprecated).toBe('since version 2.0');
    });

});