describe('@constant tag', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/constanttag.js');
    const FOO = docSet.getByLongname('FOO')[0];
    const BAR = docSet.getByLongname('BAR')[0];
    const BAZ = docSet.getByLongname('BAZ')[0];
    const QUX = docSet.getByLongname('QUX')[0];
    const SOCKET = docSet.getByLongname('SOCKET')[0];
    const ROCKET = docSet.getByLongname('ROCKET')[0];

    it("sets the doclet's 'kind' property to 'constant'", () => {
        expect(FOO).toBeDefined();
        expect(FOO.kind).toBe('constant');

        expect(BAR).toBeDefined();
        expect(BAR.kind).toBe('constant');

        expect(BAZ).toBeDefined();
        expect(BAZ.kind).toBe('constant');

        expect(QUX).toBeDefined();
        expect(QUX.kind).toBe('constant');

        expect(SOCKET).toBeDefined();
        expect(SOCKET.kind).toBe('constant');

        expect(ROCKET).toBeDefined();
        expect(ROCKET.kind).toBe('constant');
    });

    it('If used as a standalone, takes the name from the code', () => {
        expect(FOO.name).toBe('FOO');
    });

    it('If used with just a name, sets the doclet\'s name to that', () => {
        expect(BAR.name).toBe('BAR');
    });

    it('If used with a name and a type, sets the doclet\'s name and type appropriately', () => {
        expect(BAZ.name).toBe('BAZ');
        expect(typeof BAZ.type).toBe('object');
        expect(BAZ.type.names).toBeDefined();
        expect(BAZ.type.names.length).toBe(1);
        expect(BAZ.type.names[0]).toBe('string');
    });

    it('If used with just a type, adds the type and takes the name from the code', () => {
        expect(QUX.name).toBe('QUX');
        expect(typeof QUX.type).toBe('object');
        expect(QUX.type.names).toBeDefined();
        expect(QUX.type.names.length).toBe(1);
        expect(QUX.type.names[0]).toBe('number');
    });

    it('If used with a name and type, ignores the name in the code', () => {
        expect(SOCKET.name).toBe('SOCKET');
        expect(typeof SOCKET.type).toBe('object');
        expect(SOCKET.type.names).toBeDefined();
        expect(SOCKET.type.names.length).toBe(1);
        expect(SOCKET.type.names[0]).toBe('Object');
    });

    it('If used with just a name, ignores the name in the code', () => {
        expect(ROCKET.name).toBe('ROCKET');
    });
});
