'use strict';

describe("'exports' symbol in modules", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/exports.js');
    var sayHello = docSet.getByLongname('module:hello/world.sayHello')[0];
    var sayGoodbye = docSet.getByLongname('module:hello/world.sayGoodbye')[0];

    it('When a symbol starts with the special name "exports" and is in a file with a ' +
        '@module tag, the symbol is documented as a member of that module.', function() {
        expect(typeof sayHello).toBe('object');
        expect(sayHello.kind).toBe('function');
        expect(sayHello.memberof).toBe('module:hello/world');
    });

    it('When a symbol starts with the special name "module.exports" and is in a file with a ' +
        '@module tag, the symbol is documented as a member of that module.', function() {
        expect(typeof sayGoodbye).toBe('object');
        expect(sayGoodbye.kind).toBe('function');
        expect(sayGoodbye.memberof).toBe('module:hello/world');
    });
});
