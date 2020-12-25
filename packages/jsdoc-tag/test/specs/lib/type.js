function buildText(type, name, desc) {
    let text = '';

    if (type) {
        text += `{${type}}`;
        if (name || desc) {
            text += ' ';
        }
    }

    if (name) {
        text += name;
        if (desc) {
            text += ' ';
        }
    }

    if (desc) {
        text += desc;
    }

    return text;
}

describe('@jsdoc/tag/lib/type', () => {
    const type = require('../../../lib/type');

    it('is an object', () => {
        expect(type).toBeObject();
    });

    it('exports a parse function', () => {
        expect(type.parse).toBeFunction();
    });

    describe('parse', () => {
        it('returns an object with name, type, and text properties', () => {
            const info = type.parse('');

            expect(info.name).toBeString();
            expect(info.type).toBeArray();
            expect(info.text).toBeString();
        });

        it('does not extract a name or type if canHaveName and canHaveType are not set', () => {
            const desc = '{number} foo The foo parameter.';
            const info = type.parse(desc);

            expect(info.type).toBeEmptyArray();
            expect(info.name).toBe('');
            expect(info.text).toBe(desc);
        });

        it('extracts a name, but not a type, if canHaveName is true and canHaveType is false', () => {
            const name = 'bar';
            const desc = 'The bar parameter.';
            const info = type.parse( buildText(null, name, desc), true, false );

            expect(info.type).toBeEmptyArray();
            expect(info.name).toBe(name);
            expect(info.text).toBe(desc);
        });

        it('extracts a type, but not a name, if canHaveName is false and canHaveType is true', () => {
            const typeString = 'boolean';
            const desc = 'Set to true on alternate Thursdays.';
            const info = type.parse(buildText(typeString, null, desc), false, true);

            expect(info.type).toEqual([typeString]);
            expect(info.name).toBe('');
            expect(info.text).toBe(desc);
        });

        it('extracts a name and type if canHaveName and canHaveType are true', () => {
            const typeString = 'string';
            const name = 'baz';
            const desc = 'The baz parameter.';
            const info = type.parse(buildText(typeString, name, desc), true, true);

            expect(info.type).toEqual([typeString]);
            expect(info.name).toBe(name);
            expect(info.text).toBe(desc);
        });

        it('reports optional types correctly for both JSDoc and Closure syntax', () => {
            let desc = '{string} [foo]';
            let info = type.parse(desc, true, true);

            expect(info.optional).toBeTrue();

            desc = '{string=} [foo]';
            info = type.parse(desc, true, true);
            expect(info.optional).toBeTrue();

            desc = '[foo]';
            info = type.parse(desc, true, true);
            expect(info.optional).toBeTrue();
        });

        it('returnsthe types as an array', () => {
            const desc = '{string} foo';
            const info = type.parse(desc, true, true);

            expect(info.type).toEqual( ['string'] );
        });

        it('recognizes the entire list of possible types', () => {
            let desc = '{(string|number)} foo';
            let info = type.parse(desc, true, true);

            expect(info.type).toEqual( ['string', 'number'] );

            desc = '{ ( string | number ) } foo';
            info = type.parse(desc, true, true);
            expect(info.type).toEqual( ['string', 'number'] );

            desc = '{  (   string  | number)} foo';
            info = type.parse(desc, true, true);
            expect(info.type).toEqual( ['string', 'number'] );

            desc = '{(string|number|boolean|function)} foo';
            info = type.parse(desc, true, true);
            expect(info.type).toEqual( ['string', 'number', 'boolean', 'function'] );
        });

        it('does not find any type if there is no text in braces', () => {
            const desc = 'braceless text';
            const info = type.parse(desc, false, true);

            expect(info.type).toBeEmptyArray();
        });

        it('copes with bad escapement at the end of the string', () => {
            const desc = 'bad {escapement \\';
            const info = type.parse(desc, false, true);

            expect(info.type).toBeEmptyArray();
            expect(info.text).toBe(desc);
        });

        it('handles escaped braces correctly', () => {
            const desc = '{weirdObject."with\\}AnnoyingProperty"}';
            const info = type.parse(desc, false, true);

            expect(info.type[0]).toBe('weirdObject."with}AnnoyingProperty"');
        });

        it('works if the type expression is the entire string', () => {
            const desc = '{textInBraces}';
            const info = type.parse(desc, false, true);

            expect(info.type[0]).toBe('textInBraces');
        });

        it('works if the type expression is at the beginning of the string', () => {
            const desc = '{testString} ahoy';
            const info = type.parse(desc, false, true);

            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('ahoy');
        });

        it('works if the type expression is in the middle of the string', () => {
            const desc = 'a {testString} yay';
            const info = type.parse(desc, false, true);

            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('a  yay');
        });

        it('works if the tag is at the end of the string', () => {
            const desc = 'a {testString}';
            const info = type.parse(desc, false, true);

            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('a');
        });

        it('works when there are nested braces', () => {
            const desc = 'some {{double}} braces';
            const info = type.parse(desc, false, true);

            // we currently stringify all record types as 'Object'
            expect(info.type[0]).toBe('Object');
            expect(info.text).toBe('some  braces');
        });

        it('overrides the type expression if an inline @type tag is specified', () => {
            let desc = '{Object} cookie {@type Monster}';
            let info = type.parse(desc, true, true);

            expect(info.type).toEqual( ['Monster'] );
            expect(info.text).toBe('');

            desc = '{Object} cookie - {@type Monster}';
            info = type.parse(desc, true, true);
            expect(info.type).toEqual( ['Monster'] );
            expect(info.text).toBe('');

            desc = '{Object} cookie - The cookie parameter. {@type Monster}';
            info = type.parse(desc, true, true);
            expect(info.type).toEqual( ['Monster'] );
            expect(info.text).toBe('The cookie parameter.');

            desc = '{Object} cookie - The cookie parameter. {@type (Monster|Jar)}';
            info = type.parse(desc, true, true);
            expect(info.type).toEqual( ['Monster', 'Jar'] );
            expect(info.text).toBe('The cookie parameter.');

            desc = '{Object} cookie - The cookie parameter. {@type (Monster|Jar)} Mmm, cookie.';
            info = type.parse(desc, true, true);
            expect(info.type).toEqual( ['Monster', 'Jar'] );
            expect(info.text).toBe('The cookie parameter.  Mmm, cookie.');
        });

        describe('JSDoc-style type info', () => {
            it('parses JSDoc-style optional parameters', () => {
                let name = '[qux]';
                const desc = 'The qux parameter.';
                let info = type.parse( buildText(null, name, desc), true, false );

                expect(info.name).toBe('qux');
                expect(info.text).toBe(desc);
                expect(info.optional).toBeTrue();

                name = '[ qux ]';
                info = type.parse( buildText(null, name, desc), true, false );
                expect(info.name).toBe('qux');
                expect(info.text).toBe(desc);
                expect(info.optional).toBeTrue();

                name = '[qux=hooray]';
                info = type.parse( buildText(null, name, desc), true, false );
                expect(info.name).toBe('qux');
                expect(info.text).toBe(desc);
                expect(info.optional).toBeTrue();
                expect(info.defaultvalue).toBe('hooray');

                name = '[  qux   =  hooray ]';
                info = type.parse( buildText(null, name, desc), true, false );
                expect(info.name).toBe('qux');
                expect(info.text).toBe(desc);
                expect(info.optional).toBeTrue();
                expect(info.defaultvalue).toBe('hooray');
            });
        });

        // TODO: Add more tests related to how JSDoc mangles the Catharsis parse results.
        describe('Closure Compiler-style type info', () => {
            it('recognizes variable (repeatable) parameters', () => {
                const desc = '{...string} foo - Foo.';
                const info = type.parse(desc, true, true);

                expect(info.type).toEqual( ['string'] );
                expect(info.variable).toBeTrue();
            });

            it('sets the type correctly for type applications that contain type unions', () => {
                const desc = '{Array.<(string|number)>} foo - Foo.';
                const info = type.parse(desc, true, true);

                expect(info.type).toEqual(['Array.<(string|number)>']);
            });
        });
    });
});
