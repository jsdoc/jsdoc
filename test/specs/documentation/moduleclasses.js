'use strict';

function filter($) {
    return !$.undocumented;
}

describe('module classes', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/moduleclasses.js');
    var bar = docSet.getByLongname('module:foo~Bar').filter(filter)[0];
    var barBar = docSet.getByLongname('module:foo~Bar#bar')[0];
    var baz = docSet.getByLongname('module:foo.Baz').filter(filter)[0];
    var bazBaz = docSet.getByLongname('module:foo.Baz#baz')[0];

    describe('inner classes', function() {
        it('should merge the constructor doclet with the class doclet', function() {
            expect(bar.description).toBe('Construct a Bar.');
            expect(bar.classdesc).toBe('Bar class.');
        });

        it('should correctly mark the scope of instance properties', function() {
            expect(barBar.scope).toBe('instance');
        });
    });

    describe('exported classes', function() {
        it('should merge the constructor doclet with the class doclet', function() {
            expect(baz.description).toBe('Construct a Baz.');
            expect(baz.classdesc).toBe('Baz class.');
        });

        it('should correctly mark the scope of instance properties', function() {
            expect(bazBaz.scope).toBe('instance');
        });
    });
});
