'use strict';

describe('When a getter or setter is the child of an object literal', function () {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/getset.js');
    var foundName = docSet.getByLongname('Person#name');
    var foundAge = docSet.getByLongname('Person#age');

    it('should have a doclet with the correct longname', function () {
        expect(foundName.length).toBe(2);
        expect(foundAge.length).toBe(1);
    });

    it('should have a doclet with the correct name', function () {
        expect(foundName[0].name).toBe('name');
        expect(foundName[1].name).toBe('name');
        expect(foundAge[0].name).toBe('age');
    });

    it('should have the correct memberof', function () {
        expect(foundName[0].memberof).toBe('Person');
        expect(foundName[1].memberof).toBe('Person');
        expect(foundAge[0].memberof).toBe('Person');
    });
});
