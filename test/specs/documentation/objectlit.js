'use strict';

describe('object literals', function() {
    describe('When a child of an objlit has no @name or @memberof tags', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/objectlit.js');
        var found = docSet.getByLongname('tools.serialiser.value');

        it('should have a doclet with the correct longname', function() {
            expect(found.length).toBe(1);
        });

        it('should have a doclet with the correct name', function() {
            expect(found[0].name).toBe('value');
        });

        it('should have the correct memberof', function() {
            expect(found[0].memberof).toBe('tools.serialiser');
        });

        it('should have a static scope', function() {
            expect(found[0].scope).toBe('static');
        });
    });

    describe('When a parent of an objlit has no documentation', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/objectlit2.js');
        var found = docSet.getByLongname('position.axis.x');

        it('should have a doclet with the correct longname', function() {
            expect(found.length).toBe(1);
        });

        it('should have a doclet with the correct name', function() {
            expect(found[0].name).toBe('x');
        });

        it('should have the correct memberof', function() {
            expect(found[0].memberof).toBe('position.axis');
        });

        it('should have a static scope', function() {
            expect(found[0].scope).toBe('static');
        });
    });

    describe('When an object literal\'s property names must be escaped in a regexp', function() {
        var docSet;
        var found;

        function loadDocSet() {
            docSet = jasmine.getDocSetFromFile('test/fixtures/objectlit3.js');
            found = docSet.getByLongname('tokens."(".before');
        }

        it('should not throw an error when creating a doclet', function() {
            expect(loadDocSet).not.toThrow();
        });

        it('should have a doclet with the correct name', function() {
            expect(found[0].name).toBe('before');
        });

        it('should have a doclet with the correct memberof', function() {
            expect(found[0].memberof).toBe('tokens."("');
        });
    });
});
