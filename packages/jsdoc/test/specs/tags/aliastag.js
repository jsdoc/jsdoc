describe('@alias tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/alias.js');
    // there are two doclets with longname myObject, we want the second one
    const myObject = docSet.getByLongname('myObject')[1];

    it('adds an "alias" property to the doclet with the tag\'s value', () => {
        expect(myObject.alias).toBe('myObject');
    });

    // further tests (ensuring alias has the proper effect): documentation/alias.js
});
