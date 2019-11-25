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

describe('jsdoc/tag/type', () => {
    const type = require('jsdoc/tag/type');

    it('should exist', () => {
        expect(type).toBeObject();
    });

    it('should export a parse function', () => {
        expect(type.parse).toBeFunction();
    });

    describe('parse', () => {
        it('should return an object with name, type, and text properties', () => {
            const info = type.parse('');

            expect(info.name).toBeString();
            expect(info.type).toBeArray();
            expect(info.text).toBeString();
        });

        it('should not extract a name or type if canHaveName and canHaveType are not set', () => {
            const desc = '{number} foo The foo parameter.';
            const info = type.parse(desc);

            expect(info.type).toBeEmptyArray();
            expect(info.name).toBe('');
            expect(info.text).toBe(desc);
        });

        it('should extract a name, but not a type, if canHaveName === true and canHaveType === false', () => {
            const name = 'bar';
            const desc = 'The bar parameter.';
            const info = type.parse( buildText(null, name, desc), true, false );

            expect(info.type).toBeEmptyArray();
            expect(info.name).toBe(name);
            expect(info.text).toBe(desc);
        });

        it('should extract a type, but not a name, if canHaveName === false and canHaveType === true', () => {
            const typeString = 'boolean';
            const desc = 'Set to true on alternate Thursdays.';
            const info = type.parse(buildText(typeString, null, desc), false, true);

            expect(info.type).toEqual([typeString]);
            expect(info.name).toBe('');
            expect(info.text).toBe(desc);
        });

        it('should extract a name and type if canHaveName and canHaveType are true', () => {
            const typeString = 'string';
            const name = 'baz';
            const desc = 'The baz parameter.';
            const info = type.parse(buildText(typeString, name, desc), true, true);

            expect(info.type).toEqual([typeString]);
            expect(info.name).toBe(name);
            expect(info.text).toBe(desc);
        });

        it('should report optional types correctly no matter which syntax we use', () => {
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

        it('should return the types as an array', () => {
            const desc = '{string} foo';
            const info = type.parse(desc, true, true);

            expect(info.type).toEqual( ['string'] );
        });

        it('should recognize the entire list of possible types', () => {
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

        it('should not find any type if there is no text in braces', () => {
            const desc = 'braceless text';
            const info = type.parse(desc, false, true);

            expect(info.type).toBeEmptyArray();
        });

        it('should cope with bad escapement at the end of the string', () => {
            const desc = 'bad {escapement \\';
            const info = type.parse(desc, false, true);

            expect(info.type).toBeEmptyArray();
            expect(info.text).toBe(desc);
        });

        it('should handle escaped braces correctly', () => {
            const desc = '{weirdObject."with\\}AnnoyingProperty"}';
            const info = type.parse(desc, false, true);

            expect(info.type[0]).toBe('weirdObject."with}AnnoyingProperty"');
        });

        it('should work if the type expression is the entire string', () => {
            const desc = '{textInBraces}';
            const info = type.parse(desc, false, true);

            expect(info.type[0]).toBe('textInBraces');
        });

        it('should work if the type expression is at the beginning of the string', () => {
            const desc = '{testString} ahoy';
            const info = type.parse(desc, false, true);

            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('ahoy');
        });

        it('should work if the type expression is in the middle of the string', () => {
            const desc = 'a {testString} yay';
            const info = type.parse(desc, false, true);

            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('a  yay');
        });

        it('should work if the tag is at the end of the string', () => {
            const desc = 'a {testString}';
            const info = type.parse(desc, false, true);

            expect(info.type[0]).toBe('testString');
            expect(info.text).toBe('a');
        });

        it('should work when there are nested braces', () => {
            const desc = 'some {{double}} braces';
            const info = type.parse(desc, false, true);

            // we currently stringify all record types as 'Object'
            expect(info.type[0]).toBe('Object');
            expect(info.text).toBe('some  braces');
        });

        it('should override the type expression if an inline @type tag is specified', () => {
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
            it('should parse JSDoc-style optional parameters', () => {
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

        // TODO: add more tests related to how JSDoc mangles the Catharsis parse results
        describe('Closure Compiler-style type info', () => {
            it('should recognize variable (repeatable) parameters', () => {
                const desc = '{...string} foo - Foo.';
                const info = type.parse(desc, true, true);

                expect(info.type).toEqual( ['string'] );
                expect(info.variable).toBeTrue();
            });

            it('should set the type correctly for type applications that contain type unions',
                () => {
                    const desc = '{Array.<(string|number)>} foo - Foo.';
                    const info = type.parse(desc, true, true);

                    expect(info.type).toEqual(['Array.<(string|number)>']);
                });
        });
    });
});
