'use strict';

describe('@implements tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/interface-implements.js');

    var myTester = docSet.getByLongname('MyTester')[0];
    var myIncompleteWorker = docSet.getByLongname('MyWorker')[0];
    var beforeEachMethod = docSet.getByLongname('MyTester#beforeEach')[0];
    var itMethod = docSet.getByLongname('MyTester#it').filter(function($) {
        return !$.undocumented;
    })[0];
    var processMethod = docSet.getByLongname('MyWorker#process')[0];

    it('MyTester has an "implements" array', function() {
        expect(Array.isArray(myTester.implements)).toBe(true);
        expect(myTester.implements.length).toBe(1);
        expect(myTester.implements[0]).toBe('ITester');
    });

    it('beforeEach has an "implements" array', function() {
        expect(Array.isArray(beforeEachMethod.implements)).toBe(true);
        expect(beforeEachMethod.implements.length).toBe(1);
        expect(beforeEachMethod.implements[0]).toBe('ITester#beforeEach');
    });

    it('MyTester#it inherits the docs from ITester#it', function() {
        expect(itMethod.description).toBe('it method.');
    });

    it('MyWorker\'s process() method does not implement an interface', function() {
        expect(processMethod.implements).toBeUndefined();
    });

    it('MyIncompleteWorker does not have any methods', function() {
        expect(docSet.getByLongname('MyIncompleteWorker#work').length).toBe(0);
    });
});
