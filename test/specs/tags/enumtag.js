/* global jsdoc */
describe('@enum tag', () => {
    const docSet = jsdoc.getDocSetFromFile('test/fixtures/enumtag.js');
    const tristate = docSet.getByLongname('TriState')[0];

    it('When a symbol has an @enum tag, it has a properties array.', () => {
        expect(typeof tristate.properties).toBe('object');
    });

    it('If no @type is given for the property, it is inherited from the enum.', () => {
        expect(tristate.properties[0].type.names.join(', ')).toBe('number');
    });

    it('If no comment is given for the property, it is still included in the enum.', () => {
        expect(tristate.properties[1].longname).toBe('TriState.FALSE');
        expect(tristate.properties[1].undocumented).toBeUndefined();
    });

    it('A property of an enum gets its defaultvalue set.', () => {
        expect(tristate.properties[1].defaultvalue).toBe(-1);
    });

    it('If a @type is given for the property, it is reflected in the property value.', () => {
        expect(tristate.properties[2].type.names.join(', ')).toBe('boolean');
    });

    it('An enum does not contain any circular references.', () => {
        const dump = require('jsdoc/util/dumper').dump;

        expect( dump(tristate) ).not.toMatch('<CircularRef>');
    });

    describe('numeric object properties', () => {
        it('When an enum is defined with numeric object properties, the enum is parsed correctly.', () => {
            const zero = docSet.getByLongname('TrueFalseNumeric.0')[0];

            expect(zero).toBeDefined();
            expect(zero.description).toBe('false');
        });
    });

    describe('chained assignments', () => {
        const docSet2 = jsdoc.getDocSetFromFile('test/fixtures/enumtag2.js');
        const pentaState = docSet2.getByLongname('module:my/enums.PentaState')[0];
        const PENTASTATE = docSet2.getByLongname('module:my/enums.PENTASTATE')[0];
        const quadState = docSet2.getByLongname('module:my/enums.QuadState')[0];

        it('When a symbol at the start of an assignment chain has an @enum tag, that symbol has a properties array.', () => {
            expect( Array.isArray(quadState.properties) ).toBe(true);
            expect(quadState.properties.length).toBe(4);
        });

        it('When multiple symbols in an assignment chain have @enum tags, each symbol has a properties array.', () => {
            expect( Array.isArray(pentaState.properties) ).toBe(true);
            expect(pentaState.properties.length).toBe(5);

            expect( Array.isArray(PENTASTATE.properties) ).toBe(true);
            expect(pentaState.properties.length).toBe(5);
        });
    });

    describe('combined with @exports tag', () => {
        const docSet3 = jsdoc.getDocSetFromFile('test/fixtures/enumtag3.js');
        const mymodule = docSet3.getByLongname('module:mymodule')[0];

        it('When a symbol has both an @exports tag and an @enum tag, its kind is set to `module`', () => {
            expect(mymodule.kind).toBe('module');
        });
    });
});
