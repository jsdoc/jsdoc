'use strict';

if (jasmine.jsParser !== 'rhino') {
    describe('arrow functions', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/arrowfunction.js');
        var increment = docSet.getByLongname('increment')[0];
        var print = docSet.getByLongname('print')[0];

        it('should use the correct name and longname', function() {
            expect(increment).toBeDefined();
            expect(increment.name).toBe('increment');
        });

        it('should allow function parameters to be documented', function() {
            expect(increment.params.length).toBe(1);
            expect(increment.params[0].name).toBe('n');
        });

        it('should support inline comments on parameters', function() {
            expect(print.params.length).toBe(1);
            expect(print.params[0].type.names[0]).toBe('*');
        });
    });
}
