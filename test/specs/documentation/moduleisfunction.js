/*global describe: true, expect: true, it: true, jasmine: true */

describe('module that exports a function that is not a constructor', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/moduleisfunction.js');
    var functions = docSet.doclets.filter(function(doclet) {
        return doclet.kind === 'function';
    });

    it('should include one doclet whose kind is "function"', function() {
        expect(functions.length).toBe(1);
        expect(functions[0].kind).toBe('function');
    });

    describe('function doclet', function() {
        it('should not include a "scope" property', function() {
            expect(functions[0].scope).not.toBeDefined();
        });

        it('should not include a "memberof" property', function() {
            expect(functions[0].memberof).not.toBeDefined();
        });
    });
});
