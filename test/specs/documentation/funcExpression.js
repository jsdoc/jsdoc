/*global describe: true, expect: true, it: true, jasmine: true */
describe('function expressions', function() {
    function checkLongnames(docSet, namespace) {
        var memberName = (namespace || '') + 'Foo#member1';
        var variableName = (namespace || '') + 'Foo~var1';
        var fooMember = docSet.getByLongname(memberName)[0];
        var fooVariable = docSet.getByLongname(variableName)[0];

        it('should assign the correct longname to members of a function expression', function() {
            expect(fooMember.longname).toBe(memberName);
        });

        it('should assign the correct longname to variables in a function expression', function() {
            expect(fooVariable.longname).toBe(variableName);
        });
    }

    describe('standard', function() {
        checkLongnames( jasmine.getDocSetFromFile('test/fixtures/funcExpression.js') );
    });

    describe('global', function() {
        checkLongnames( jasmine.getDocSetFromFile('test/fixtures/funcExpression2.js') );
    });

    describe('as object literal property', function() {
        checkLongnames( jasmine.getDocSetFromFile('test/fixtures/funcExpression3.js'), 'ns.' );
    });
});
