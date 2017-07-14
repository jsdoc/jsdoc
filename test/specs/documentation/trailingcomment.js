'use strict';

describe('trailing comment', function() {
    it('should not ignore trailing comments in a non-empty source file with a `use strict` ' +
        'declaration', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/trailingcomment.js');
        var foo = docSet.getByLongname('external:foo');

        expect(foo.length).toBe(1);
    });

    it('should not ignore trailing comments in an empty source file with a `use strict` ' +
        'declaration', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/trailingcomment2.js');
        var foo = docSet.getByLongname('external:foo');

        expect(foo.length).toBe(1);
    });
});
