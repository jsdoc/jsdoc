'use strict';

describe('inner scope', function() {
    describe('Outer~inner.member cases', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/innerscope.js');
        var to = docSet.getByLongname('Message~headers.to');
        var from = docSet.getByLongname('Message~headers.from');
        var response = docSet.getByLongname('Message~response.code');

        it('should occur when a member of a var member is documented.', function() {
            expect(to.length).toBe(1);
        });

        it('should occur when a second member of a var member is documented.', function() {
            expect(response.length).toBe(1);
        });

        it('should occur when a deeply nested member of a var member is documented.', function() {
            expect(from.length).toBe(1);
        });
    });

    describe('other cases', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/innerscope2.js');
        var to = docSet.getByLongname('Message~headers.to');
        var from = docSet.getByLongname('<anonymous>~headers.from');
        var cache = docSet.getByLongname('<anonymous>~headers.cache');

        it('When a var is declared in a function, It is like Inner~member', function() {
            expect(cache.length).toBe(1);
        });

        it('When a var is masked by an inner var and a member of the inner is documented, it is like Inner~inner.member', function() {
            expect(from.length).toBe(1);
        });

        it('When a documented member is assigned to a var that masks an outer var.', function() {
            expect(from[0].name).toBe('from');
            expect(from[0].memberof).toBe('<anonymous>~headers');
        });
    });
});
