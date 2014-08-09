describe('@interface tag', function() {
    var docSet = jasmine.getDocSetFromFile("test/fixtures/interface-implements.js");

    var foundInterface = docSet.getByLongname('ITester');

    it('ITester has "interface" value in "kind"', function() {
        expect(foundInterface[0].kind).toBe('interface');
    });

});