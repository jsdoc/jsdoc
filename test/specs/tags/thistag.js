'use strict';

describe('@this tag', function() {
    afterEach(function() {
        jasmine.restoreTagDictionary();
    });

    describe('JSDoc tags', function() {
        beforeEach(function() {
            jasmine.replaceTagDictionary('jsdoc');
        });

        it('should add a `this` property set to the @this tag\'s value', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/thistag.js');
            var setName = docSet.getByLongname('setName')[0];

            expect(setName.this).toBe('Foo');
        });

        it('should change the memberof for symbols like `this.foo`', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/thistag.js');
            var fooName = docSet.getByLongname('Foo#name')[0];

            expect(typeof fooName).toBe('object');
            expect(fooName.name).toBe('name');
            expect(fooName.memberof).toBe('Foo');
            expect(fooName.scope).toBe('instance');
        });
    });

    describe('Closure Compiler tags', function() {
        beforeEach(function() {
            jasmine.replaceTagDictionary('closure');
        });

        it('should add a `this` property set to the @this tag\'s type expression', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/thistag2.js');
            var setName = docSet.getByLongname('setName')[0];

            expect(setName.this).toBe('Foo');
        });

        it('should change the memberof for symbols like `this.foo`', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/thistag2.js');
            var fooName = docSet.getByLongname('Foo#name')[0];

            expect(typeof fooName).toBe('object');
            expect(fooName.name).toBe('name');
            expect(fooName.memberof).toBe('Foo');
            expect(fooName.scope).toBe('instance');
        });

        it('should work with type unions', function() {
            var docSet = jasmine.getDocSetFromFile('test/fixtures/thistag2.js');
            var getName = docSet.getByLongname('getName')[0];

            expect(getName.this).toBe('(Foo|Bar)');
        });
    });
});
