/*global describe, expect, it, jasmine */
'use strict';

describe('@interface tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/interface-implements.js');

    var myTester = docSet.getByLongname('MyTester')[0];
    var beforeEachMethod = docSet.getByLongname('MyTester#beforeEach')[0];
    var processMethod = docSet.getByLongname('MyWorker#process')[0];

    it('MyTester has an "implements" array', function() {
        expect(Array.isArray(myTester.implements)).toBe(true);
        expect(myTester.implements.length).toBe(1);
        expect(myTester.implements[0]).toEqual('ITester');
    });

    it('beforeEach has "implemented" and "implementProp" property', function() {
        expect(beforeEachMethod.implemented).toBeDefined();
        expect(beforeEachMethod.implementProp).toBeDefined();
    });

    it('MyWorker\'s process() method does not implement an interface', function() {
        expect(processMethod.implements).toBeUndefined();
    });
});
