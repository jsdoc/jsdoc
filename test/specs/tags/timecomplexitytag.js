'use strict';

describe('@timecomplexity tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/timecomplexitytag.js');
    var foo = docSet.getByLongname('foo')[0];

    it('When a symbol has an @timecomplexity tag, the doclet has a timecomplexity property set to true.', function() {
        expect(foo.timecomplexity).toBe('O(n)');
    });
});
