'use strict';

describe('@since tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/sincetag.js');
    var foo = docSet.getByLongname('foo')[0];

    it('When a symbol has an @since tag, the doclet has a since property set to true.', function() {
        expect(foo.since).toBe('1.2.3');
    });
});
