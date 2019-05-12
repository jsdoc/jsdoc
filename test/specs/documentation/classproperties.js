describe('class properties', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/classproperties.js');
    const b = docSet.getByLongname('A#b')[0];
    const c = docSet.getByLongname('A#c')[0];
    const d = docSet.getByLongname('A#d')[0];

    it('should assign the correct name, memberof, and scope to class properties', () => {
        expect(b.name).toBe('b');
        expect(b.memberof).toBe('A');
        expect(b.scope).toBe('instance');
    });

    it('should assign the correct name, memberof, scope, and access type to class private ' +
        'properties', () => {
        expect(c.name).toBe('c');
        expect(c.memberof).toBe('A');
        expect(c.scope).toBe('instance');
        expect(c.access).toBe('private');
    });

    it('should assign the correct name, memberof, and scope to class properties with no value ' +
        'assigned', () => {
        expect(d.name).toBe('d');
        expect(d.memberof).toBe('A');
        expect(d.scope).toBe('instance');
    });
});
