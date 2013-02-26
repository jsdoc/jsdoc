describe("@property tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/propertytag.js'),
        myobject = docSet.getByLongname('myobject')[0];

    it('When a symbol has an @property tag with a those properties appear in the parsed object.', function() {
        expect(typeof myobject.properties).toBe('object');
        expect(myobject.properties.length).toBe(3);
        expect(myobject.properties[0].name).toBe('defaults');
        expect(myobject.properties[1].name).toBe('defaults.a');
        expect(myobject.properties[2].name).toBe('defaults.b');
        expect(myobject.properties[0].description).toBe('The default values.');
        expect(myobject.properties[0].type.names[0]).toBe('Object');
    });

});