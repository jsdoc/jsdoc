/*global describe, expect, it, jasmine */
describe('method definition inside a class declaration', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/methoddefinition.js'),
        runMethod = docSet.getByLongname('Test#run')[0],
        staticRunMethod = docSet.getByLongname('Test.run')[0];

    it('methods should have documentation comments', function() {
        expect(runMethod).toBeDefined();
        expect(runMethod.description).toBe('Document me.');
        expect(runMethod.kind).toBe('function');

        expect(staticRunMethod).toBeDefined();
        expect(staticRunMethod.description).toBe('Static document me.');
        expect(staticRunMethod.kind).toBe('function');
    });
});
