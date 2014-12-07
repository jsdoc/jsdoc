'use strict';

describe('@property tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/propertytag.js'),
        myobject = docSet.getByLongname('myobject')[0];

    it('When a symbol has a @property tag, the property appears in the doclet.', function() {
        expect(typeof myobject.properties).toBe('object');
        expect(myobject.properties.length).toBe(4);

        expect(myobject.properties[0].name).toBe('id');
        expect(myobject.properties[1].name).toBe('defaults');
        expect(myobject.properties[2].name).toBe('defaults.a');
        expect(myobject.properties[3].name).toBe('defaults.b');

        expect(myobject.properties[0].defaultvalue).toBe('abc123');

        expect(myobject.properties[1].description).toBe('The default values.');
        expect(myobject.properties[1].type.names[0]).toBe('Object');
    });
});
