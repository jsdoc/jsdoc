describe('@interface tag', function() {
    var docSet = jasmine.getDocSetFromFile("test/fixtures/interface-implements.js");

    var foundInterface = docSet.getByLongname('ITester');

    var foundClassImplementsInterface = docSet.getByLongname('MyTester');

    it('ITester has "interface" value in "kind"', function() {
        expect(foundInterface[0].kind).toBe('interface');
    });

    it('MyTester class has not "interface" value in "kind"', function() {
        expect(foundClassImplementsInterface[0].kind).not.toBe('interface');
    });

});