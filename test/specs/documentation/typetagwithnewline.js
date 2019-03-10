describe('@type tag containing a newline character', () => {
    const docSet = jasmine.getDocSetFromFile('test/fixtures/typetagwithnewline.js');
    const mini = docSet.getByLongname('Matryoshka.mini')[0];
    const mega = docSet.getByLongname('Matryoshka.mega')[0];

    it('When the type expression for a @type tag contains a newline character and is not ' +
        'enclosed in braces, the type expression is parsed correctly.', () => {
        expect(mini).toBeDefined();
        expect(mini.type).toBeDefined();
        expect(mini.type.names).toBeDefined();
        expect(mini.type.names.length).toBe(2);
        expect(mini.type.names[0]).toBe('!Array.<number>');
        expect(mini.type.names[1]).toBe('!Array.<!Array.<number>>');
    });

    it('When the type expression for a @type tag contains a newline character and is enclosed ' +
        'in braces, the type expression is parsed correctly.', () => {
        expect(mega).toBeDefined();
        expect(mega.type).toBeDefined();
        expect(mega.type.names).toBeDefined();
        expect(mega.type.names.length).toBe(3);
        expect(mega.type.names[0]).toBe('!Array.<number>');
        expect(mega.type.names[1]).toBe('!Array.<!Array.<number>>');
        expect(mega.type.names[2]).toBe('!Array.<!Array.<!Array.<number>>>');
    });
});
