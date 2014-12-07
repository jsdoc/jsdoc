'use strict';

describe('@module tag', function() {
    describe("using 'this'", function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/moduletag.js');
        var book = docSet.getByLongname('module:bookshelf.Book')[0];
        var title = docSet.getByLongname('module:bookshelf.Book#title')[0];

        it('When a global symbol starts with "this" and is in a file with a @module tag, the symbol is documented as a member of that module.', function() {
            expect(typeof book).toBe('object');
            expect(book.memberof).toBe('module:bookshelf');
        });

        it('When an inner symbol starts with "this" and is in a file with a @module tag, the symbol is documented as a member of its enclosing constructor.', function() {
            expect(typeof title).toBe('object');
            expect(title.memberof).toBe('module:bookshelf.Book');
        });
    });

    describe('misc', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/moduletag2.js');
        var mixer = docSet.getByLongname('module:color/mixer').filter(function($) {
            return ! $.undocumented;
        })[0];
        var blend = docSet.getByLongname('module:color/mixer.blend')[0];
        var darken = docSet.getByLongname('module:color/mixer.darken')[0];

        it('When a @module tag defines a module, a symbol of kind "module" is documented', function() {
            expect(typeof mixer).toBe('object');
            expect(mixer.kind).toBe('module');
        });

        it('When a @module tag defines a module, the module doclet does not have a "scope" property', function() {
            expect(mixer.scope).not.toBeDefined();
        });

        it('When an object literal is lent to a module with a @lends tag, a member of that object literal is documented as a member of the module', function() {
            expect(typeof blend).toBe('object');
            expect(blend.kind).toBe('function');
        });

        it('When a documented symbol is a member of a namespace "exports", it is documented as a member of the module', function() {
            expect(typeof darken).toBe('object');
            expect(darken.kind).toBe('function');
        });
    });

    describe('virtual comments', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/moduletag4.js');
        var m1 = docSet.getByLongname('module:M1').filter(function($) {
            return ! $.undocumented;
        })[0];
        var clickProperties = docSet.getByLongname('module:M1~ClickProperties')[0];
        var virtFunc = docSet.getByLongname('module:M1.VirtualComment')[0];
        var virtFunc2 = docSet.getByLongname('module:M1#VirtualComment2')[0];

        it('When a virtual comment typedef is inside a module, the typedef is a memberof the module', function () {
            expect(clickProperties.memberof).toBe('module:M1');
        });

        it('When a virtual comment typedef is inside a module, the typedef longname contains the module name', function() {
            expect(clickProperties.longname).toBe('module:M1~ClickProperties');
        });

        it('When a virtual comment typedef is inside a module, the typedef scope is "inner"', function() {
            expect(clickProperties.scope).toBe('inner');
        });

        it('When a virtual comment function is inside a module with a static scope, the function has the correct memberof and longname', function () {
            expect(virtFunc.longname).toBe('module:M1.VirtualComment');
            expect(virtFunc.memberof).toBe('module:M1');
        });

        it('When a virtual comment function is inside a module with an instance scope, the function has the correct memberof and longname', function() {
            expect(virtFunc2.longname).toBe('module:M1#VirtualComment2');
            expect(virtFunc2.memberof).toBe('module:M1');
        });
    });

    describe('"module:" namespace included in the name', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/moduletag5.js');
        var bookshelf = docSet.getByLongname('module:bookshelf')[0];

        it('When the name for a @module tag begins with the "module:" namespace, we remove the namespace', function() {
            expect(typeof bookshelf).toBe('object');
            expect(bookshelf.name).toBe('bookshelf');
        });
    });
});
