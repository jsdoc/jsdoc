/*global describe: true, expect: true, it: true, jasmine: true, xit: true */
describe("@enum tag", function() {
    var docSet = jasmine.getDocSetFromFile('test/fixtures/enumtag.js');
    var tristate = docSet.getByLongname('TriState')[0];

    it('When a symbol has an @enum tag, it has a properties array.', function() {
        expect(typeof tristate.properties).toBe('object');
    });

    it('If no @type is given for the property, it is inherited from the enum.', function() {
        expect(tristate.properties[0].type.names.join(', ')).toBe('number');
    });

    it('If no comment is given for the property, it is still included in the enum.', function() {
        expect(tristate.properties[1].longname).toBe('TriState.FALSE');
        expect(tristate.properties[1].undocumented).toBeUndefined();
    });

    it('A property of an enum gets its defaultvalue set.', function() {
        expect(tristate.properties[1].defaultvalue).toBe('-1');
    });

    it('If a @type is given for the property, it is reflected in the property value.', function() {
        expect(tristate.properties[2].type.names.join(', ')).toBe('boolean');
    });
    
    // TODO: reenable after fixing circular-reference issues
    xit('An enum does not contain any circular references.', function() {
        var dump = require("jsdoc/util/dumper").dump;
        
        expect( dump(tristate) ).not.toMatch("<CircularRef>");
    });
});