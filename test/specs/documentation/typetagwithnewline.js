describe('@type tag containing a newline character', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/typetagwithnewline.js');
    const mini = docSet.getByLongname('Matryoshka.mini')[0];
    const mega = docSet.getByLongname('Matryoshka.mega')[0];

    it('When the type expression for a @type tag contains a newline character and is not ' +
        'enclosed in braces, the type expression is parsed correctly.', () => {
        expect(mini).toBeObject();
        expect(mini.type).toBeObject();
        expect(mini.type.names).toEqual([
            '!Array.<number>',
            '!Array.<!Array.<number>>'
        ]);
    });

    it('When the type expression for a @type tag contains a newline character and is enclosed ' +
        'in braces, the type expression is parsed correctly.', () => {
        expect(mega).toBeObject();
        expect(mega.type).toBeObject();
        expect(mega.type.names).toEqual([
            '!Array.<number>',
            '!Array.<!Array.<number>>',
            '!Array.<!Array.<!Array.<number>>>'
        ]);
    });
});
