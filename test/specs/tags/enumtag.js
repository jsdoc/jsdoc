'use strict';

describe('@enum tag', function() {
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
        expect(tristate.properties[1].defaultvalue).toBe(-1);
    });

    it('If a @type is given for the property, it is reflected in the property value.', function() {
        expect(tristate.properties[2].type.names.join(', ')).toBe('boolean');
    });

    it('An enum does not contain any circular references.', function() {
        var dump = require('jsdoc/util/dumper').dump;

        expect( dump(tristate) ).not.toMatch('<CircularRef>');
    });

    describe('numeric object properties', function() {
        it('When an enum is defined with numeric object properties, the enum is parsed correctly.', function() {
            var zero = docSet.getByLongname('TrueFalseNumeric.0')[0];

            expect(zero).toBeDefined();
            expect(zero.description).toBe('false');
        });
    });

    describe('chained assignments', function() {
        var docSet2 = jasmine.getDocSetFromFile('test/fixtures/enumtag2.js');
        var pentaState = docSet2.getByLongname('module:my/enums.PentaState')[0];
        var PENTASTATE = docSet2.getByLongname('module:my/enums.PENTASTATE')[0];
        var quadState = docSet2.getByLongname('module:my/enums.QuadState')[0];

        it('When a symbol at the start of an assignment chain has an @enum tag, that symbol has a properties array.', function() {
            expect( Array.isArray(quadState.properties) ).toBe(true);
            expect(quadState.properties.length).toBe(4);
        });

        it('When multiple symbols in an assignment chain have @enum tags, each symbol has a properties array.', function() {
            expect( Array.isArray(pentaState.properties) ).toBe(true);
            expect(pentaState.properties.length).toBe(5);

            expect( Array.isArray(PENTASTATE.properties) ).toBe(true);
            expect(pentaState.properties.length).toBe(5);
        });
    });
});
