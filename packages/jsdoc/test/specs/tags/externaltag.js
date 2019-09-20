describe('@external tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/externaltag.js');
    // TODO: why don't we test anything from docSet2?
    // var docSet2 = jsdoc.getDocSetFromFile('test/fixtures/externaltag2.js');
    const docSet3 = jsdoc.getDocSetFromFile('test/fixtures/externaltag3.js');

    const fooBarBazExternal = docSet3.getByLongname('external:"foo.bar.baz"')[0];
    const jQueryExternal = docSet.getByLongname('external:"jQuery.fn"')[0];
    const stringExternal = docSet.getByLongname('external:String')[0];


    it('An @external should have its own doclet', () => {
        expect(stringExternal).toBeObject();
    });

    it("An @external's name should be the same as its longname, minus 'external:'", () => {
        expect(stringExternal.name).toBe('String');
    });

    it('An @external should have its kind set to "external"', () => {
        expect(stringExternal.kind).toBe('external');
    });

    it('An @external with a quoted name should get the correct name', () => {
        expect(jQueryExternal).toBeObject();
        expect(jQueryExternal.name).toBe('"jQuery.fn"');
    });

    // TODO: enable after jsdoc3/jsdoc#652 is fixed
    xit('An @external should work correctly when the type is in curly braces', () => {
        expect(fooBarBazExternal).toBeObject();
        expect(fooBarBazExternal.name).toBe('"foo.bar.baz"');
    });
});
