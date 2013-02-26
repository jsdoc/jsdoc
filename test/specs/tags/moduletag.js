describe("@module tag", function() {
    describe("using 'this'", function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/moduletag.js'),
            book = docSet.getByLongname('module:bookshelf.Book')[0],
            title = docSet.getByLongname('module:bookshelf.Book#title')[0];

        it('When a global symbol starts with "this" and is in a file with a @module tag, the symbol is documented as a member of that module.', function() {
            expect(typeof book).toBe('object');
            expect(book.memberof).toBe('module:bookshelf');
        });

        it('When an inner symbol starts with "this" and is in a file with a @module tag, the symbol is documented as a member of its enclosing constructor.', function() {
            expect(typeof title).toBe('object');
            expect(title.memberof).toBe('module:bookshelf.Book');
        });
    });

    describe("misc", function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/moduletag2.js'),
            mixer = docSet.getByLongname('module:color/mixer').filter(function($) {
                return ! $.undocumented;
            })[0],
            blend = docSet.getByLongname('module:color/mixer.blend')[0],
            darken = docSet.getByLongname('module:color/mixer.darken')[0];

        it('When a @module tag defines a module module, a symbol of kind "module" is documented', function() {
            expect(typeof mixer).toBe('object');
            expect(mixer.kind).toBe('module');
        });

        it('When an object literal is lent to a module with a @lends tag, A member of that object literal is documented as a member of the module', function() {
            expect(typeof blend).toBe('object');
            expect(blend.kind).toBe('function');
        });

        it('When a documented symbol is a member of a namespace "exports", it is documented as a member of the module', function() {
            expect(typeof darken).toBe('object');
            expect(darken.kind).toBe('function');
        });
    });
});