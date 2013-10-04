/*global describe: true, expect: true, it: true, jasmine: true */

describe('@type tag containing a newline character', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/typetagwithnewline.js');
    var mini = docSet.getByLongname('Matryoshka.mini')[0];
    var mega = docSet.getByLongname('Matryoshka.mega')[0];

    it('When the type expression for a @type tag contains a newline character and is not ' +
        'enclosed in braces, the type expression is parsed correctly.', function() {
        expect(mini).toBeDefined();
        expect(mini.type).toBeDefined();
        expect(mini.type.names).toBeDefined();
        expect(mini.type.names.length).toBe(2);
        expect(mini.type.names[0]).toBe('!Array.<number>');
        expect(mini.type.names[1]).toBe('!Array.<!Array.<number>>');
    });

    it('When the type expression for a @type tag contains a newline character and is enclosed ' +
        'in braces, the type expression is parsed correctly.', function() {
        expect(mega).toBeDefined();
        expect(mega.type).toBeDefined();
        expect(mega.type.names).toBeDefined();
        expect(mega.type.names.length).toBe(3);
        expect(mega.type.names[0]).toBe('!Array.<number>');
        expect(mega.type.names[1]).toBe('!Array.<!Array.<number>>');
        expect(mega.type.names[2]).toBe('!Array.<!Array.<!Array.<number>>>');
    });
});
