'use strict';

describe('class properties', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/classproperties.js');
    var b = docSet.getByLongname('A#b')[0];
    var c = docSet.getByLongname('A#c')[0];
    var d = docSet.getByLongname('A#d')[0];

    it('should assign the correct name, memberof, and scope to class properties', function() {
        expect(b.name).toBe('b');
        expect(b.memberof).toBe('A');
        expect(b.scope).toBe('instance');
    });

    it('should assign the correct name, memberof, scope, and access type to class private ' +
        'properties', function() {
        expect(c.name).toBe('c');
        expect(c.memberof).toBe('A');
        expect(c.scope).toBe('instance');
        expect(c.access).toBe('private');
    });

    it('should assign the correct name, memberof, and scope to class properties with no value ' +
        'assigned', function() {
        expect(d.name).toBe('d');
        expect(d.memberof).toBe('A');
        expect(d.scope).toBe('instance');
    });
});
