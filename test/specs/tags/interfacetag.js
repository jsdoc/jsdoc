'use strict';

describe('@interface tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/interface-implements.js');

    var testerInterface = docSet.getByLongname('ITester')[0];
    var testerImplementation = docSet.getByLongname('MyTester')[0];

    it('ITester has its kind set to "interface"', function() {
        expect(testerInterface.kind).toBe('interface');
    });

    it('MyTester class has its kind set to "class" (not "interface")', function() {
        expect(testerImplementation.kind).toBe('class');
    });
});
