'use strict';

describe('class without a name', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/classwithoutname.js').doclets
        .filter(function(doclet) {
            return doclet.name === '';
        });

    it('When the doclet for a class has an empty name, it should also have an empty longname', function() {
        expect(docSet).toBeDefined();
        expect(docSet.length).toBe(1);
        expect(docSet[0].description).toBe('Create an instance of MyClass.');
        expect(docSet[0].longname).toBe('');
    });
});
