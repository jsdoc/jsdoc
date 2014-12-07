'use strict';

describe('@abstract tag', function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/abstracttag.js');
    var thingy = docSet.getByLongname('Thingy')[0];
    var thingyPez = docSet.getByLongname('Thingy#pez')[0];
    var otherThingyPez = docSet.getByLongname('OtherThingy#pez')[0];

    it('should have an undefined "virtual" property with no "@abstract" tag', function() {
        expect(thingy.virtual).toBeUndefined();
    });

    it('should set the doclet\'s "virtual" property to true when "@abstract" tag is present', function() {
        expect(thingyPez.virtual).toBe(true);
        expect(otherThingyPez.virtual).toBe(true);
    });
});
