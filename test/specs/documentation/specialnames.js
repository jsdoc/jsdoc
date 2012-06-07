describe("documenting symbols with special names", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/specialnames.js'),
        name = docSet.getByLongname('hasOwnProperty').filter(function($) {
            return ! $.undocumented;
        });

    it('When a symbol has the documented name of "hasOwnProperty," JSDoc should correctly include it in the docs.', function() {
        expect(name.length).toEqual(1);
    });
});