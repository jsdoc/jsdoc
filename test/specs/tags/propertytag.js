describe("@property tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/propertytag.js'),
        myobject = docSet.getByLongname('myobject')[0];

    it('When a symbol has an @property tag with a those properties appear in the parsed object.', function() {
        expect(typeof myobject.properties).toEqual('object');
        expect(myobject.properties.length).toEqual(3);
        expect(myobject.properties[0].name).toEqual('defaults');
        expect(myobject.properties[1].name).toEqual('defaults.a');
        expect(myobject.properties[2].name).toEqual('defaults.b');
        expect(myobject.properties[0].description).toEqual('The default values.');
        expect(myobject.properties[0].type.names[0]).toEqual('Object');
    });

});