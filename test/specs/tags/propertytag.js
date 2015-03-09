'use strict';

describe('@property tag', function() {
    it('When a symbol has a @property tag, the property appears in the doclet.', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/propertytag.js');
        var myobject = docSet.getByLongname('myobject')[0];

        expect(typeof myobject.properties).toBe('object');
        expect(myobject.properties.length).toBe(4);

        expect(myobject.properties[0].name).toBe('id');
        expect(myobject.properties[1].name).toBe('defaults');
        expect(myobject.properties[2].name).toBe('defaults.a');
        expect(myobject.properties[3].name).toBe('defaults.b');

        expect(myobject.properties[0].defaultvalue).toBe('abc123');
        expect(myobject.properties[2].defaultvalue).toBe(1);

        expect(myobject.properties[1].description).toBe('The default values.');
        expect(myobject.properties[1].type.names[0]).toBe('Object');
    });

    it('When a symbol has a @property tag for a numeric property, the property appears in the doclet.', function() {
        var docSet = jasmine.getDocSetFromFile('test/fixtures/numericpropertytag.js');
        var numericObject = docSet.getByLongname('numericObject')[0];

        expect(typeof numericObject.properties).toBe('object');
        expect(numericObject.properties.length).toBe(3);

        expect(numericObject.properties[0].name).toBe('1');
        expect(numericObject.properties[1].name).toBe('2');
        expect(numericObject.properties[2].name).toBe('3');
    });
});
