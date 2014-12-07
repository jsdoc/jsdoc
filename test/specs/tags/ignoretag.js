'use strict';

describe('@ignore tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/ignoretag.js');
    var foo = docSet.getByLongname('foo')[0];

    it('When a symbol has an @ignore tag, the doclet has a ignore property set to true.', function() {
        expect(foo.ignore).toBe(true);
    });

    it('When a symbol has an @ignore tag with a value an error is thrown', function() {
        try {
            docSet = jasmine.getDocSetFromFile('test/fixtures/ignoretag2.js');
            foo = docSet.getByLongname('foo')[0];
        } catch (e) {
            expect(e instanceof Error).toBe(true);
        }
    });
});
