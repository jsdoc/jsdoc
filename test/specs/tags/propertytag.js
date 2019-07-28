describe('@property tag', () => {
    it('When a symbol has a @property tag, the property appears in the doclet.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/propertytag.js');
        const myobject = docSet.getByLongname('myobject')[0];

        expect(myobject.properties).toBeArrayOfSize(4);

        expect(myobject.properties[0].name).toBe('id');
        expect(myobject.properties[1].name).toBe('defaults');
        expect(myobject.properties[2].name).toBe('defaults.a');
        expect(myobject.properties[3].name).toBe('defaults.b');

        expect(myobject.properties[0].defaultvalue).toBe('abc123');
        expect(myobject.properties[2].defaultvalue).toBe(1);

        expect(myobject.properties[1].description).toBe('The default values.');
        expect(myobject.properties[1].type.names[0]).toBe('Object');
    });

    it('When a symbol has a @property tag for a numeric property, the property appears in the doclet.', () => {
        const docSet = jsdoc.getDocSetFromFile('test/fixtures/numericpropertytag.js');
        const numericObject = docSet.getByLongname('numericObject')[0];

        expect(numericObject.properties).toBeArrayOfSize(3);

        expect(numericObject.properties[0].name).toBe('1');
        expect(numericObject.properties[1].name).toBe('2');
        expect(numericObject.properties[2].name).toBe('3');
    });
});
