describe('function expressions', () => {
    function checkLongnames(docSet, namespace) {
        const memberName = `${namespace || ''}Foo#member1`;
        const variableName = `${namespace || ''}Foo~var1`;
        const fooMember = docSet.getByLongname(memberName)[0];
        const fooVariable = docSet.getByLongname(variableName)[0];

        it('should assign the correct longname to members of a function expression', () => {
            expect(fooMember.longname).toBe(memberName);
        });

        it('should assign the correct longname to variables in a function expression', () => {
            expect(fooVariable.longname).toBe(variableName);
        });
    }

    describe('standard', () => {
        checkLongnames( jsdoc.getDocSetFromFile('test/fixtures/funcExpression.js') );
    });

    describe('global', () => {
        checkLongnames( jsdoc.getDocSetFromFile('test/fixtures/funcExpression2.js') );
    });

    describe('as object literal property', () => {
        checkLongnames( jsdoc.getDocSetFromFile('test/fixtures/funcExpression3.js'), 'ns.' );
    });
});
